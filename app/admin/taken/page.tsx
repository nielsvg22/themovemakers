import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { createTask, deleteTask, setTaskStatus } from '@/app/admin/manage-actions'
import { ActionButton, AdminForm } from '@/components/admin/Forms'
import { dateLabel } from '@/lib/admin/labels'

export const dynamic = 'force-dynamic'

const priorityBadge = { HOOG: 'b-red', NORMAAL: 'b-yellow', LAAG: 'b-gray' } as const
const priorityLabel = { HOOG: 'Hoog', NORMAAL: 'Normaal', LAAG: 'Laag' } as const

function deadline(d: Date | null) {
  if (!d) return { text: '—', late: false }
  const key = (x: Date) => x.toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' })
  const today = key(new Date())
  const tomorrow = key(new Date(Date.now() + 86400000))
  if (key(d) === today) return { text: 'Vandaag', late: false }
  if (key(d) === tomorrow) return { text: 'Morgen', late: false }
  return { text: dateLabel(d), late: key(d) < today }
}

export default async function TakenPage({ searchParams }: { searchParams: Promise<{ toon?: string }> }) {
  const showDone = (await searchParams).toon === 'afgerond'
  const [tasks, candidates, vacancies, companies] = await Promise.all([
    prisma.task.findMany({
      where: { status: showDone ? { in: ['VOLTOOID', 'GECANCELD'] } : { in: ['OPEN', 'IN_VOORTGANG'] } },
      include: { candidate: true, vacancy: true, company: true, owner: true },
      orderBy: showDone ? [{ completedAt: 'desc' }] : [{ dueDate: { sort: 'asc', nulls: 'last' } }, { createdAt: 'desc' }],
      take: 200,
    }),
    prisma.candidate.findMany({ select: { id: true, firstName: true, lastName: true }, orderBy: { updatedAt: 'desc' }, take: 100 }),
    prisma.vacancy.findMany({ where: { status: { in: ['ACTIEF', 'CONCEPT'] } }, select: { id: true, title: true }, orderBy: { updatedAt: 'desc' }, take: 50 }),
    prisma.company.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
  ])

  return (
    <>
      <div className="page-head">
        <div><h1>Taken</h1><p>Volg acties op voor kandidaten, vacatures en klanten.</p></div>
        <a href="#nieuw" className="btn primary">＋ Taak</a>
      </div>
      <div className="toolbar">
        <Link href="/admin/taken" className={`btn ${showDone ? 'ghost' : 'dark'}`}>Open</Link>
        <Link href="/admin/taken?toon=afgerond" className={`btn ${showDone ? 'dark' : 'ghost'}`}>Afgerond</Link>
      </div>
      <div className="card panel" style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead><tr><th>Taak</th><th>Gekoppeld aan</th><th>Deadline</th><th>Prioriteit</th><th>Eigenaar</th><th style={{ textAlign: 'right' }}>Actie</th></tr></thead>
          <tbody>
            {tasks.map((t) => {
              const due = deadline(t.dueDate)
              const linked = t.candidate
                ? <Link href={`/admin/kandidaten/${t.candidate.id}`}>{t.candidate.firstName} {t.candidate.lastName}</Link>
                : t.vacancy ? <Link href={`/admin/vacatures/${t.vacancy.id}`}>{t.vacancy.title}</Link>
                : t.company ? t.company.name : '—'
              return (
                <tr key={t.id}>
                  <td><b style={showDone ? { textDecoration: 'line-through', color: 'var(--muted)' } : undefined}>{t.title}</b>{t.description && <small style={{ display: 'block', color: 'var(--muted)' }}>{t.description}</small>}</td>
                  <td>{linked}</td>
                  <td style={due.late && !showDone ? { color: 'var(--red)', fontWeight: 700 } : undefined}>{due.text}</td>
                  <td><span className={`badge ${priorityBadge[t.priority]}`}>{priorityLabel[t.priority]}</span></td>
                  <td>{t.owner.name ?? t.owner.email}</td>
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {showDone ? (
                      <ActionButton action={setTaskStatus.bind(null, t.id, 'OPEN')} done="Taak heropend">Heropenen</ActionButton>
                    ) : (
                      <ActionButton action={setTaskStatus.bind(null, t.id, 'VOLTOOID')} done="Taak afgerond" className="btn primary">✓ Klaar</ActionButton>
                    )}{' '}
                    <ActionButton action={deleteTask.bind(null, t.id)} confirm="Taak verwijderen?" done="Taak verwijderd" className="btn soft" title="Verwijderen">×</ActionButton>
                  </td>
                </tr>
              )
            })}
            {tasks.length === 0 && <tr><td colSpan={6} style={{ color: 'var(--muted)' }}>{showDone ? 'Nog geen afgeronde taken.' : 'Geen open taken.'}</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="card panel" style={{ marginTop: 16 }}>
        <h3>Nieuwe taak</h3>
        <AdminForm action={createTask} submitLabel="Taak toevoegen" id="nieuw">
          <div className="form-grid">
            <div className="field"><label htmlFor="t-title">Taak</label><input id="t-title" name="title" required placeholder="Bijv. kandidaat terugbellen" /></div>
            <div className="field">
              <label htmlFor="t-link">Gekoppeld aan (optioneel)</label>
              <select id="t-link" name="link" defaultValue="">
                <option value="">Niets</option>
                {candidates.length > 0 && <optgroup label="Kandidaten">{candidates.map((c) => <option key={c.id} value={`c:${c.id}`}>{c.firstName} {c.lastName}</option>)}</optgroup>}
                {vacancies.length > 0 && <optgroup label="Vacatures">{vacancies.map((v) => <option key={v.id} value={`v:${v.id}`}>{v.title}</option>)}</optgroup>}
                {companies.length > 0 && <optgroup label="Bedrijven">{companies.map((c) => <option key={c.id} value={`b:${c.id}`}>{c.name}</option>)}</optgroup>}
              </select>
            </div>
            <div className="field"><label htmlFor="t-due">Deadline</label><input id="t-due" name="dueDate" type="date" /></div>
            <div className="field">
              <label htmlFor="t-prio">Prioriteit</label>
              <select id="t-prio" name="priority" defaultValue="NORMAAL"><option value="HOOG">Hoog</option><option value="NORMAAL">Normaal</option><option value="LAAG">Laag</option></select>
            </div>
          </div>
          <div className="field"><label htmlFor="t-desc">Toelichting (optioneel)</label><textarea id="t-desc" name="description" style={{ minHeight: 70 }} /></div>
        </AdminForm>
      </div>
    </>
  )
}
