import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { setLeadStatus } from '@/app/admin/manage-actions'
import { ActionButton } from '@/components/admin/Forms'
import { dateTimeLabel } from '@/lib/admin/labels'

export const dynamic = 'force-dynamic'

const typeLabel: Record<string, string> = { RECRUITMENT_SCAN: 'Recruitmentscan', CONTACT: 'Contact', VACATURE_INTAKE: 'Vacature-intake' }

export default async function BerichtenPage({ searchParams }: { searchParams: Promise<{ toon?: string }> }) {
  const showAll = (await searchParams).toon === 'alle'
  const [leads, open, handled] = await Promise.all([
    prisma.lead.findMany({ where: showAll ? {} : { status: 'NEW' }, orderBy: { createdAt: 'desc' }, take: 100 }),
    prisma.lead.count({ where: { status: 'NEW' } }),
    prisma.lead.count({ where: { status: { not: 'NEW' } } }),
  ])

  return (
    <>
      <div className="page-head">
        <div><h1>Berichten</h1><p>Contactberichten en recruitmentscans van werkgevers via de website.</p></div>
      </div>
      <div className="toolbar">
        <Link href="/admin/berichten" className={`btn ${showAll ? 'ghost' : 'dark'}`}>Open ({open})</Link>
        <Link href="/admin/berichten?toon=alle" className={`btn ${showAll ? 'dark' : 'ghost'}`}>Alle ({open + handled})</Link>
      </div>
      {leads.length === 0 ? (
        <div className="card panel"><p style={{ margin: 0, color: 'var(--muted)' }}>{showAll ? 'Nog geen berichten ontvangen.' : 'Geen open berichten. Alles is afgehandeld.'}</p></div>
      ) : (
        <div className="grid" style={{ gap: 12 }}>
          {leads.map((l) => {
            const name = `${l.firstName}${l.lastName !== '-' ? ` ${l.lastName}` : ''}`
            const subject = l.type === 'RECRUITMENT_SCAN' ? 'Je aanvraag voor een recruitmentscan' : 'Je bericht aan The Move Maker'
            return (
              <div key={l.id} id={l.id} className="card panel">
                <div className="page-head" style={{ marginBottom: 8 }}>
                  <div>
                    <h3 style={{ margin: 0 }}>{name}{l.companyName ? ` · ${l.companyName}` : ''}</h3>
                    <p style={{ margin: '4px 0 0' }}>{dateTimeLabel(l.createdAt)}{l.vacancyTitle ? ` · ${l.vacancyTitle}` : ''}{l.location ? ` · ${l.location}` : ''}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span className={`badge ${l.type === 'RECRUITMENT_SCAN' ? 'b-purple' : 'b-blue'}`}>{typeLabel[l.type] ?? l.type}</span>
                    <span className={`badge ${l.status === 'NEW' ? 'b-yellow' : 'b-green'}`}>{l.status === 'NEW' ? 'Open' : 'Afgehandeld'}</span>
                  </div>
                </div>
                {l.challenge ? <p style={{ whiteSpace: 'pre-wrap', margin: '0 0 12px', fontSize: 14, color: '#40515b' }}>{l.challenge}</p> : <p style={{ margin: '0 0 12px', color: 'var(--muted)' }}>Geen toelichting.</p>}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  <a className="btn primary" href={`mailto:${l.email}?subject=${encodeURIComponent(subject)}`}>Beantwoorden</a>
                  {l.phone && <a className="btn ghost" href={`tel:${l.phone.replace(/\s/g, '')}`}>Bel {l.phone}</a>}
                  {l.status === 'NEW' ? (
                    <ActionButton action={setLeadStatus.bind(null, l.id, 'AFGEHANDELD')} done="Gemarkeerd als afgehandeld">✓ Afgehandeld</ActionButton>
                  ) : (
                    <ActionButton action={setLeadStatus.bind(null, l.id, 'NEW')} done="Weer op open gezet">Heropenen</ActionButton>
                  )}
                  <small style={{ color: 'var(--muted)' }}>{l.email}</small>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
