'use client'

import { useAdminUI } from '@/components/admin/AdminUI'

const templates = [
  { name: 'Bevestiging sollicitatie', text: 'Automatische ontvangstbevestiging.' },
  { name: 'Uitnodiging gesprek', text: 'Standaard uitnodiging met datum en locatie.' },
  { name: 'Afwijzing', text: 'Persoonlijk maar efficiënt.' },
]

export default function TemplatesPage() {
  const { toast } = useAdminUI()

  return (
    <>
      <div className="page-head">
        <div><h1>Templates</h1><p>Beheer e-mail- en communicatietemplates.</p></div>
        <button className="btn primary" onClick={() => toast('Nieuwe template aanmaken')}>＋ Template</button>
      </div>
      <div className="grid connector-grid">
        {templates.map((t) => <div key={t.name} className="card connector"><h3>{t.name}</h3><p>{t.text}</p></div>)}
      </div>
    </>
  )
}
