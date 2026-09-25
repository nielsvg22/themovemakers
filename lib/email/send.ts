import 'server-only'
import { prisma } from '@/lib/db/prisma'
import { getEmailSettings } from './settings'

export interface OutgoingEmail {
  type: string
  to: string
  subject: string
  html: string
  replyTo?: string
  candidateId?: string
}

/**
 * Verstuurt een e-mail via Resend en legt hem altijd vast in de e-maillog.
 * Faalt nooit hard: een formulier van een kandidaat mag niet mislukken op de mail.
 */
export async function sendEmail(mail: OutgoingEmail) {
  const settings = await getEmailSettings().catch(() => null)
  const redirect = settings?.testMode && settings.testInbox && settings.testInbox.toLowerCase() !== mail.to.toLowerCase() ? settings.testInbox : null
  const to = redirect ?? mail.to
  const base = { type: mail.type, to, originalTo: redirect ? mail.to : null, subject: mail.subject, html: mail.html, candidateId: mail.candidateId }

  if (!settings?.apiKey) {
    return prisma.emailLog.create({ data: { ...base, status: 'niet_verzonden', error: 'Geen Resend API-sleutel ingesteld' } })
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${settings.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: settings.from,
        to: [to],
        subject: redirect ? `[TEST → ${mail.to}] ${mail.subject}` : mail.subject,
        html: mail.html,
        ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(10000),
    })
    const body = (await res.json().catch(() => ({}))) as { id?: string; message?: string; name?: string }
    if (!res.ok) {
      return prisma.emailLog.create({ data: { ...base, status: 'mislukt', error: body.message ?? `HTTP ${res.status}` } })
    }
    return prisma.emailLog.create({ data: { ...base, status: 'verzonden', providerId: body.id ?? null } })
  } catch (error) {
    return prisma.emailLog.create({ data: { ...base, status: 'mislukt', error: error instanceof Error ? error.message : 'Onbekende fout' } })
  }
}

/** Ontvanger voor interne meldingen (recruiter). */
export async function notifyAddress() {
  const s = await getEmailSettings().catch(() => null)
  return s?.notifyTo || null
}
