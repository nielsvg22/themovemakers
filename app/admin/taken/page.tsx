'use client'

import { useAdminUI } from '@/components/admin/AdminUI'

const tasks = [
  { task: 'Kandidaat bellen', linked: 'Sophie de Vries', deadline: 'Vandaag', badge: 'b-red', priority: 'Hoog', status: 'Open' },
  { task: 'Feedback opvragen', linked: 'Heijmans', deadline: 'Morgen', badge: 'b-yellow', priority: 'Normaal', status: 'Open' },
]

export default function TakenPage() {
  const { toast } = useAdminUI()

  return (
    <>
      <div className="page-head">
        <div><h1>Taken</h1><p>Volg acties op voor kandidaten, vacatures en klanten.</p></div>
        <button className="btn primary" onClick={() => toast('Nieuwe taak aanmaken')}>＋ Taak</button>
      </div>
      <div className="card panel">
        <table className="table">
          <thead><tr><th>Taak</th><th>Gekoppeld aan</th><th>Deadline</th><th>Prioriteit</th><th>Status</th></tr></thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.task}><td>{t.task}</td><td>{t.linked}</td><td>{t.deadline}</td><td><span className={`badge ${t.badge}`}>{t.priority}</span></td><td>{t.status}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
