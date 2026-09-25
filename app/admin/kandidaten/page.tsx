'use client'

import { useAdminUI } from '@/components/admin/AdminUI'

const candidates = [
  { name: 'Sophie de Vries', role: 'Werkvoorbereider', region: 'Utrecht', source: 'LinkedIn', badge: 'b-blue', status: 'Nieuw' },
  { name: 'Mark Jansen', role: 'Projectleider', region: 'Eindhoven', source: 'Indeed', badge: 'b-yellow', status: 'Screening' },
  { name: 'Lisa Molenaar', role: 'Calculator', region: 'Rotterdam', source: 'Website', badge: 'b-purple', status: 'Gesprek' },
]

export default function KandidatenPage() {
  const { toast } = useAdminUI()

  return (
    <>
      <div className="page-head">
        <div><h1>Kandidaten</h1><p>Centraliseer kandidaten, talent en historie.</p></div>
        <button className="btn primary" onClick={() => toast('Nieuwe kandidaat aanmaken')}>＋ Kandidaat</button>
      </div>
      <div className="card panel">
        <table className="table">
          <thead><tr><th>Kandidaat</th><th>Functie</th><th>Regio</th><th>Bron</th><th>Status</th></tr></thead>
          <tbody>
            {candidates.map((c) => (
              <tr key={c.name}><td>{c.name}</td><td>{c.role}</td><td>{c.region}</td><td>{c.source}</td><td><span className={`badge ${c.badge}`}>{c.status}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
