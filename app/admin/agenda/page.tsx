import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { dateTimeLabel } from '@/lib/admin/labels'
import { createAppointment, deleteAppointment } from '@/app/admin/manage-actions'
import { ActionButton, AdminForm } from '@/components/admin/Forms'

export const dynamic = 'force-dynamic'

const dayKey = (d: Date) => d.toLocaleDateString('nl-NL', { timeZone: 'Europe/Amsterdam' })
const time = (d: Date) => d.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Amsterdam' })

export default async function AgendaPage() {
  const now = new Date()
  const startOfToday = new Date(now.getTime() - 12 * 3600000)
  const [appointments, candidates, companies] = await Promise.all([
    prisma.appointment.findMany({
      where: { startTime: { gte: startOfToday } },
      include: { candidate: true, company: true },
      orderBy: { startTime: 'asc' },
      take: 50,
    }),
    prisma.candidate.findMany({ select: { id: true, firstName: true, lastName: true }, orderBy: { updatedAt: 'desc' }, take: 100 }),
    prisma.company.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
  ])
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
        <div><h1>Agenda</h1><p>Korte kennismakingen plan je vanuit het kandidaatprofiel; overige afspraken hieronder.</p></div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/admin/kandidaten?status=TE_BEOORDELEN" className="btn ghost">Profielen beoordelen</Link>
          <a href="#nieuw" className="btn primary">＋ Afspraak</a>
        </div>
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
                      <small>{g.title === 'Later' ? dateTimeLabel(a.startTime) : a.location}{a.company ? ` · ${a.company.name}` : ''}</small>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                      <ActionButton action={deleteAppointment.bind(null, a.id)} confirm="Afspraak verwijderen?" done="Afspraak verwijderd" className="btn soft" title="Verwijderen">×</ActionButton>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="card panel" style={{ marginTop: 16 }}>
        <h3>Nieuwe afspraak</h3>
        <AdminForm action={createAppointment} submitLabel="Afspraak inplannen" id="nieuw">
          <div className="form-grid">
            <div className="field"><label htmlFor="a-title">Titel</label><input id="a-title" name="title" required placeholder="Bijv. intake nieuwe vacature" /></div>
            <div className="field">
              <label htmlFor="a-type">Soort</label>
              <select id="a-type" name="type" defaultValue="KLANT_GESPREK">
                <option value="KANDIDATEN_GESPREK">Gesprek met kandidaat</option><option value="KLANT_GESPREK">Gesprek met opdrachtgever</option>
                <option value="FOLLOW_UP">Follow-up</option><option value="REMINDER">Herinnering</option>
              </select>
            </div>
            <div className="field"><label htmlFor="a-start">Datum en tijd</label><input id="a-start" name="startTime" type="datetime-local" required /></div>
            <div className="field">
              <label htmlFor="a-duration">Duur</label>
              <select id="a-duration" name="duration" defaultValue="30"><option value="15">15 minuten</option><option value="30">30 minuten</option><option value="60">1 uur</option><option value="90">1,5 uur</option></select>
            </div>
            <div className="field">
              <label htmlFor="a-link">Met (optioneel)</label>
              <select id="a-link" name="link" defaultValue="">
                <option value="">Niemand gekoppeld</option>
                {candidates.length > 0 && <optgroup label="Kandidaten">{candidates.map((c) => <option key={c.id} value={`c:${c.id}`}>{c.firstName} {c.lastName}</option>)}</optgroup>}
                {companies.length > 0 && <optgroup label="Bedrijven">{companies.map((c) => <option key={c.id} value={`b:${c.id}`}>{c.name}</option>)}</optgroup>}
              </select>
            </div>
            <div className="field"><label htmlFor="a-loc">Locatie</label><input id="a-loc" name="location" placeholder="Telefonisch, Teams of adres" /></div>
          </div>
        </AdminForm>
      </div>
    </>
  )
}
