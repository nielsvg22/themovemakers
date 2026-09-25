'use client'

import Link from 'next/link'
import { useMemo, useState, useTransition } from 'react'
import type { VacancyStatus } from '@prisma/client'
import { setVacancyStatus } from '@/app/admin/actions'
import { vacancyStatusBadge, vacancyStatusLabel } from '@/lib/admin/labels'
import { useAdminUI } from './AdminUI'

export interface VacancyRow {
  id: string
  slug: string
  title: string
  company: string
  sector: string
  city: string
  salary: string
  hours: string
  applications: number
  status: VacancyStatus
}

export function VacancyList({ vacancies, sectors }: { vacancies: VacancyRow[]; sectors: string[] }) {
  const { openPublish, toast } = useAdminUI()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [sector, setSector] = useState('')
  const [pending, start] = useTransition()

  const filtered = useMemo(
    () =>
      vacancies.filter(
        (v) =>
          (!sector || v.sector === sector) &&
          (!status || v.status === status) &&
          `${v.title} ${v.company} ${v.city}`.toLowerCase().includes(query.toLowerCase())
      ),
    [vacancies, query, status, sector]
  )

  const change = (v: VacancyRow, next: VacancyStatus, message: string) =>
    start(async () => {
      await setVacancyStatus(v.id, next)
      toast(message)
    })

  return (
    <>
      <div className="toolbar">
        <input className="input" placeholder="Zoek vacature..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Zoek vacature" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="">Alle statussen</option>
          {Object.entries(vacancyStatusLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
        <select value={sector} onChange={(e) => setSector(e.target.value)} aria-label="Vakgebied">
          <option value="">Alle vakgebieden</option>
          {sectors.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="jobs-layout">
        <div className="card filters">
          <h3>Vakgebieden</h3>
          {[{ name: 'Alle vacatures', value: '' }, ...sectors.map((s) => ({ name: s, value: s }))].map((s) => (
            <div key={s.name} className={`filter-item${sector === s.value ? ' active' : ''}`} role="button" tabIndex={0} onClick={() => setSector(s.value)} onKeyDown={(e) => e.key === 'Enter' && setSector(s.value)}>
              <span>{s.name}</span><b>{s.value ? vacancies.filter((v) => v.sector === s.value).length : vacancies.length}</b>
            </div>
          ))}
        </div>
        <div>
          {filtered.map((v) => (
            <div key={v.id} className="card job-card">
              <div>
                <h3><Link href={`/admin/vacatures/${v.id}`} style={{ textDecoration: 'none' }}>{v.title}</Link></h3>
                <div className="meta"><span>{v.company}</span><span>{v.city}</span><span>{v.salary}</span><span>{v.hours}</span><span>{v.applications} sollicitaties</span></div>
              </div>
              <div className="job-actions" style={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <span className={`badge ${vacancyStatusBadge[v.status]}`}>{vacancyStatusLabel[v.status]}</span>
                {v.status === 'ACTIEF' ? (
                  <>
                    <a className="btn ghost" href={`/vacatures/${v.slug}`} target="_blank" rel="noopener noreferrer">Bekijk</a>
                    <button className="btn ghost" onClick={() => openPublish({ id: v.id, title: v.title })}>Publicaties</button>
                    <button className="btn soft" disabled={pending} onClick={() => change(v, 'GEPAUZEERD', `${v.title} gepauzeerd`)}>Pauzeren</button>
                  </>
                ) : (
                  <button className="btn primary" disabled={pending} onClick={() => change(v, 'ACTIEF', `${v.title} staat live op de website`)}>Publiceren</button>
                )}
                <Link className="btn ghost" href={`/admin/vacatures/${v.id}`}>Bewerken</Link>
              </div>
            </div>
          ))}
          {!filtered.length && <div className="card panel" style={{ color: 'var(--muted)' }}>Geen vacatures gevonden.</div>}
        </div>
      </div>
    </>
  )
}
