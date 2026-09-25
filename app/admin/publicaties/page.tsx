'use client'

import { useAdminUI } from '@/components/admin/AdminUI'

const connectors = [
  { name: 'Eigen website', text: 'Publiceer direct op themovemaker.nl', badge: 'b-green', status: 'Verbonden', actions: ['Instellingen'] },
  { name: 'Google for Jobs', text: 'Via JobPosting structured data', badge: 'b-green', status: 'Actief', actions: ['Controleer markup'] },
  { name: 'LinkedIn', text: 'ATS / Job Posting connector', badge: 'b-green', status: 'Verbonden', actions: ['Instellingen', 'Test'] },
  { name: 'Indeed', text: 'Job Sync API connector', badge: 'b-green', status: 'Verbonden', actions: ['Instellingen', 'Test'] },
  { name: 'Nationale Vacaturebank', text: 'API/feed configuratie nog nodig', badge: 'b-gray', status: 'Niet gekoppeld', actions: ['Koppeling instellen'] },
  { name: 'Jobbird', text: 'API/feed configuratie nog nodig', badge: 'b-gray', status: 'Niet gekoppeld', actions: ['Koppeling instellen'] },
]

const recent = [
  { vacancy: 'Uitvoerder Bouw', channel: 'LinkedIn', badge: 'b-green', status: 'Live', id: 'LI-982182', date: 'Vandaag 10:45', sync: '2 min geleden' },
  { vacancy: 'Uitvoerder Bouw', channel: 'Indeed', badge: 'b-green', status: 'Live', id: 'IND-37821', date: 'Vandaag 10:46', sync: '3 min geleden' },
  { vacancy: 'Projectleider Techniek', channel: 'Google for Jobs', badge: 'b-blue', status: 'Eligible', id: '—', date: 'Automatisch', sync: '1 uur geleden' },
]

function actionClass(action: string) {
  if (action === 'Test') return 'btn soft'
  if (action === 'Koppeling instellen') return 'btn primary'
  return 'btn ghost'
}

export default function PublicatiesPage() {
  const { openPublish, toast } = useAdminUI()

  return (
    <>
      <div className="page-head">
        <div><h1>Publicaties &amp; koppelingen</h1><p>Beheer jobboards, feeds, API-koppelingen en publicatiestatussen.</p></div>
        <button className="btn primary" onClick={openPublish}>Nieuwe publicatie</button>
      </div>
      <div className="grid connector-grid">
        {connectors.map((c) => (
          <div key={c.name} className="card connector">
            <div className="connector-head">
              <div><h3>{c.name}</h3><p>{c.text}</p></div>
              <span className={`badge ${c.badge}`}>{c.status}</span>
            </div>
            <div className="actions">
              {c.actions.map((a) => <button key={a} className={actionClass(a)} onClick={() => toast(`${c.name}: ${a.toLowerCase()}`)}>{a}</button>)}
            </div>
          </div>
        ))}
      </div>
      <div className="card panel" style={{ marginTop: 16 }}>
        <h3>Recente publicaties</h3>
        <table className="table">
          <thead><tr><th>Vacature</th><th>Kanaal</th><th>Status</th><th>Extern ID</th><th>Publicatiedatum</th><th>Laatste sync</th></tr></thead>
          <tbody>
            {recent.map((r) => (
              <tr key={`${r.vacancy}-${r.channel}`}><td>{r.vacancy}</td><td>{r.channel}</td><td><span className={`badge ${r.badge}`}>{r.status}</span></td><td>{r.id}</td><td>{r.date}</td><td>{r.sync}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
