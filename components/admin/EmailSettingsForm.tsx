'use client'

import { useActionState, useTransition, useState } from 'react'
import { saveEmailSettingsAction, sendTestEmailAction, type ActionState } from '@/app/admin/actions'

interface Props {
  maskedKey: string | null
  from: string
  notifyTo: string
  testMode: boolean
  testInbox: string
}

export function EmailSettingsForm({ maskedKey, from, notifyTo, testMode, testInbox }: Props) {
  const [state, action, pending] = useActionState(saveEmailSettingsAction, null)
  const [testState, setTestState] = useState<ActionState>(null)
  const [testing, start] = useTransition()

  return (
    <form action={action} className="grid" style={{ gap: 14 }}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="apiKey">Resend API-sleutel</label>
          <input id="apiKey" name="apiKey" type="password" autoComplete="off" placeholder={maskedKey ?? 're_...'} />
          <small style={{ color: 'var(--muted)' }}>{maskedKey ? `Ingesteld: ${maskedKey}. Laat leeg om te behouden.` : 'Nog niet ingesteld.'} Wordt versleuteld opgeslagen.</small>
        </div>
        <div className="field">
          <label htmlFor="from">Afzender</label>
          <input id="from" name="from" defaultValue={from} required />
          <small style={{ color: 'var(--muted)' }}>Zonder geverifieerd domein in Resend: onboarding@resend.dev.</small>
        </div>
        <div className="field">
          <label htmlFor="notifyTo">Meldingen voor recruiters naar</label>
          <input id="notifyTo" name="notifyTo" type="email" defaultValue={notifyTo} placeholder="recruitment@themovemaker.nl" />
        </div>
        <div className="field">
          <label htmlFor="testInbox">Testmailbox</label>
          <input id="testInbox" name="testInbox" type="email" defaultValue={testInbox} placeholder="E-mailadres van je Resend-account" />
        </div>
      </div>
      <label style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 14 }}>
        <input type="checkbox" name="testMode" defaultChecked={testMode} />
        <span><b>Testmodus:</b> stuur alle e-mails naar de testmailbox (kandidaten ontvangen dan niets).</span>
      </label>
      {state?.message && <p style={{ margin: 0, fontSize: 13, color: state.ok ? 'var(--green)' : 'var(--red)' }}>{state.message}</p>}
      {testState?.message && <p style={{ margin: 0, fontSize: 13, color: testState.ok ? 'var(--green)' : 'var(--red)' }}>{testState.message}</p>}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button className="btn primary" type="submit" disabled={pending}>{pending ? 'Opslaan…' : 'Opslaan'}</button>
        <button className="btn ghost" type="button" disabled={testing} onClick={() => start(async () => setTestState(await sendTestEmailAction()))}>
          {testing ? 'Versturen…' : 'Stuur testmail'}
        </button>
      </div>
    </form>
  )
}
