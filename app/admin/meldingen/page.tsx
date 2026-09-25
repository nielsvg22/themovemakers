import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { dateTimeLabel } from '@/lib/admin/labels'

export const dynamic = 'force-dynamic'

const icon: Record<string, string> = {
  cv_check: '📄', kennismaking: '☎', open_sollicitatie: '👤', sollicitatie: '👤', status: '✎', email: '✉', kandidaat: '＋',
}

export default async function MeldingenPage() {
  const now = new Date()
  const [toReview, newLeads, dueTasks, upcoming, activities, failedMails] = await Promise.all([
    prisma.candidate.count({ where: { profileStatus: { in: ['NIEUW_PROFIEL', 'TE_BEOORDELEN'] } } }),
    prisma.lead.count({ where: { status: 'NEW' } }),
    prisma.task.count({ where: { status: { in: ['OPEN', 'IN_VOORTGANG'] }, dueDate: { lte: new Date(now.getTime() + 86400000) } } }),
    prisma.appointment.count({ where: { startTime: { gte: now, lte: new Date(now.getTime() + 2 * 86400000) } } }),
    prisma.activity.findMany({ orderBy: { createdAt: 'desc' }, take: 40 }),
    prisma.emailLog.count({ where: { status: { not: 'verzonden' }, createdAt: { gte: new Date(now.getTime() - 7 * 86400000) } } }),
  ])

  const alerts = [
    { show: toReview > 0, text: `${toReview} ${toReview === 1 ? 'profiel wacht' : 'profielen wachten'} op beoordeling`, href: '/admin/kandidaten?status=TE_BEOORDELEN', badge: 'b-yellow' },
    { show: newLeads > 0, text: `${newLeads} ${newLeads === 1 ? 'nieuw bericht' : 'nieuwe berichten'} van werkgevers`, href: '/admin/berichten', badge: 'b-blue' },
    { show: dueTasks > 0, text: `${dueTasks} ${dueTasks === 1 ? 'taak' : 'taken'} met deadline vandaag of eerder`, href: '/admin/taken', badge: 'b-red' },
    { show: upcoming > 0, text: `${upcoming} ${upcoming === 1 ? 'afspraak' : 'afspraken'} in de komende 48 uur`, href: '/admin/agenda', badge: 'b-purple' },
    { show: failedMails > 0, text: `${failedMails} e-mail${failedMails === 1 ? '' : 's'} niet verzonden (afgelopen week)`, href: '/admin/emails', badge: 'b-red' },
  ].filter((a) => a.show)

  return (
    <>
      <div className="page-head">
        <div><h1>Meldingen</h1><p>Wat er aandacht nodig heeft en wat er recent is gebeurd.</p></div>
      </div>
      <div className="card panel" style={{ marginBottom: 16 }}>
        <h3>Actie nodig</h3>
        {alerts.length === 0 ? (
          <p style={{ margin: 0, color: 'var(--muted)' }}>Alles is bijgewerkt.</p>
        ) : (
          <div className="grid" style={{ gap: 8 }}>
            {alerts.map((a) => (
              <Link key={a.href} href={a.href} className="filter-item" style={{ textDecoration: 'none' }}>
                <span>{a.text}</span><span className={`badge ${a.badge}`}>Bekijk →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="card panel">
        <h3>Recente activiteit</h3>
        <div className="activity">
          {activities.map((a) => {
            const body = <div><p>{a.description}</p><small>{dateTimeLabel(a.createdAt)}</small></div>
            return (
              <div key={a.id} className="activity-item">
                <div className="activity-icon">{icon[a.type] ?? '•'}</div>
                {a.candidateId ? <Link href={`/admin/kandidaten/${a.candidateId}`} style={{ textDecoration: 'none', color: 'inherit' }}>{body}</Link> : body}
              </div>
            )
          })}
          {activities.length === 0 && <p style={{ margin: 0, color: 'var(--muted)' }}>Nog geen activiteit.</p>}
        </div>
      </div>
    </>
  )
}
