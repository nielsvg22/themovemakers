'use client'

import Link from 'next/link'
import { useTransition } from 'react'
import { setProfileStatus } from '@/app/admin/actions'
import { useAdminUI } from './AdminUI'

/** Snelle acties vanuit de beoordelingsinbox. */
export function ProfileActions({ id, name }: { id: string; name: string }) {
  const { toast } = useAdminUI()
  const [pending, start] = useTransition()
  return (
    <div className="job-actions" style={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>
      <Link href={`/admin/kandidaten/${id}`} className="btn ghost">Bekijk profiel</Link>
      <Link href={`/admin/kandidaten/${id}#kennismaking`} className="btn primary">Plan kennismaking</Link>
      <button
        className="btn soft"
        disabled={pending}
        onClick={() =>
          start(async () => {
            await setProfileStatus(id, 'NIET_PASSEND')
            toast(`${name} gemarkeerd als niet passend.`)
          })
        }
      >
        Niet passend
      </button>
    </div>
  )
}
