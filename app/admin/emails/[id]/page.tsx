import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import { dateTimeLabel } from '@/lib/admin/labels'

export const dynamic = 'force-dynamic'

export default async function EmailDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const m = await prisma.emailLog.findUnique({ where: { id: (await params).id } })
  if (!m) notFound()
  const rows: [string, string | null][] = [
    ['Aan', m.to],
    ['Bedoeld voor', m.originalTo],
    ['Type', m.type.replace(/_/g, ' ')],
    ['Status', m.status],
    ['Resend-ID', m.providerId],
    ['Foutmelding', m.error],
    ['Datum', dateTimeLabel(m.createdAt)],
  ]
  return (
    <>
      <div className="page-head">
        <div>
          <p style={{ marginBottom: 6 }}><Link href="/admin/emails" style={{ color: 'var(--muted)' }}>← Verzonden mails</Link></p>
          <h1 style={{ fontSize: 24 }}>{m.subject}</h1>
        </div>
        {m.candidateId && <Link href={`/admin/kandidaten/${m.candidateId}`} className="btn ghost">Bekijk kandidaat</Link>}
      </div>
      <div className="editor-layout">
        <div className="card panel" style={{ padding: 0, overflow: 'hidden' }}>
          {/* Sandbox zonder scripts: de mail wordt getoond zoals de ontvanger hem ziet. */}
          <iframe title="Voorbeeld e-mail" srcDoc={m.html} sandbox="" style={{ width: '100%', height: 720, border: 0, display: 'block' }} />
        </div>
        <div className="card panel sticky">
          <h3>Details</h3>
          <table className="table">
            <tbody>
              {rows.filter(([, v]) => v).map(([k, v]) => <tr key={k}><td style={{ color: 'var(--muted)' }}>{k}</td><td>{v}</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
