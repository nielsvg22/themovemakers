'use server'

import { z } from 'zod'
import { hash, compare } from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { TaskStatus } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import { requireStaffSession } from '@/lib/auth/session'
import { generateSlug } from '@/lib/utils'

export type FormResult = { ok: boolean; message?: string } | null

const refresh = () => revalidatePath('/admin', 'layout')

const str = (fd: FormData, key: string) => String(fd.get(key) ?? '').trim()
const opt = (fd: FormData, key: string, max = 200) => str(fd, key).slice(0, max) || null

/** "2026-09-26T10:00" uit een datetime-local veld als Nederlandse tijd. */
function parseAmsterdam(local: string) {
  if (!local) return null
  const asUtc = new Date(`${local.length === 10 ? `${local}T09:00` : local}:00Z`)
  if (Number.isNaN(asUtc.getTime())) return null
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Amsterdam', hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
  }).formatToParts(asUtc)
  const get = (t: string) => Number(parts.find((x) => x.type === t)?.value)
  const shown = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'))
  return new Date(asUtc.getTime() - (shown - asUtc.getTime()))
}

/* ---------- Kandidaten ---------- */

export async function createCandidate(_: FormResult, fd: FormData): Promise<FormResult> {
  const session = await requireStaffSession()
  const firstName = str(fd, 'firstName').slice(0, 80)
  const lastName = str(fd, 'lastName').slice(0, 80)
  const email = str(fd, 'email').toLowerCase()
  if (!firstName || !lastName) return { ok: false, message: 'Voor- en achternaam zijn verplicht.' }
  if (!z.string().email().safeParse(email).success) return { ok: false, message: 'Vul een geldig e-mailadres in.' }
  if (await prisma.candidate.findUnique({ where: { email } })) return { ok: false, message: 'Er bestaat al een kandidaat met dit e-mailadres.' }

  const candidate = await prisma.candidate.create({
    data: {
      firstName,
      lastName,
      email,
      phone: opt(fd, 'phone', 40),
      city: opt(fd, 'city', 80),
      region: opt(fd, 'city', 80),
      sector: opt(fd, 'sector', 80),
      currentRole: opt(fd, 'currentRole', 120),
      yearsExperience: opt(fd, 'yearsExperience', 40),
      linkedin: opt(fd, 'linkedin', 300),
      source: opt(fd, 'source', 40) ?? 'handmatig',
      profileStatus: 'NIEUW_PROFIEL',
      lastSubmittedAt: new Date(),
    },
  })
  await prisma.activity.create({
    data: { type: 'kandidaat', description: `${session.user.name ?? 'Recruiter'} voegde ${firstName} ${lastName} toe`, candidateId: candidate.id, userId: session.user.id },
  })
  refresh()
  redirect(`/admin/kandidaten/${candidate.id}`)
}

export async function sendCandidateEmail(_: FormResult, fd: FormData): Promise<FormResult> {
  const session = await requireStaffSession()
  const candidate = await prisma.candidate.findUnique({ where: { id: str(fd, 'candidateId') } })
  if (!candidate) return { ok: false, message: 'Kandidaat niet gevonden.' }
  const subject = str(fd, 'subject').slice(0, 200)
  const body = str(fd, 'body').slice(0, 10000)
  if (!subject || !body) return { ok: false, message: 'Vul een onderwerp en bericht in.' }

  const { fillTemplate, customEmail } = await import('@/lib/email/templates')
  const { sendEmail } = await import('@/lib/email/send')
  const vars = { voornaam: candidate.firstName, achternaam: candidate.lastName, functie: candidate.desiredRole ?? candidate.currentRole, recruiter: session.user.name }
  const log = await sendEmail({
    type: 'handmatig',
    to: candidate.email,
    ...customEmail(fillTemplate(subject, vars), fillTemplate(body, vars)),
    replyTo: session.user.email ?? undefined,
    candidateId: candidate.id,
  })
  await prisma.activity.create({
    data: { type: 'email', description: `E-mail "${log.subject}" naar ${candidate.firstName} ${candidate.lastName} (${log.status.replace('_', ' ')})`, candidateId: candidate.id, userId: session.user.id },
  })
  refresh()
  return log.status === 'verzonden' ? { ok: true, message: `Verzonden naar ${log.to}.` } : { ok: false, message: `Niet verzonden: ${log.error ?? log.status}. De mail staat wel in Verzonden mails.` }
}

/* ---------- Bedrijven ---------- */

export async function createCompany(_: FormResult, fd: FormData): Promise<FormResult> {
  const session = await requireStaffSession()
  const name = str(fd, 'name').slice(0, 120)
  if (name.length < 2) return { ok: false, message: 'Vul een bedrijfsnaam in.' }
  const base = generateSlug(name)
  let slug = base
  for (let n = 2; await prisma.company.findUnique({ where: { slug } }); n++) slug = `${base}-${n}`
  const website = opt(fd, 'website', 200)
  await prisma.company.create({
    data: {
      name,
      slug,
      city: opt(fd, 'city', 80),
      industry: opt(fd, 'industry', 80),
      website: website && !/^https?:\/\//.test(website) ? `https://${website}` : website,
      ownerId: session.user.id,
    },
  })
  refresh()
  return { ok: true, message: `${name} toegevoegd.` }
}

export async function deleteCompany(id: string) {
  await requireStaffSession()
  await prisma.company.delete({ where: { id } })
  refresh()
}

/* ---------- Berichten (aanvragen van werkgevers) ---------- */

export async function setLeadStatus(id: string, status: 'NEW' | 'AFGEHANDELD') {
  const session = await requireStaffSession()
  await prisma.lead.update({ where: { id }, data: { status, assignedToId: session.user.id } })
  refresh()
}

/* ---------- Taken ---------- */

export async function createTask(_: FormResult, fd: FormData): Promise<FormResult> {
  const session = await requireStaffSession()
  const title = str(fd, 'title').slice(0, 200)
  if (!title) return { ok: false, message: 'Geef de taak een omschrijving.' }
  const priority = ['HOOG', 'NORMAAL', 'LAAG'].includes(str(fd, 'priority')) ? (str(fd, 'priority') as 'HOOG' | 'NORMAAL' | 'LAAG') : 'NORMAAL'
  const [kind, linkId] = str(fd, 'link').split(':')
  await prisma.task.create({
    data: {
      title,
      description: opt(fd, 'description', 2000),
      priority,
      dueDate: parseAmsterdam(str(fd, 'dueDate')),
      ownerId: session.user.id,
      candidateId: kind === 'c' ? linkId : null,
      vacancyId: kind === 'v' ? linkId : null,
      companyId: kind === 'b' ? linkId : null,
    },
  })
  refresh()
  return { ok: true, message: 'Taak toegevoegd.' }
}

export async function setTaskStatus(id: string, status: TaskStatus) {
  await requireStaffSession()
  await prisma.task.update({ where: { id }, data: { status, completedAt: status === 'VOLTOOID' ? new Date() : null } })
  refresh()
}

export async function deleteTask(id: string) {
  await requireStaffSession()
  await prisma.task.delete({ where: { id } })
  refresh()
}

/* ---------- Templates ---------- */

export async function saveTemplate(_: FormResult, fd: FormData): Promise<FormResult> {
  await requireStaffSession()
  const id = str(fd, 'id')
  const name = str(fd, 'name').slice(0, 120)
  const content = str(fd, 'content').slice(0, 10000)
  if (!name || !content) return { ok: false, message: 'Naam en tekst zijn verplicht.' }
  const data = { name, type: 'email', subject: opt(fd, 'subject', 200), content }
  if (id) await prisma.template.update({ where: { id }, data })
  else await prisma.template.create({ data })
  refresh()
  return { ok: true, message: 'Template opgeslagen.' }
}

export async function deleteTemplate(id: string) {
  await requireStaffSession()
  await prisma.template.delete({ where: { id } })
  refresh()
}

/* ---------- Agenda ---------- */

export async function createAppointment(_: FormResult, fd: FormData): Promise<FormResult> {
  const session = await requireStaffSession()
  const title = str(fd, 'title').slice(0, 200)
  const start = parseAmsterdam(str(fd, 'startTime'))
  const minutes = Math.min(480, Math.max(5, Number(str(fd, 'duration')) || 30))
  if (!title) return { ok: false, message: 'Geef de afspraak een titel.' }
  if (!start) return { ok: false, message: 'Kies een datum en tijd.' }
  const type = ['KANDIDATEN_GESPREK', 'KLANT_GESPREK', 'FOLLOW_UP', 'REMINDER'].includes(str(fd, 'type'))
    ? (str(fd, 'type') as 'KANDIDATEN_GESPREK')
    : 'KLANT_GESPREK'
  const [kind, linkId] = str(fd, 'link').split(':')
  await prisma.appointment.create({
    data: {
      title,
      type,
      startTime: start,
      endTime: new Date(start.getTime() + minutes * 60000),
      location: opt(fd, 'location', 200),
      description: opt(fd, 'description', 2000),
      ownerId: session.user.id,
      candidateId: kind === 'c' ? linkId : null,
      companyId: kind === 'b' ? linkId : null,
    },
  })
  refresh()
  return { ok: true, message: 'Afspraak ingepland.' }
}

export async function deleteAppointment(id: string) {
  await requireStaffSession()
  await prisma.appointment.delete({ where: { id } })
  refresh()
}

/* ---------- Gebruikers & account ---------- */

async function requireAdmin() {
  const session = await requireStaffSession()
  if (session.user.role !== 'ADMIN') throw new Error('Alleen beheerders kunnen gebruikers beheren')
  return session
}

export async function createUser(_: FormResult, fd: FormData): Promise<FormResult> {
  await requireAdmin()
  const name = str(fd, 'name').slice(0, 120)
  const email = str(fd, 'email').toLowerCase()
  const password = String(fd.get('password') ?? '')
  const role = str(fd, 'role') === 'ADMIN' ? 'ADMIN' : 'RECRUITER'
  if (!name) return { ok: false, message: 'Vul een naam in.' }
  if (!z.string().email().safeParse(email).success) return { ok: false, message: 'Vul een geldig e-mailadres in.' }
  if (password.length < 10) return { ok: false, message: 'Het wachtwoord moet minimaal 10 tekens zijn.' }
  if (await prisma.user.findUnique({ where: { email } })) return { ok: false, message: 'Er bestaat al een gebruiker met dit e-mailadres.' }
  await prisma.user.create({ data: { name, email, role, passwordHash: await hash(password, 12) } })
  refresh()
  return { ok: true, message: `${name} kan nu inloggen.` }
}

export async function deleteUser(id: string) {
  const session = await requireAdmin()
  if (id === session.user.id) throw new Error('Je kunt je eigen account niet verwijderen')
  // Notities, taken en afspraken zouden anders mee verwijderd worden: draag ze over aan de beheerder.
  const to = { data: { ownerId: session.user.id }, where: { ownerId: id } }
  await prisma.$transaction([
    prisma.note.updateMany({ where: { authorId: id }, data: { authorId: session.user.id } }),
    prisma.task.updateMany(to),
    prisma.appointment.updateMany(to),
    prisma.user.delete({ where: { id } }),
  ])
  refresh()
}

export async function changePassword(_: FormResult, fd: FormData): Promise<FormResult> {
  const session = await requireStaffSession()
  const current = String(fd.get('current') ?? '')
  const next = String(fd.get('next') ?? '')
  if (next.length < 10) return { ok: false, message: 'Het nieuwe wachtwoord moet minimaal 10 tekens zijn.' }
  if (next !== String(fd.get('confirm') ?? '')) return { ok: false, message: 'De wachtwoorden komen niet overeen.' }
  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user?.passwordHash || !(await compare(current, user.passwordHash))) return { ok: false, message: 'Het huidige wachtwoord klopt niet.' }
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash: await hash(next, 12) } })
  return { ok: true, message: 'Wachtwoord gewijzigd.' }
}

/* ---------- Jobboard-feed ---------- */

export type FeedTestResult = { ok: boolean; message: string; count?: number }

/** Haalt de eigen jobfeed op en controleert of hij geldig is, zoals een jobboard dat zou doen. */
export async function testJobFeed(channel?: string): Promise<FeedTestResult> {
  await requireStaffSession()
  const { jobFeedUrl } = await import('@/lib/jobboards/feed-url')
  const url = jobFeedUrl(channel)
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000), cache: 'no-store' })
    if (!res.ok) return { ok: false, message: `Feed niet bereikbaar (HTTP ${res.status}).` }
    const xml = await res.text()
    const count = (xml.match(/<job>/g) ?? []).length
    if (!xml.startsWith('<?xml')) return { ok: false, message: 'De feed is geen geldige XML.' }
    if (count === 0) return { ok: true, message: 'Feed is geldig, maar bevat nog geen actieve vacatures.', count: 0 }
    return { ok: true, message: `Feed is geldig: ${count} ${count === 1 ? 'actieve vacature' : 'actieve vacatures'} gevonden.`, count }
  } catch (e) {
    return { ok: false, message: e instanceof Error ? `Feed-test mislukt: ${e.message}` : 'Feed-test mislukt.' }
  }
}
