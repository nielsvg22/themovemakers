'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SITE_GATE_COOKIE } from '@/lib/site-gate'

export type GateState = { ok: boolean; message?: string } | null

export async function unlockSite(_: GateState, formData: FormData): Promise<GateState> {
  const password = String(formData.get('password') ?? '')
  const requested = String(formData.get('next') ?? '')
  // Alleen interne paden toestaan, zodat dit niet als open redirect te misbruiken is.
  const next = requested.startsWith('/') && !requested.startsWith('//') ? requested : '/'

  const expected = process.env.SITE_GATE_PASSWORD
  const token = process.env.SITE_GATE_TOKEN
  if (!expected || !token) return { ok: true } // gate staat uit: nooit blokkeren
  if (password !== expected) return { ok: false, message: 'Onjuist wachtwoord.' }

  const jar = await cookies()
  jar.set(SITE_GATE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
  redirect(next)
}
