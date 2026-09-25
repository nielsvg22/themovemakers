import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import { NoteForm, PlanKennismakingForm, StatusControl } from '@/components/admin/CandidateControls'
import { CandidateEmailForm } from '@/components/admin/CandidateEmailForm'
import { applicationStatusLabel, dateLabel, dateTimeLabel, profileStatusBadge, profileStatusLabel, sourceLabel } from '@/lib/admin/labels'

export const dynamic = 'force-dynamic'

export default async function CandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const c = await prisma.candidate.findUnique({
    where: { id: (await params).id },
    include: {
      cvFiles: { select: { id: true, fileName: true, size: true, createdAt: true }, orderBy: { createdAt: 'desc' } },
      applications: { include: { vacancy: { include: { company: true } } }, orderBy: { appliedAt: 'desc' } },
      notes: { include: { author: true }, orderBy: { createdAt: 'desc' } },
      appointments: { orderBy: { startTime: 'desc' } },
      activities: { orderBy: { createdAt: 'desc' }, take: 10 },
    },
  })
  if (!c) notFound()
  const [templates, emails] = await Promise.all([
    prisma.template.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true, subject: true, content: true } }),
    prisma.emailLog.findMany({ where: { candidateId: c.id }, orderBy: { createdAt: 'desc' }, take: 10, select: { id: true, subject: true, status: true, createdAt: true } }),
  ])

  const rows: [string, React.ReactNode][] = [
    ['E-mail', <a key="e" href={`mailto:${c.email}`}>{c.email}</a>],
    ['Telefoon', c.phone ? <a key="p" href={`tel:${c.phone.replace(/\s/g, '')}`}>{c.phone}</a> : '—'],
    ['Woonplaats / regio', c.city ?? '—'],
    ['Vakgebied', c.sector ?? '—'],
    ['Huidige functie', c.currentRole ?? '—'],
    ['Gewenste functie', c.desiredRole ?? '—'],
    ['Ervaring', c.yearsExperience ?? '—'],
    ['Beschikbaarheid', c.availability ?? '—'],
    ['LinkedIn', c.linkedin ? <a key="l" href={c.linkedin} target="_blank" rel="noopener noreferrer">Profiel openen</a> : '—'],
    ['Bron', c.source ? (sourceLabel[c.source] ?? c.source) : '—'],
  ]

  return (
    <>
      <div className="page-head">
        <div>
          <p style={{ marginBottom: 6 }}><Link href="/admin/kandidaten" style={{ color: 'var(--muted)' }}>← Kandidaten</Link></p>
          <h1>{c.firstName} {c.lastName}</h1>
          <p>{[c.currentRole ?? c.desiredRole, c.city, c.yearsExperience].filter(Boolean).join(' · ') || 'Nieuw profiel'}</p>
        </div>
        <span className={`badge ${profileStatusBadge[c.profileStatus]}`} style={{ fontSize: 13, padding: '8px 12px' }}>{profileStatusLabel[c.profileStatus]}</span>
      </div>

      <div className="editor-layout">
        <div className="grid">
          <div className="card panel">
            <h3 className="section-title">Profiel</h3>
            <div className="form-grid">
              {rows.map(([label, value]) => (
                <div key={label} className="field"><label>{label}</label><div style={{ fontSize: 14 }}>{value}</div></div>
              ))}
            </div>
            {c.callPreference && <p style={{ marginTop: 14, fontSize: 14 }}><b>Voorkeur voor kennismaking:</b> {c.callPreference}</p>}
            {c.motivation && (
              <>
                <h4 style={{ margin: '16px 0 6px', fontSize: 13 }}>Toelichting van de kandidaat</h4>
                <p style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#40515b', fontSize: 14 }}>{c.motivation}</p>
              </>
            )}
          </div>

          <div className="card panel">
            <h3 className="section-title">Cv</h3>
            {c.cvFiles.length === 0 ? (
              <p style={{ margin: 0, color: 'var(--muted)' }}>Geen cv geüpload.</p>
            ) : (
              <table className="table">
                <tbody>
                  {c.cvFiles.map((f) => (
                    <tr key={f.id}>
                      <td><b>{f.fileName}</b><br /><small style={{ color: 'var(--muted)' }}>{Math.round(f.size / 1024)} kB · {dateLabel(f.createdAt)}</small></td>
                      <td style={{ textAlign: 'right' }}><a className="btn ghost" href={`/api/cv/${f.id}`} target="_blank" rel="noopener noreferrer">Openen</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="card panel">
            <h3 className="section-title">Sollicitaties</h3>
            {c.applications.length === 0 ? (
              <p style={{ margin: 0, color: 'var(--muted)' }}>Nog niet gekoppeld aan een vacature.</p>
            ) : (
              <table className="table">
                <tbody>
                  {c.applications.map((a) => (
                    <tr key={a.id}>
                      <td><b>{a.vacancy.title}</b><br /><small style={{ color: 'var(--muted)' }}>{a.vacancy.company?.name ?? 'Eigen vacature'} · via {a.source ? (sourceLabel[a.source] ?? a.source) : 'onbekend'}</small></td>
                      <td>{dateLabel(a.appliedAt)}</td>
                      <td><span className="badge b-blue">{applicationStatusLabel[a.status]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="card panel">
            <h3 className="section-title">Notities</h3>
            <NoteForm candidateId={c.id} />
            <div className="activity" style={{ marginTop: 16 }}>
              {c.notes.map((n) => (
                <div key={n.id} className="activity-item">
                  <div className="activity-icon">✎</div>
                  <div><p style={{ whiteSpace: 'pre-wrap' }}>{n.content}</p><small>{n.author.name ?? n.author.email} · {dateLabel(n.createdAt)}</small></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sticky" style={{ alignContent: 'start' }}>
          <div className="card panel">
            <h3>Beoordeling</h3>
            <StatusControl id={c.id} status={c.profileStatus} />
          </div>
          <div className="card panel">
            <h3>Korte kennismaking</h3>
            <PlanKennismakingForm candidateId={c.id} preference={c.callPreference} />
            {c.appointments.length > 0 && (
              <div className="activity" style={{ marginTop: 16 }}>
                {c.appointments.map((a) => (
                  <div key={a.id} className="activity-item">
                    <div className="activity-icon">☎</div>
                    <div><p><b>{dateTimeLabel(a.startTime)}</b></p><small>{a.location}</small></div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="card panel" id="mail">
            <h3>E-mail sturen</h3>
            <CandidateEmailForm candidateId={c.id} templates={templates} />
            {emails.length > 0 && (
              <div className="activity" style={{ marginTop: 16 }}>
                {emails.map((m) => (
                  <Link key={m.id} href={`/admin/emails/${m.id}`} className="activity-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="activity-icon">✉</div>
                    <div><p>{m.subject}</p><small>{dateLabel(m.createdAt)} · {m.status.replace('_', ' ')}</small></div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="card panel">
            <h3>Activiteit</h3>
            <div className="activity">
              {c.activities.map((a) => (
                <div key={a.id} className="activity-item"><div className="activity-icon">•</div><div><p>{a.description}</p><small>{dateLabel(a.createdAt)}</small></div></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
