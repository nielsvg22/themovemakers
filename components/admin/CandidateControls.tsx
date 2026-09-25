'use client'

import { useActionState, useTransition } from 'react'
import type { ProfileStatus } from '@prisma/client'
import { addCandidateNote, planKennismaking, setProfileStatus } from '@/app/admin/actions'
import { profileStatusLabel, profileStatuses } from '@/lib/admin/labels'
import { useAdminUI } from './AdminUI'

export function StatusControl({ id, status }: { id: string; status: ProfileStatus }) {
  const { toast } = useAdminUI()
  const [pending, start] = useTransition()
  return (
    <div className="field">
      <label htmlFor="profile-status">Status</label>
      <select
        id="profile-status"
        defaultValue={status}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value as ProfileStatus
          start(async () => {
            await setProfileStatus(id, next)
            toast(`Status: ${profileStatusLabel[next]}`)
          })
        }}
      >
        {profileStatuses.map((s) => <option key={s} value={s}>{profileStatusLabel[s]}</option>)}
      </select>
    </div>
  )
}

/** Tomorrow 10:00 as default value for a datetime-local input. */
function defaultSlot() {
  const d = new Date(Date.now() + 86400000)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T10:00`
}

export function PlanKennismakingForm({ candidateId, preference }: { candidateId: string; preference?: string | null }) {
  const { toast } = useAdminUI()
  const [state, action, pending] = useActionState(async (prev: Awaited<ReturnType<typeof planKennismaking>>, fd: FormData) => {
    const res = await planKennismaking(prev, fd)
    if (res?.ok) toast('Korte kennismaking ingepland (15 min, telefonisch).')
    return res
  }, null)
  return (
    <form action={action} className="grid" style={{ gap: 12 }} id="kennismaking">
      <input type="hidden" name="candidateId" value={candidateId} />
      {preference && <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13 }}>Voorkeur kandidaat: <b>{preference}</b></p>}
      <div className="field">
        <label htmlFor="startTime">Datum en tijd (15 min, telefonisch)</label>
        <input id="startTime" name="startTime" type="datetime-local" defaultValue={defaultSlot()} required />
      </div>
      <div className="field">
        <label htmlFor="note">Notitie (optioneel)</label>
        <textarea id="note" name="note" style={{ minHeight: 70 }} placeholder="Bijv. vooral ervaring met BIM checken" />
      </div>
      {state && !state.ok && <p style={{ margin: 0, color: 'var(--red)', fontSize: 13 }}>{state.message}</p>}
      <button className="btn primary" type="submit" disabled={pending}>{pending ? 'Bezig…' : 'Plan kennismaking'}</button>
    </form>
  )
}

export function NoteForm({ candidateId }: { candidateId: string }) {
  const [state, action, pending] = useActionState(addCandidateNote, null)
  return (
    <form action={action} className="grid" style={{ gap: 10 }}>
      <input type="hidden" name="candidateId" value={candidateId} />
      <div className="field">
        <textarea name="content" style={{ minHeight: 80 }} placeholder="Notitie na beoordeling of telefoongesprek..." aria-label="Notitie" />
      </div>
      {state && !state.ok && <p style={{ margin: 0, color: 'var(--red)', fontSize: 13 }}>{state.message}</p>}
      <button className="btn ghost" type="submit" disabled={pending} style={{ justifySelf: 'start' }}>Notitie opslaan</button>
    </form>
  )
}
