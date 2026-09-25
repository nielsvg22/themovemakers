import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { dateTimeLabel } from '@/lib/admin/labels'

export const dynamic = 'force-dynamic'

const statusBadge: Record<string, [string, string]> = {
  verzonden: ['b-green', 'Verzonden'],
  mislukt: ['b-red', 'Mislukt'],
  niet_verzonden: ['b-gray', 'Niet verzonden'],
}

export default async function EmailsPage() {
  const [emails, counts] = await Promise.all([
    prisma.emailLog.findMany({ orderBy: { createdAt: 'desc' }, take: 200, select: { id: true, type: true, to: true, originalTo: true, subject: true, status: true, error: true, createdAt: true } }),
    prisma.emailLog.groupBy({ by: ['status'], _count: { _all: true } }),
  ])
  const count = (s: string) => counts.find((c) => c.status === s)?._count._all ?? 0

  return (
    <>
      <div className="page-head">
        <div><h1>Verzonden mails</h1><p>Alle e-mails die de website verstuurt: bevestigingen, meldingen en testmails.</p></div>
        <Link href="/admin/instellingen" className="btn ghost">E-mailinstellingen</Link>
      </div>
      <div className="grid report-grid" style={{ marginBottom: 16 }}>
        <div className="card metric"><h4>Totaal</h4><strong>{emails.length}</strong></div>
        <div className="card metric"><h4>Verzonden</h4><strong>{count('verzonden')}</strong></div>
        <div className="card metric"><h4>Mislukt</h4><strong>{count('mislukt')}</strong></div>
        <div className="card metric"><h4>Niet verzonden (geen sleutel)</h4><strong>{count('niet_verzonden')}</strong></div>
      </div>
      <div className="card panel" style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead><tr><th>Onderwerp</th><th>Aan</th><th>Type</th><th>Status</th><th>Datum</th></tr></thead>
          <tbody>
            {emails.map((m) => {
              const [badge, label] = statusBadge[m.status] ?? ['b-gray', m.status]
              return (
                <tr key={m.id}>
                  <td><Link href={`/admin/emails/${m.id}`}><b>{m.subject}</b></Link>{m.error && <small style={{ display: 'block', color: 'var(--red)' }}>{m.error}</small>}</td>
                  <td>{m.to}{m.originalTo && <small style={{ display: 'block', color: 'var(--muted)' }}>bedoeld voor {m.originalTo}</small>}</td>
                  <td>{m.type.replace(/_/g, ' ')}</td>
                  <td><span className={`badge ${badge}`}>{label}</span></td>
                  <td>{dateTimeLabel(m.createdAt)}</td>
                </tr>
              )
            })}
            {emails.length === 0 && <tr><td colSpan={5} style={{ color: 'var(--muted)' }}>Nog geen e-mails. Zodra iemand solliciteert of een formulier invult, verschijnen ze hier.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  )
}
