'use client'

import { useAdminUI } from '@/components/admin/AdminUI'

const companies = [
  { name: 'BAM', stats: '6 actieve vacatures · 18 kandidaten', badge: 'b-green', status: 'Actieve klant' },
  { name: 'Heijmans', stats: '4 actieve vacatures · 12 kandidaten', badge: 'b-green', status: 'Actieve klant' },
  { name: 'VolkerWessels', stats: '3 actieve vacatures · 9 kandidaten', badge: 'b-yellow', status: 'Opvolgen' },
]

export default function BedrijvenPage() {
  const { toast } = useAdminUI()

  return (
    <>
      <div className="page-head">
        <div><h1>Bedrijven</h1><p>CRM-overzicht van opdrachtgevers en contactpersonen.</p></div>
        <button className="btn primary" onClick={() => toast('Nieuw bedrijf aanmaken')}>＋ Bedrijf</button>
      </div>
      <div className="grid connector-grid">
        {companies.map((c) => (
          <div key={c.name} className="card connector"><h3>{c.name}</h3><p>{c.stats}</p><span className={`badge ${c.badge}`}>{c.status}</span></div>
        ))}
      </div>
    </>
  )
}
