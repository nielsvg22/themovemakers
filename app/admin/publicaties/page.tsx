import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { ConnectorsGrid } from '@/components/admin/ConnectorsGrid'
import { dateTimeLabel } from '@/lib/admin/labels'
import { getChannelLabel } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const statusBadge: Record<string, string> = { LIVE: 'b-green', ELIGIBLE: 'b-blue', GETEST: 'b-yellow', FOUT: 'b-red', IN_WACHTRIJ: 'b-gray', INGETROKKEN: 'b-gray' }
const statusText: Record<string, string> = { LIVE: 'Live', ELIGIBLE: 'Eligible', GETEST: 'Getest', FOUT: 'Fout', IN_WACHTRIJ: 'In wachtrij', INGETROKKEN: 'Ingetrokken', CONCEPT: 'Concept' }

export default async function PublicatiesPage() {
  const publications = await prisma.vacancyPublication.findMany({ include: { vacancy: true }, orderBy: { createdAt: 'desc' }, take: 30 })
  return (
    <>
      <div className="page-head">
        <div><h1>Publicaties &amp; koppelingen</h1><p>Beheer jobboards, feeds, API-koppelingen en publicatiestatussen.</p></div>
        <Link className="btn primary" href="/admin/vacatures">Nieuwe publicatie</Link>
      </div>
      <ConnectorsGrid />
      <div className="card panel" style={{ marginTop: 16, overflowX: 'auto' }}>
        <h3>Recente publicaties</h3>
        <table className="table">
          <thead><tr><th>Vacature</th><th>Kanaal</th><th>Modus</th><th>Status</th><th>Extern ID</th><th>Datum</th><th>Melding</th></tr></thead>
          <tbody>
            {publications.map((p) => (
              <tr key={p.id}>
                <td>{p.vacancy.title}</td>
                <td>{getChannelLabel(p.channel)}</td>
                <td>{p.mode === 'TEST' ? 'Test' : 'Productie'}</td>
                <td><span className={`badge ${statusBadge[p.status] ?? 'b-gray'}`}>{statusText[p.status] ?? p.status}</span></td>
                <td>{p.externalJobId ?? '—'}</td>
                <td>{dateTimeLabel(p.createdAt)}</td>
                <td style={{ color: 'var(--muted)', maxWidth: 260 }}>{p.errorMessage ?? ''}</td>
              </tr>
            ))}
            {publications.length === 0 && <tr><td colSpan={7} style={{ color: 'var(--muted)' }}>Nog geen publicaties. Publiceer een vacature via Vacatures.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  )
}
