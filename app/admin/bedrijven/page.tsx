import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { createCompany, deleteCompany } from '@/app/admin/manage-actions'
import { ActionButton, AdminForm } from '@/components/admin/Forms'

export const dynamic = 'force-dynamic'

export default async function BedrijvenPage() {
  const [companies, openLeads] = await Promise.all([
    prisma.company.findMany({
      orderBy: { name: 'asc' },
      include: { vacancies: { select: { status: true, _count: { select: { applications: true } } } } },
    }),
    prisma.lead.count({ where: { status: 'NEW' } }),
  ])
  return (
    <>
      <div className="page-head">
        <div><h1>Bedrijven</h1><p>CRM-overzicht van opdrachtgevers. Een opdrachtgever koppelen aan een vacature is optioneel.</p></div>
        <a href="#nieuw" className="btn primary">＋ Bedrijf</a>
      </div>
      {openLeads > 0 && (
        <Link href="/admin/berichten" className="card panel filter-item" style={{ marginBottom: 16, textDecoration: 'none' }}>
          <span><b>{openLeads}</b> open {openLeads === 1 ? 'aanvraag' : 'aanvragen'} van werkgevers</span><span className="badge b-yellow">Naar berichten →</span>
        </Link>
      )}
      <div className="grid connector-grid">
        {companies.map((c) => {
          const active = c.vacancies.filter((v) => v.status === 'ACTIEF').length
          const candidates = c.vacancies.reduce((n, v) => n + v._count.applications, 0)
          return (
            <div key={c.id} className="card connector">
              <h3>{c.name}</h3>
              <p>{active} actieve {active === 1 ? 'vacature' : 'vacatures'} · {candidates} kandidaten{c.city ? ` · ${c.city}` : ''}{c.industry ? ` · ${c.industry}` : ''}</p>
              {c.website && <p style={{ margin: '0 0 8px' }}><a href={c.website} target="_blank" rel="noopener noreferrer">{c.website.replace(/^https?:\/\//, '')}</a></p>}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <span className={`badge ${active > 0 ? 'b-green' : 'b-yellow'}`}>{active > 0 ? 'Actieve klant' : 'Opvolgen'}</span>
                <ActionButton
                  action={deleteCompany.bind(null, c.id)}
                  confirm={`${c.name} verwijderen? Gekoppelde vacatures blijven bestaan, zonder opdrachtgever.`}
                  done={`${c.name} verwijderd`}
                  className="btn soft"
                >
                  Verwijderen
                </ActionButton>
              </div>
            </div>
          )
        })}
        {companies.length === 0 && <div className="card panel"><p style={{ margin: 0, color: 'var(--muted)' }}>Nog geen bedrijven.</p></div>}
      </div>
      <div className="card panel" style={{ marginTop: 16 }}>
        <h3>Nieuw bedrijf</h3>
        <AdminForm action={createCompany} submitLabel="Bedrijf toevoegen" id="nieuw">
          <div className="form-grid">
            <div className="field"><label htmlFor="c-name">Bedrijfsnaam</label><input id="c-name" name="name" required /></div>
            <div className="field"><label htmlFor="c-city">Plaats</label><input id="c-city" name="city" /></div>
            <div className="field"><label htmlFor="c-industry">Branche</label><input id="c-industry" name="industry" placeholder="Bijv. Bouw, Infra" /></div>
            <div className="field"><label htmlFor="c-web">Website</label><input id="c-web" name="website" placeholder="www.voorbeeld.nl" /></div>
          </div>
        </AdminForm>
      </div>
    </>
  )
}
