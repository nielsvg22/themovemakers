'use client'

import { useState } from 'react'
import { sendCandidateEmail } from '@/app/admin/manage-actions'
import { AdminForm } from './Forms'

interface Props {
  candidateId: string
  templates: { id: string; name: string; subject: string | null; content: string }[]
}

export function CandidateEmailForm({ candidateId, templates }: Props) {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  return (
    <AdminForm
      action={async (prev, fd) => {
        const res = await sendCandidateEmail(prev, fd)
        if (res?.ok) { setSubject(''); setBody('') }
        return res
      }}
      submitLabel="Verstuur e-mail"
      reset={false}
    >
      <input type="hidden" name="candidateId" value={candidateId} />
      {templates.length > 0 && (
        <div className="field">
          <label htmlFor="mail-template">Template</label>
          <select
            id="mail-template"
            defaultValue=""
            onChange={(e) => {
              const t = templates.find((x) => x.id === e.target.value)
              if (t) { setSubject(t.subject ?? t.name); setBody(t.content) }
            }}
          >
            <option value="">Kies een template…</option>
            {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
      )}
      <div className="field"><label htmlFor="mail-subject">Onderwerp</label><input id="mail-subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required /></div>
      <div className="field">
        <label htmlFor="mail-body">Bericht</label>
        <textarea id="mail-body" name="body" value={body} onChange={(e) => setBody(e.target.value)} required style={{ minHeight: 150 }} />
        <small style={{ color: 'var(--muted)' }}>{'{{voornaam}}'} en {'{{recruiter}}'} worden automatisch ingevuld.</small>
      </div>
    </AdminForm>
  )
}
