'use client'

import { useAdminUI } from '@/components/admin/AdminUI'

const today = [
  { time: '10:00', title: 'Gesprek — Jan de Vries', note: 'Uitvoerder Bouw' },
  { time: '11:30', title: 'Klantafspraak — Heijmans', note: 'Nieuwe vacature bespreken' },
]

export default function AgendaPage() {
  const { toast } = useAdminUI()

  return (
    <>
      <div className="page-head">
        <div><h1>Agenda</h1><p>Gesprekken, klantafspraken en follow-ups.</p></div>
        <button className="btn primary" onClick={() => toast('Nieuwe afspraak plannen')}>＋ Afspraak</button>
      </div>
      <div className="grid connector-grid">
        <div className="card panel">
          <h3>Vandaag</h3>
          <div className="activity">
            {today.map((a) => (
              <div key={a.time} className="activity-item"><div className="activity-icon">{a.time}</div><div><p><b>{a.title}</b></p><small>{a.note}</small></div></div>
            ))}
          </div>
        </div>
        <div className="card panel"><h3>Morgen</h3><p>2 afspraken gepland.</p></div>
      </div>
    </>
  )
}
