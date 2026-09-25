import { prisma } from '@/lib/db/prisma'
import { deleteTemplate, saveTemplate } from '@/app/admin/manage-actions'
import { ActionButton, AdminForm } from '@/components/admin/Forms'
import { defaultTemplates } from '@/lib/admin/default-templates'
import { dateLabel } from '@/lib/admin/labels'

export const dynamic = 'force-dynamic'

const variables = '{{voornaam}}, {{achternaam}}, {{functie}}, {{recruiter}}'

function TemplateFields({ t }: { t?: { id: string; name: string; subject: string | null; content: string } }) {
  const p = t?.id ?? 'new'
  return (
    <>
      {t && <input type="hidden" name="id" value={t.id} />}
      <div className="form-grid">
        <div className="field"><label htmlFor={`${p}-name`}>Naam</label><input id={`${p}-name`} name="name" defaultValue={t?.name} required /></div>
        <div className="field"><label htmlFor={`${p}-subject`}>Onderwerp</label><input id={`${p}-subject`} name="subject" defaultValue={t?.subject ?? ''} /></div>
      </div>
      <div className="field">
        <label htmlFor={`${p}-content`}>Tekst</label>
        <textarea id={`${p}-content`} name="content" defaultValue={t?.content} required style={{ minHeight: 180 }} />
        <small style={{ color: 'var(--muted)' }}>Variabelen: {variables}</small>
      </div>
    </>
  )
}

export default async function TemplatesPage() {
  if ((await prisma.template.count()) === 0) {
    await prisma.template.createMany({ data: defaultTemplates.map((t) => ({ ...t, type: 'email', isDefault: true })) })
  }
  const templates = await prisma.template.findMany({ orderBy: { name: 'asc' } })

  return (
    <>
      <div className="page-head">
        <div><h1>Templates</h1><p>E-mailtemplates die je vanuit een kandidaatprofiel verstuurt.</p></div>
        <a href="#nieuw" className="btn primary">＋ Template</a>
      </div>
      <div className="grid" style={{ gap: 12 }}>
        {templates.map((t) => (
          <details key={t.id} className="card panel">
            <summary style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
              <span><b>{t.name}</b><small style={{ display: 'block', color: 'var(--muted)' }}>{t.subject ?? 'Geen onderwerp'} · bijgewerkt {dateLabel(t.updatedAt)}</small></span>
              <span className="btn ghost">Bewerken</span>
            </summary>
            <div style={{ marginTop: 14 }}>
              <AdminForm action={saveTemplate} submitLabel="Opslaan" reset={false}>
                <TemplateFields t={t} />
              </AdminForm>
              <div style={{ marginTop: 8 }}>
                <ActionButton action={deleteTemplate.bind(null, t.id)} confirm={`Template "${t.name}" verwijderen?`} done="Template verwijderd" className="btn soft">Verwijderen</ActionButton>
              </div>
            </div>
          </details>
        ))}
      </div>
      <div className="card panel" style={{ marginTop: 16 }}>
        <h3>Nieuwe template</h3>
        <AdminForm action={saveTemplate} submitLabel="Template toevoegen" id="nieuw">
          <TemplateFields />
        </AdminForm>
      </div>
    </>
  )
}
