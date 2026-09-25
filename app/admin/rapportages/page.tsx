import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { sourceLabel } from '@/lib/admin/labels'

export const dynamic = 'force-dynamic'

const DAY = 86400000
const periods = [
  { key: '30', label: '30 dagen', days: 30 },
  { key: '90', label: '90 dagen', days: 90 },
  { key: '365', label: '12 maanden', days: 365 },
]
const pctLabel = (a: number, b: number) => (b ? `${((a / b) * 100).toLocaleString('nl-NL', { maximumFractionDigits: 1 })}%` : '—')

export default async function RapportagesPage({ searchParams }: { searchParams: Promise<{ periode?: string }> }) {
  const { periode } = await searchParams
  const period = periods.find((p) => p.key === periode) ?? periods[1]
  const since = new Date(new Date().getTime() - period.days * DAY)

  const [applications, candidates, conversations, profileCount] = await Promise.all([
    prisma.application.findMany({ where: { appliedAt: { gte: since } }, select: { source: true, status: true, appliedAt: true, interviewAt: true, placedAt: true } }),
    prisma.candidate.groupBy({ by: ['source'], where: { createdAt: { gte: since } }, _count: { _all: true } }),
    prisma.appointment.count({ where: { startTime: { gte: since }, type: 'KANDIDATEN_GESPREK' } }),
    prisma.candidate.count({ where: { createdAt: { gte: since } } }),
  ])

  const interviewed = applications.filter((a) => a.interviewAt || ['GESPREK', 'VOORGESTELD', 'GESPREK_OPDRACHTGEVER', 'AANBOD', 'GEPLAATST'].includes(a.status))
  const placed = applications.filter((a) => a.status === 'GEPLAATST')
  const hireDays = placed.filter((a) => a.placedAt).map((a) => (a.placedAt!.getTime() - a.appliedAt.getTime()) / DAY)
  const avgHire = hireDays.length ? `${Math.round(hireDays.reduce((n, d) => n + d, 0) / hireDays.length)} d` : '—'

  const metrics = [
    { label: 'Nieuwe kandidaten', value: profileCount },
    { label: 'Sollicitaties', value: applications.length },
    { label: 'Kennismakingen / gesprekken', value: conversations },
    { label: 'Plaatsingen', value: placed.length },
    { label: 'Gem. time-to-hire', value: avgHire },
  ]

  const bySource = candidates
    .map((c) => ({ name: c.source ? (sourceLabel[c.source] ?? c.source) : 'Onbekend', value: c._count._all }))
    .sort((a, b) => b.value - a.value)
  const maxSource = Math.max(1, ...bySource.map((s) => s.value))

  const placedBySource = new Map<string, number>()
  for (const a of placed) placedBySource.set(a.source ?? 'onbekend', (placedBySource.get(a.source ?? 'onbekend') ?? 0) + 1)
  const best = [...placedBySource.entries()].sort((a, b) => b[1] - a[1])[0]
  const bestLabel = best ? (sourceLabel[best[0]] ?? best[0]) : bySource[0]?.name

  return (
    <>
      <div className="page-head">
        <div><h1>Rapportages</h1><p>Instroom, gesprekken, conversie en plaatsingen over de afgelopen {period.label}.</p></div>
        <div style={{ display: 'flex', gap: 6 }}>
          {periods.map((p) => <Link key={p.key} href={`/admin/rapportages?periode=${p.key}`} className={`btn ${p.key === period.key ? 'dark' : 'ghost'}`}>{p.label}</Link>)}
        </div>
      </div>
      <div className="grid report-grid">
        {metrics.map((m) => <div key={m.label} className="card metric"><h4>{m.label}</h4><strong>{m.value}</strong></div>)}
      </div>
      <div className="grid charts">
        <div className="card panel">
          <h3>Kandidaten per bron</h3>
          {bySource.length === 0 ? (
            <p style={{ color: 'var(--muted)' }}>Nog geen kandidaten in deze periode.</p>
          ) : (
            <div className="chart-bars">
              {bySource.slice(0, 6).map((c) => (
                <div key={c.name} className="bar" style={{ height: `${Math.max(4, (c.value / maxSource) * 100)}%` }} title={`${c.value} kandidaten`}><span>{c.name}</span></div>
              ))}
            </div>
          )}
        </div>
        <div className="card panel">
          <h3>Conversie</h3>
          <p>Sollicitatie → gesprek: <b>{pctLabel(interviewed.length, applications.length)}</b></p>
          <p>Gesprek → plaatsing: <b>{pctLabel(placed.length, interviewed.length)}</b></p>
          <p>Sollicitatie → plaatsing: <b>{pctLabel(placed.length, applications.length)}</b></p>
        </div>
        <div className="card panel">
          <h3>Beste bron</h3>
          <h2>{bestLabel ?? '—'}</h2>
          <p style={{ color: 'var(--muted)' }}>{best ? `${best[1]} ${best[1] === 1 ? 'plaatsing' : 'plaatsingen'} in deze periode.` : bestLabel ? 'Meeste kandidaten in deze periode.' : 'Nog geen gegevens.'}</p>
        </div>
      </div>
    </>
  )
}
