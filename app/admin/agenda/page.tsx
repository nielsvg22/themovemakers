import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { dateTimeLabel } from '@/lib/admin/labels'

export const dynamic = 'force-dynamic'

const dayKey = (d: Date) => d.toLocaleDateString('nl-NL', { timeZone: 'Europe/Amsterdam' })
const time = (d: Date) => d.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Amsterdam' })

export default async function AgendaPage() {
  const now = new Date()
  const startOfToday = new Date(now.getTime() - 12 * 3600000)
  const appointments = await prisma.appointment.findMany({
    where: { startTime: { gte: startOfToday } },
    include: { candidate: true },
    orderBy: { startTime: 'asc' },
    take: 50,
  })
  const today = dayKey(now)
  const tomorrow = dayKey(new Date(now.getTime() + 86400000))
  const groups = [
    { title: 'Vandaag', items: appointments.filter((a) => dayKey(a.startTime) === today) },
    { title: 'Morgen', items: appointments.filter((a) => dayKey(a.startTime) === tomorrow) },
    { title: 'Later', items: appointments.filter((a) => ![today, tomorrow].includes(dayKey(a.startTime))) },
  ]

  return (
    <>
      <div className="page-head">
        <div><h1>Agenda</h1><p>Korte kennismakingen (15 min, telefonisch) plan je vanuit het kandidaatprofiel.</p></div>
        <Link href="/admin/kandidaten?status=TE_BEOORDELEN" className="btn primary">Profielen beoordelen</Link>
      </div>
      <div className="grid connector-grid">
        {groups.map((g) => (
          <div key={g.title} className="card panel">
            <h3>{g.title}</h3>
            {g.items.length === 0 ? (
              <p style={{ margin: 0, color: 'var(--muted)' }}>Geen afspraken.</p>
            ) : (
              <div className="activity">
                {g.items.map((a) => (
                  <div key={a.id} className="activity-item">
                    <div className="activity-icon" style={{ fontSize: 11 }}>{time(a.startTime)}</div>
                    <div>
                      <p><b>{a.candidate ? <Link href={`/admin/kandidaten/${a.candidate.id}`}>{a.title}</Link> : a.title}</b></p>
                      <small>{g.title === 'Later' ? dateTimeLabel(a.startTime) : a.location}</small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
