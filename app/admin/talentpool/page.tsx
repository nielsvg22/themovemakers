import Link from 'next/link'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import { profileStatusBadge, profileStatusLabel } from '@/lib/admin/labels'

export const dynamic = 'force-dynamic'

export default async function TalentpoolPage({ searchParams }: { searchParams: Promise<{ q?: string; regio?: string }> }) {
  const { q, regio } = await searchParams
  const where: Prisma.CandidateWhereInput = {
    profileStatus: { in: ['INTERESSANT', 'KANDIDATENPOOL', 'KENNISMAKING_GEPLAND', 'DOOR_NAAR_PROCEDURE'] },
    ...(regio ? { city: { contains: regio, mode: 'insensitive' } } : {}),
    ...(q ? { OR: ['currentRole', 'desiredRole', 'sector', 'motivation'].map((f) => ({ [f]: { contains: q, mode: 'insensitive' } })) } : {}),
  }
  const talent = await prisma.candidate.findMany({ where, orderBy: { updatedAt: 'desc' }, take: 200 })

  return (
    <>
      <div className="page-head">
        <div><h1>Talentpool</h1><p>Kandidaten die interessant zijn beoordeeld, te vinden op functie, vakgebied en regio.</p></div>
      </div>
      <form className="toolbar" action="/admin/talentpool">
        <input className="input" name="q" defaultValue={q} placeholder="Zoek functie of vakgebied..." aria-label="Zoek functie of vakgebied" />
        <input className="input" name="regio" defaultValue={regio} placeholder="Regio of plaats" aria-label="Regio" />
        <button className="btn dark" type="submit">Zoeken</button>
      </form>
      <div className="card panel" style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead><tr><th>Naam</th><th>Profiel</th><th>Vakgebied</th><th>Regio</th><th>Beschikbaar</th><th>Status</th></tr></thead>
          <tbody>
            {talent.map((t) => (
              <tr key={t.id}>
                <td><Link href={`/admin/kandidaten/${t.id}`}><b>{t.firstName} {t.lastName}</b></Link></td>
                <td>{t.currentRole ?? t.desiredRole ?? '—'}{t.yearsExperience && <small style={{ display: 'block', color: 'var(--muted)' }}>{t.yearsExperience}</small>}</td>
                <td>{t.sector ?? '—'}</td>
                <td>{t.city ?? '—'}</td>
                <td>{t.availability ?? '—'}</td>
                <td><span className={`badge ${profileStatusBadge[t.profileStatus]}`}>{profileStatusLabel[t.profileStatus]}</span></td>
              </tr>
            ))}
            {talent.length === 0 && <tr><td colSpan={6} style={{ color: 'var(--muted)' }}>Nog geen kandidaten in de talentpool.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  )
}
