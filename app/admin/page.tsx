import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { ProfileActions } from '@/components/admin/ProfileActions'
import { ChannelsPanel } from '@/components/admin/ChannelsPanel'
import { applicationStatusLabel, dateLabel, sourceLabel } from '@/lib/admin/labels'

export const dynamic = 'force-dynamic'

const DAY = 86400000
const inboundTypes = ['cv_check', 'kennismaking', 'open_sollicitatie', 'sollicitatie']
const reviewStatuses = ['NIEUW_PROFIEL', 'TE_BEOORDELEN'] as const
const procedureStatuses = ['INTERESSANT', 'KENNISMAKING_GEPLAND', 'DOOR_NAAR_PROCEDURE'] as const
const donutColors = ['var(--navy)', '#2f6ff2', '#7da5ff', '#ffbc58', '#dfe6ed']
const appBadge: Record<string, string> = { NIEUW: 'b-blue', SCREENING: 'b-yellow', GESPREK: 'b-purple', VOORGESTELD: 'b-green', GEPLAATST: 'b-green', AFGEWEZEN: 'b-gray' }

function isoWeek(d: Date) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const day = t.getUTCDay() || 7
  t.setUTCDate(t.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1))
  return Math.ceil(((t.getTime() - yearStart.getTime()) / DAY + 1) / 7)
}

export default async function AdminDashboardPage() {
  const now = new Date()
  const since30 = new Date(now.getTime() - 30 * DAY)
  const since8w = new Date(now.getTime() - 56 * DAY)

  const [activeVacancies, newApplications, toReview, inProcedure, placements, toReviewList, recentApps, sources, activities, inbound, sectors, attention] =
    await Promise.all([
      prisma.vacancy.count({ where: { status: 'ACTIEF' } }),
      prisma.application.count({ where: { appliedAt: { gte: since30 } } }),
      prisma.candidate.count({ where: { profileStatus: { in: [...reviewStatuses] } } }),
      prisma.candidate.count({ where: { profileStatus: { in: [...procedureStatuses] } } }),
      prisma.application.count({ where: { status: 'GEPLAATST' } }),
      prisma.candidate.findMany({ where: { profileStatus: { in: [...reviewStatuses] } }, orderBy: { lastSubmittedAt: 'desc' }, take: 8 }),
      prisma.application.findMany({ include: { candidate: true, vacancy: true }, orderBy: { appliedAt: 'desc' }, take: 4 }),
      prisma.candidate.groupBy({ by: ['source'], _count: { _all: true } }),
      prisma.activity.findMany({ orderBy: { createdAt: 'desc' }, take: 4 }),
      prisma.activity.findMany({ where: { type: { in: inboundTypes }, createdAt: { gte: since8w } }, select: { createdAt: true } }),
      prisma.sector.findMany({
        orderBy: { order: 'asc' },
        select: { name: true, _count: { select: { vacancies: { where: { status: 'ACTIEF' } } } } },
      }),
      prisma.vacancy.findMany({
        where: { status: { in: ['ACTIEF', 'CONCEPT'] } },
        include: { company: true, _count: { select: { applications: true } } },
        orderBy: { updatedAt: 'desc' },
        take: 30,
      }),
    ])

  // Aanmeldingen per week (laatste 8 weken).
  const weeks = Array.from({ length: 8 }, (_, i) => isoWeek(new Date(now.getTime() - (7 - i) * 7 * DAY)))
  const perWeek = weeks.map((w) => ({ week: w, count: inbound.filter((a) => isoWeek(a.createdAt) === w).length }))
  const maxWeek = Math.max(1, ...perWeek.map((w) => w.count))

  // Bronnen als donut.
  const sourceRows = sources
    .map((s) => ({ label: s.source ? (sourceLabel[s.source] ?? s.source) : 'Onbekend', count: s._count._all }))
    .sort((a, b) => b.count - a.count)
  const totalCandidates = sourceRows.reduce((n, s) => n + s.count, 0)
  const shown = sourceRows.slice(0, 5)
  const pct = (n: number) => (n / Math.max(1, totalCandidates)) * 100
  const stops = shown.map((s, i) => {
    const before = shown.slice(0, i).reduce((n, x) => n + x.count, 0)
    return `${donutColors[i]} ${pct(before)}% ${pct(before + s.count)}%`
  })

  const maxSector = Math.max(1, ...sectors.map((s) => s._count.vacancies))
  const needsAttention = attention
    .map((v) => {
      if (v.status === 'CONCEPT') return { v, badge: 'b-gray', label: 'Concept' }
      if (v.expiresAt && v.expiresAt.getTime() - now.getTime() < 14 * DAY) return { v, badge: 'b-yellow', label: 'Bijna verlopen' }
      if (v._count.applications < 2) return { v, badge: 'b-red', label: 'Weinig sollicitaties' }
      return null
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .slice(0, 4)

  const kpis = [
    { label: 'Actieve vacatures', value: activeVacancies, href: '/admin/vacatures' },
    { label: 'Profielen te beoordelen', value: toReview, href: '/admin/kandidaten?status=TE_BEOORDELEN', warn: toReview > 0 },
    { label: 'Sollicitaties (30 dagen)', value: newApplications, href: '/admin/sollicitaties' },
    { label: 'Kandidaten in procedure', value: inProcedure, href: '/admin/kandidaten' },
    { label: 'Plaatsingen', value: placements, href: '/admin/sollicitaties' },
  ]

  return (
    <>
      <div className="page-head">
        <div><h1>Dashboard</h1><p>Welkom terug. Hier is een overzicht van je recruitmentactiviteiten.</p></div>
        <Link href="/admin/vacatures/nieuw" className="btn primary">＋ Nieuwe vacature</Link>
      </div>

      <div className="grid kpis">
        {kpis.map((k) => (
          <Link key={k.label} href={k.href} className="card kpi" style={{ textDecoration: 'none' }}>
            <div className="label">{k.label}</div>
            <div className="value">{k.value}</div>
            <div className={`trend${k.warn ? ' down' : ''}`}>{k.warn ? 'Wacht op beoordeling' : 'Bekijk overzicht →'}</div>
          </Link>
        ))}
      </div>

      <div className="card panel" style={{ marginTop: 16 }}>
        <div className="page-head" style={{ marginBottom: 6 }}>
          <div><h3 style={{ margin: 0 }}>Nieuwe profielen te beoordelen</h3><p>Eerst beoordelen, daarna pas een korte kennismaking plannen.</p></div>
          <Link href="/admin/kandidaten?status=TE_BEOORDELEN" className="btn ghost">Alle profielen</Link>
        </div>
        {toReviewList.length === 0 ? (
          <p style={{ color: 'var(--muted)', margin: 0 }}>Geen nieuwe profielen. Alles is beoordeeld.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead><tr><th>Kandidaat</th><th>Vakgebied</th><th>Huidige functie</th><th>Ervaring</th><th>Bron</th><th>Datum</th><th style={{ textAlign: 'right' }}>Actie</th></tr></thead>
              <tbody>
                {toReviewList.map((c) => (
                  <tr key={c.id}>
                    <td><div className="person"><div className="mini" /><div><b>{c.firstName} {c.lastName}</b><small>{c.city ?? '—'}</small></div></div></td>
                    <td>{c.sector ?? '—'}</td>
                    <td>{c.currentRole ?? c.desiredRole ?? '—'}</td>
                    <td>{c.yearsExperience ?? '—'}</td>
                    <td><span className="badge b-blue">{c.source ? (sourceLabel[c.source] ?? c.source) : '—'}</span></td>
                    <td>{dateLabel(c.lastSubmittedAt ?? c.createdAt)}</td>
                    <td><ProfileActions id={c.id} name={`${c.firstName} ${c.lastName}`} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid charts">
        <div className="card panel">
          <h3>Aanmeldingen per week</h3>
          <div className="chart-bars">
            {perWeek.map((w) => (
              <div key={w.week} className="bar" style={{ height: `${Math.max(4, (w.count / maxWeek) * 100)}%` }} title={`${w.count} aanmeldingen`}>
                <span>W{w.week}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card panel">
          <h3>Bronnen van kandidaten</h3>
          <div className="donut" style={{ background: stops.length ? `conic-gradient(${stops.join(', ')})` : '#dfe6ed' }} data-total={totalCandidates} />
          <div className="legend">
            {sourceRows.slice(0, 5).map((s) => (
              <div key={s.label}><span>{s.label}</span><b>{Math.round((s.count / Math.max(1, totalCandidates)) * 100)}%</b></div>
            ))}
          </div>
        </div>
        <div className="card panel">
          <h3>Actieve vacatures per vakgebied</h3>
          <div className="progress-list">
            {sectors.map((s) => (
              <div key={s.name} className="progress-row">
                <span>{s.name.replace('Installatietechniek', 'Installatie').replace('Projectmanagement', 'Projectmgmt.')}</span>
                <div className="progress"><i style={{ width: `${(s._count.vacancies / maxSector) * 100}%` }} /></div>
                <b>{s._count.vacancies}</b>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid split">
        <div className="card panel">
          <h3>Recente sollicitaties</h3>
          <table className="table">
            <tbody>
              {recentApps.map((a) => (
                <tr key={a.id}>
                  <td><div className="person"><div className="mini" /><div><b>{a.candidate.firstName} {a.candidate.lastName}</b><small>{a.candidate.currentRole ?? '—'}</small></div></div></td>
                  <td>{a.vacancy.title}</td>
                  <td><span className={`badge ${appBadge[a.status] ?? 'b-gray'}`}>{applicationStatusLabel[a.status]}</span></td>
                </tr>
              ))}
              {recentApps.length === 0 && <tr><td style={{ color: 'var(--muted)' }}>Nog geen sollicitaties.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="card panel">
          <h3>Vacatures die aandacht nodig hebben</h3>
          <table className="table">
            <tbody>
              {needsAttention.map(({ v, badge, label }) => (
                <tr key={v.id}>
                  <td><Link href={`/admin/vacatures/${v.id}`} style={{ textDecoration: 'none' }}><b>{v.title}</b></Link><br /><small>{v.company?.name ?? 'Eigen vacature'}</small></td>
                  <td><span className={`badge ${badge}`}>{label}</span></td>
                </tr>
              ))}
              {needsAttention.length === 0 && <tr><td style={{ color: 'var(--muted)' }}>Alle vacatures lopen goed.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="card panel">
          <h3>Recente activiteit</h3>
          <div className="activity">
            {activities.map((a) => (
              <div key={a.id} className="activity-item">
                <div className="activity-icon">{a.type === 'status' ? '✎' : a.type === 'kennismaking' ? '☎' : '👤'}</div>
                <div><p>{a.description}</p><small>{dateLabel(a.createdAt)}</small></div>
              </div>
            ))}
            {activities.length === 0 && <p style={{ color: 'var(--muted)', margin: 0 }}>Nog geen activiteit.</p>}
          </div>
        </div>
      </div>

      <ChannelsPanel />
    </>
  )
}
