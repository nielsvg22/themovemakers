'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useAdminUI } from '@/components/admin/AdminUI'

const vacancies = [
  { title: 'Uitvoerder Bouw', company: 'BAM', sector: 'Bouw', city: 'Utrecht', salary: '€4.000 – €5.500', hours: '32–40 uur', applications: 12, status: 'Actief', badge: 'b-green' },
  { title: 'Werkvoorbereider Civiel', company: 'Heijmans', sector: 'Civiel', city: 'Rotterdam', salary: '€3.500 – €5.000', hours: '32–40 uur', applications: 8, status: 'Actief', badge: 'b-green' },
  { title: 'Projectleider Techniek', company: 'SPIE', sector: 'Techniek', city: 'Eindhoven', salary: '€5.000 – €7.000', hours: '36–40 uur', applications: 5, status: 'Bijna verlopen', badge: 'b-yellow' },
]

const sectors = [
  { name: 'Alle vacatures', value: '', count: 28 },
  { name: 'Bouw', value: 'Bouw', count: 12 },
  { name: 'Civiel', value: 'Civiel', count: 8 },
  { name: 'Techniek', value: 'Techniek', count: 7 },
  { name: 'Engineering', value: 'Engineering', count: 5 },
  { name: 'Installatie', value: 'Installatie', count: 4 },
]

export default function AdminVacaturesPage() {
  const { openPublish } = useAdminUI()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [sector, setSector] = useState('')

  const filtered = useMemo(
    () =>
      vacancies.filter(
        (v) =>
          (!sector || v.sector === sector) &&
          (!status || (status === 'Actief' ? v.status !== 'Concept' : v.status === status)) &&
          `${v.title} ${v.company} ${v.city}`.toLowerCase().includes(query.toLowerCase())
      ),
    [query, status, sector]
  )

  return (
    <>
      <div className="page-head">
        <div><h1>Vacatures</h1><p>Beheer vacatures, publicaties en prestaties.</p></div>
        <Link href="/admin/vacatures/nieuw" className="btn primary">＋ Nieuwe vacature</Link>
      </div>
      <div className="toolbar">
        <input className="input" placeholder="Zoek vacature..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Zoek vacature" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="">Alle statussen</option><option>Actief</option><option>Concept</option>
        </select>
        <select value={sector} onChange={(e) => setSector(e.target.value)} aria-label="Vakgebied">
          <option value="">Alle vakgebieden</option><option>Bouw</option><option>Civiel</option><option>Techniek</option>
        </select>
      </div>
      <div className="jobs-layout">
        <div className="card filters">
          <h3>Vakgebieden</h3>
          {sectors.map((s) => (
            <div key={s.name} className={`filter-item${sector === s.value ? ' active' : ''}`} role="button" tabIndex={0} onClick={() => setSector(s.value)} onKeyDown={(e) => e.key === 'Enter' && setSector(s.value)}>
              <span>{s.name}</span><b>{s.count}</b>
            </div>
          ))}
        </div>
        <div>
          {filtered.map((v) => (
            <div key={v.title} className="card job-card">
              <div>
                <h3>{v.title}</h3>
                <div className="meta"><span>{v.company}</span><span>{v.city}</span><span>{v.salary}</span><span>{v.hours}</span><span>{v.applications} sollicitaties</span></div>
              </div>
              <div className="job-actions"><span className={`badge ${v.badge}`}>{v.status}</span><button className="btn ghost" onClick={openPublish}>Publicaties</button></div>
            </div>
          ))}
          {!filtered.length && <div className="card panel" style={{ color: 'var(--muted)' }}>Geen vacatures gevonden.</div>}
        </div>
      </div>
    </>
  )
}
