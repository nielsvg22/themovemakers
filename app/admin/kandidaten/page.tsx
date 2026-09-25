import Link from 'next/link'
import type { Prisma, ProfileStatus } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import { dateLabel, profileStatusBadge, profileStatusLabel, profileStatuses, sourceLabel } from '@/lib/admin/labels'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<{ status?: string; bron?: string; q?: string }>
}

export default async function KandidatenPage({ searchParams }: Props) {
  const { status, bron, q } = await searchParams
  const activeStatus = profileStatuses.includes(status as ProfileStatus) ? (status as ProfileStatus) : undefined

  const where: Prisma.CandidateWhereInput = {
    ...(activeStatus ? { profileStatus: activeStatus } : {}),
    ...(bron ? { source: bron } : {}),
    ...(q
      ? { OR: ['firstName', 'lastName', 'email', 'currentRole', 'desiredRole', 'city', 'sector'].map((f) => ({ [f]: { contains: q, mode: 'insensitive' } })) }
      : {}),
  }

  const [candidates, statusCounts] = await Promise.all([
    prisma.candidate.findMany({ where, orderBy: [{ lastSubmittedAt: 'desc' }, { createdAt: 'desc' }], take: 200, include: { _count: { select: { cvFiles: true, applications: true } } } }),
    prisma.candidate.groupBy({ by: ['profileStatus'], _count: { _all: true } }),
  ])
  const countFor = (s: ProfileStatus) => statusCounts.find((c) => c.profileStatus === s)?._count._all ?? 0
  const total = statusCounts.reduce((n, c) => n + c._count._all, 0)
  const href = (s?: string) => {
    const p = new URLSearchParams()
    if (s) p.set('status', s)
    if (bron) p.set('bron', bron)
    if (q) p.set('q', q)
    const qs = p.toString()
    return qs ? `/admin/kandidaten?${qs}` : '/admin/kandidaten'
  }

  return (
    <>
      <div className="page-head">
        <div><h1>Kandidaten</h1><p>Beoordeel profielen eerst, plan daarna pas een korte kennismaking.</p></div>
        <Link href="/admin/kandidaten/nieuw" className="btn primary">＋ Kandidaat</Link>
      </div>
      <form className="toolbar" action="/admin/kandidaten">
        {activeStatus && <input type="hidden" name="status" value={activeStatus} />}
        <input className="input" name="q" defaultValue={q} placeholder="Zoek op naam, functie, plaats..." aria-label="Zoek kandidaat" />
        <select name="bron" defaultValue={bron ?? ''} aria-label="Bron">
          <option value="">Alle bronnen</option>
          {Object.entries(sourceLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <button className="btn dark" type="submit">Filter</button>
      </form>
      <div className="jobs-layout">
        <div className="card filters">
          <h3>Status</h3>
          <Link href={href()} className={`filter-item${!activeStatus ? ' active' : ''}`} style={{ textDecoration: 'none' }}><span>Alle kandidaten</span><b>{total}</b></Link>
          {profileStatuses.map((s) => (
            <Link key={s} href={href(s)} className={`filter-item${activeStatus === s ? ' active' : ''}`} style={{ textDecoration: 'none' }}>
              <span>{profileStatusLabel[s]}</span><b>{countFor(s)}</b>
            </Link>
          ))}
        </div>
        <div className="card panel" style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead><tr><th>Kandidaat</th><th>Functie</th><th>Vakgebied</th><th>Ervaring</th><th>Bron</th><th>Status</th><th>Datum</th></tr></thead>
            <tbody>
              {candidates.map((c) => (
                <tr key={c.id}>
                  <td>
                    <Link href={`/admin/kandidaten/${c.id}`} style={{ textDecoration: 'none' }}>
                      <div className="person"><div className="mini" /><div><b>{c.firstName} {c.lastName}</b><small>{c.city ?? c.email}</small></div></div>
                    </Link>
                  </td>
                  <td>{c.currentRole ?? c.desiredRole ?? '—'}</td>
                  <td>{c.sector ?? '—'}</td>
                  <td>{c.yearsExperience ?? '—'}</td>
                  <td>{c.source ? (sourceLabel[c.source] ?? c.source) : '—'}{c._count.cvFiles > 0 && <small style={{ display: 'block', color: 'var(--muted)' }}>cv bijgevoegd</small>}</td>
                  <td><span className={`badge ${profileStatusBadge[c.profileStatus]}`}>{profileStatusLabel[c.profileStatus]}</span></td>
                  <td>{dateLabel(c.lastSubmittedAt ?? c.createdAt)}</td>
                </tr>
              ))}
              {candidates.length === 0 && <tr><td colSpan={7} style={{ color: 'var(--muted)' }}>Geen kandidaten gevonden.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
