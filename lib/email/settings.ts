import 'server-only'
import { prisma } from '@/lib/db/prisma'
import { decrypt, encrypt } from '@/lib/crypto'

export interface EmailSettings {
  apiKey: string | null
  from: string
  notifyTo: string | null
  testMode: boolean
  testInbox: string | null
}

const KEYS = ['email.apiKey', 'email.from', 'email.notifyTo', 'email.testMode', 'email.testInbox'] as const

/** Resend accepteert zonder geverifieerd domein alleen dit afzenderadres. */
export const DEFAULT_FROM = 'The Move Maker <onboarding@resend.dev>'

export async function getEmailSettings(): Promise<EmailSettings> {
  const rows = await prisma.appSetting.findMany({ where: { key: { in: [...KEYS] } } })
  const get = (k: (typeof KEYS)[number]) => rows.find((r) => r.key === k)?.value ?? null
  let apiKey: string | null = null
  const stored = get('email.apiKey')
  if (stored) {
    try {
      apiKey = decrypt(stored)
    } catch {
      apiKey = null
    }
  }
  return {
    apiKey,
    from: get('email.from') || DEFAULT_FROM,
    notifyTo: get('email.notifyTo'),
    testMode: get('email.testMode') !== 'false',
    testInbox: get('email.testInbox'),
  }
}

export async function saveEmailSettings(input: { apiKey?: string; from: string; notifyTo: string; testMode: boolean; testInbox: string }) {
  const upsert = (key: string, value: string) =>
    prisma.appSetting.upsert({ where: { key }, update: { value }, create: { key, value } })
  const ops = [
    upsert('email.from', input.from),
    upsert('email.notifyTo', input.notifyTo),
    upsert('email.testMode', String(input.testMode)),
    upsert('email.testInbox', input.testInbox),
  ]
  // Lege sleutel = huidige sleutel behouden.
  if (input.apiKey) ops.push(upsert('email.apiKey', encrypt(input.apiKey)))
  await prisma.$transaction(ops)
}

export const maskKey = (key: string | null) => (key ? `${key.slice(0, 5)}••••••••${key.slice(-4)}` : null)
