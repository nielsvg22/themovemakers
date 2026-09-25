import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { dateLabel, profileStatusBadge, profileStatusLabel, vacancyStatusBadge, vacancyStatusLabel } from '@/lib/admin/labels'

export const dynamic = 'force-dynamic'

const like = (q: string) => ({ contains: q, mode: 'insensitive' as const })

export default async function ZoekenPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = ((await searchParams).q ?? '').trim().slice(0, 100)
  const words = q.split(/\s+/).filter(Boolean)

  const [vacancies, candidates, companies, leads] = q
    ? await Promise.all([
        prisma.vacancy.findMany({
          where: { OR: [{ title: like(q) }, { city: like(q) }, { location: like(q) }, { company: { name: like(q) } }, { sector: { name: like(q) } }] },
          include: { company: true, _count: { select: { applications: true } } },
          orderBy: { updatedAt: 'desc' },
          take: 20,
        }),
        prisma.candidate.findMany({
          // Elk woord moet ergens voorkomen, zodat "jan jansen" ook werkt.
          where: { AND: words.map((w) => ({ OR: ['firstName', 'lastName', 'email', 'phone', 'city', 'currentRole', 'desiredRole', 'sector'].map((f) => ({ [f]: like(w) })) })) },
          orderBy: { updatedAt: 'desc' },
          take: 30,
        }),
        prisma.company.findMany({ where: { OR: [{ name: like(q) }, { city: like(q) }, { industry: like(q) }] }, orderBy: { name: 'asc' }, take: 20 }),
        prisma.lead.findMany({
          where: { OR: [{ companyName: like(q) }, { firstName: like(q) }, { lastName: like(q) }, { email: like(q) }, { vacancyTitle: like(q) }] },
          orderBy: { createdAt: 'desc' },
          take: 20,
        }),
      ])
    : [[], [], [], []]
  const total = vacancies.length + candidates.length + companies.length + leads.length

  return (
    <>
      <div className="page-head">
        <div><h1>Zoeken</h1><p>{q ? `${total} resultaten voor "${q}"` : 'Zoek in vacatures, kandidaten, bedrijven en berichten.'}</p></div>
      </div>
      <form className="toolbar" action="/admin/zoeken">
        <input className="input" name="q" defaultValue={q} placeholder="Naam, functie, plaats, bedrijf of e-mail" aria-label="Zoekterm" style={{ flex: 1, minWidth: 220 }} autoFocus />
        <button className="btn dark" type="submit">Zoeken</button>
      </form>

      {q && total === 0 && <div className="card panel"><p style={{ margin: 0, color: 'var(--muted)' }}>Niets gevonden. Probeer een kortere zoekterm.</p></div>}

      {candidates.length > 0 && (
        <div className="card panel" style={{ marginBottom: 16, overflowX: 'auto' }}>
          <h3>Kandidaten ({candidates.length})</h3>
          <table className="table">
            <tbody>
              {candidates.map((c) => (
                <tr key={c.id}>
                  <td><Link href={`/admin/kandidaten/${c.id}`} style={{ textDecoration: 'none' }}><b>{c.firstName} {c.lastName}</b></Link><small style={{ display: 'block', color: 'var(--muted)' }}>{c.email}</small></td>
                  <td>{c.currentRole ?? c.desiredRole ?? '—'}</td>
                  <td>{c.city ?? '—'}</td>
                  <td><span className={`badge ${profileStatusBadge[c.profileStatus]}`}>{profileStatusLabel[c.profileStatus]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {vacancies.length > 0 && (
        <div className="card panel" style={{ marginBottom: 16, overflowX: 'auto' }}>
          <h3>Vacatures ({vacancies.length})</h3>
          <table className="table">
            <tbody>
              {vacancies.map((v) => (
                <tr key={v.id}>
                  <td><Link href={`/admin/vacatures/${v.id}`} style={{ textDecoration: 'none' }}><b>{v.title}</b></Link><small style={{ display: 'block', color: 'var(--muted)' }}>{[v.company?.name, v.city ?? v.location].filter(Boolean).join(' · ')}</small></td>
                  <td>{v._count.applications} sollicitaties</td>
                  <td><span className={`badge ${vacancyStatusBadge[v.status]}`}>{vacancyStatusLabel[v.status]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {companies.length > 0 && (
        <div className="card panel" style={{ marginBottom: 16 }}>
          <h3>Bedrijven ({companies.length})</h3>
          <table className="table">
            <tbody>
              {companies.map((c) => (
                <tr key={c.id}><td><Link href="/admin/bedrijven" style={{ textDecoration: 'none' }}><b>{c.name}</b></Link></td><td>{c.city ?? '—'}</td><td>{c.industry ?? '—'}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {leads.length > 0 && (
        <div className="card panel" style={{ overflowX: 'auto' }}>
          <h3>Berichten ({leads.length})</h3>
          <table className="table">
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td><Link href={`/admin/berichten#${l.id}`} style={{ textDecoration: 'none' }}><b>{l.firstName} {l.lastName !== '-' ? l.lastName : ''}</b></Link><small style={{ display: 'block', color: 'var(--muted)' }}>{l.companyName ?? l.email}</small></td>
                  <td>{l.vacancyTitle ?? '—'}</td>
                  <td>{dateLabel(l.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
