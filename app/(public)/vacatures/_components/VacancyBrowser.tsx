'use client'

import { useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { JobCard } from '@/components/public/JobCard'
import { ActionButton } from '@/components/public/ActionButton'
import { JobAlertForm } from '@/components/public/CandidateForms'
import { FitCheckBlock } from '@/components/public/CandidateBlocks'
import type { Job } from '@/lib/data/site'

interface VacancyBrowserProps {
  jobs: Job[]
  sectors: string[]
  counts: Record<string, number>
}

export function VacancyBrowser({ jobs, sectors, counts }: VacancyBrowserProps) {
  const jobCategories = [{ name: 'Alle vacatures', filter: 'Alle' }, ...sectors.map((s) => ({ name: s, filter: s }))]
  const locations = Array.from(new Set(jobs.map((j) => j.city))).sort()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initialSector = searchParams.get('sector')
  const [filter, setFilter] = useState(jobCategories.some((c) => c.filter === initialSector) ? initialSector! : 'Alle')
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [location, setLocation] = useState('')
  const [sort, setSort] = useState('')

  const selectFilter = (value: string) => {
    setFilter(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'Alle') params.delete('sector')
    else params.set('sector', value)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    const list = jobs.filter(
      (j) =>
        (filter === 'Alle' || j.sector === filter || j.title.includes(filter)) &&
        (!location || j.city === location) &&
        `${j.title} ${j.company ?? ''} ${j.city}`.toLowerCase().includes(q)
    )
    if (sort === 'Salaris') {
      const max = (s: string) => Number(s.split('-').pop()!.replace(/\D/g, ''))
      return [...list].sort((a, b) => max(b.salary) - max(a.salary))
    }
    return list
  }, [jobs, filter, query, location, sort])

  return (
    <section>
      <div className="container jobs-shell">
        <aside>
          <div className="side-card">
            <h3>Vind jouw vakgebied</h3>
            {jobCategories.map((c) => (
              <div
                key={c.filter}
                className={`category${filter === c.filter ? ' active' : ''}`}
                role="button"
                tabIndex={0}
                aria-pressed={filter === c.filter}
                onClick={() => selectFilter(c.filter)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), selectFilter(c.filter))}
              >
                <span>{c.name}</span><span>{counts[c.filter] ?? 0}</span>
              </div>
            ))}
          </div>
          <div className="alert-card">
            <h4>Ontvang nieuwe vacatures</h4>
            <p>Stel een vacature-alert in en ontvang de nieuwste vacatures in je inbox.</p>
            <JobAlertForm sectors={sectors} />
          </div>
        </aside>

        <div className="jobs-main">
          <div className="filter-bar">
            <input className="form-control" placeholder="Zoek op functie, trefwoord of bedrijf..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Zoek vacatures" />
            <select className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} aria-label="Locatie">
              <option value="">Locatie</option>
              {locations.map((l) => <option key={l}>{l}</option>)}
            </select>
            <select className="form-control" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sorteren">
              <option value="">Sorteren op</option><option>Nieuwste</option><option>Salaris</option>
            </select>
          </div>
          <div className="results-title">
            <h3>{filtered.length} vacature{filtered.length === 1 ? '' : 's'}{filter !== 'Alle' ? ` in ${filter}` : ''}</h3>
            <span>{sort === 'Salaris' ? 'Hoogste salaris' : 'Meest recent'}</span>
          </div>
          <div className="job-list">
            {filtered.length ? filtered.map((j) => <JobCard key={j.slug} job={j} />) : <div className="empty-jobs">Geen vacatures gevonden.</div>}
          </div>
          <FitCheckBlock />
          <div className="open-cta" style={{ marginTop: 12, background: '#fff', borderColor: 'var(--line)' }}>
            <div>
              <h3>Staat jouw ideale vacature er niet tussen?</h3>
              <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 5 }}>Doe een open sollicitatie. We kijken eerst of je profiel aansluit op onze vacatures en opdrachtgevers.</p>
            </div>
            <ActionButton className="btn btn-dark btn-sm" open="application">Open sollicitatie →</ActionButton>
          </div>
        </div>
      </div>
    </section>
  )
}
