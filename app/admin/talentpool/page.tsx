'use client'

import { useState } from 'react'

const talent = [
  { name: 'Jeroen Kok', profile: 'Uitvoerder', skills: 'Bouw, BIM, Lean', region: 'Utrecht', available: 'Direct' },
  { name: 'Anne Visser', profile: 'Werkvoorbereider', skills: 'Infra, AutoCAD', region: 'Rotterdam', available: '2 weken' },
]

export default function TalentpoolPage() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('')
  const filtered = talent.filter(
    (t) => (!region || t.region === region) && `${t.name} ${t.profile} ${t.skills}`.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <div className="page-head">
        <div><h1>Talentpool</h1><p>Vind geschikte kandidaten op skills, regio, ervaring en beschikbaarheid.</p></div>
      </div>
      <div className="toolbar">
        <input className="input" placeholder="Zoek skills of functie..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Zoek skills of functie" />
        <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="Regio">
          <option value="">Alle regio&apos;s</option><option>Utrecht</option><option>Rotterdam</option>
        </select>
        <select aria-label="Beschikbaarheid"><option>Beschikbaar</option><option>Binnen 1 maand</option></select>
      </div>
      <div className="card panel">
        <table className="table">
          <thead><tr><th>Naam</th><th>Profiel</th><th>Skills</th><th>Regio</th><th>Beschikbaar</th></tr></thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.name}><td>{t.name}</td><td>{t.profile}</td><td>{t.skills}</td><td>{t.region}</td><td>{t.available}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
