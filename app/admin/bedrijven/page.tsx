import { prisma } from '@/lib/db/prisma'
import { dateLabel } from '@/lib/admin/labels'

export const dynamic = 'force-dynamic'

export default async function BedrijvenPage() {
  const [companies, leads] = await Promise.all([
    prisma.company.findMany({
      orderBy: { name: 'asc' },
      include: { vacancies: { select: { status: true, _count: { select: { applications: true } } } } },
    }),
    prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }),
  ])
  return (
    <>
      <div className="page-head">
        <div><h1>Bedrijven</h1><p>CRM-overzicht van opdrachtgevers en binnengekomen aanvragen.</p></div>
      </div>
      <div className="card panel" style={{ marginBottom: 16 }}>
        <h3>Aanvragen van werkgevers</h3>
        {leads.length === 0 ? (
          <p style={{ margin: 0, color: 'var(--muted)' }}>Nog geen recruitmentscans of contactaanvragen.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead><tr><th>Naam</th><th>Bedrijf</th><th>Type</th><th>Functie / onderwerp</th><th>Contact</th><th>Datum</th></tr></thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id}>
                    <td><b>{l.firstName} {l.lastName !== '-' ? l.lastName : ''}</b>{l.challenge && <small style={{ display: 'block', color: 'var(--muted)', maxWidth: 320 }}>{l.challenge.slice(0, 120)}</small>}</td>
                    <td>{l.companyName ?? '—'}</td>
                    <td><span className={`badge ${l.type === 'RECRUITMENT_SCAN' ? 'b-purple' : 'b-blue'}`}>{l.type === 'RECRUITMENT_SCAN' ? 'Recruitmentscan' : 'Contact'}</span></td>
                    <td>{l.vacancyTitle ?? '—'}</td>
                    <td><a href={`mailto:${l.email}`}>{l.email}</a>{l.phone && <small style={{ display: 'block' }}>{l.phone}</small>}</td>
                    <td>{dateLabel(l.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="grid connector-grid">
        {companies.map((c) => {
          const active = c.vacancies.filter((v) => v.status === 'ACTIEF').length
          const candidates = c.vacancies.reduce((n, v) => n + v._count.applications, 0)
          return (
            <div key={c.id} className="card connector">
              <h3>{c.name}</h3>
              <p>{active} actieve {active === 1 ? 'vacature' : 'vacatures'} · {candidates} kandidaten{c.city ? ` · ${c.city}` : ''}</p>
              <span className={`badge ${active > 0 ? 'b-green' : 'b-yellow'}`}>{active > 0 ? 'Actieve klant' : 'Opvolgen'}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}
