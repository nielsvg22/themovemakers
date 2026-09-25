'use client'

import { useActionState } from 'react'
import { unlockSite } from './actions'

export function GateForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(unlockSite, null)
  return (
    <form action={action} className="grid" style={{ gap: 14 }}>
      <input type="hidden" name="next" value={next} />
      {state && !state.ok && (
        <div className="badge b-red" role="alert" style={{ padding: '10px 12px', borderRadius: 10, fontSize: 13 }}>
          {state.message}
        </div>
      )}
      <div className="field">
        <label htmlFor="password">Wachtwoord</label>
        <input id="password" name="password" type="password" required autoFocus autoComplete="current-password" />
      </div>
      <button type="submit" className="btn primary" disabled={pending}>{pending ? 'Bezig…' : 'Openen'}</button>
    </form>
  )
}
