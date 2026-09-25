import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { createCandidate } from '@/app/admin/manage-actions'
import { AdminForm } from '@/components/admin/Forms'

export const dynamic = 'force-dynamic'

export default async function NieuweKandidaatPage() {
  const sectors = await prisma.sector.findMany({ where: { active: true }, orderBy: { order: 'asc' }, select: { name: true } })
  return (
    <>
      <div className="page-head">
        <div>
          <p style={{ marginBottom: 6 }}><Link href="/admin/kandidaten" style={{ color: 'var(--muted)' }}>← Kandidaten</Link></p>
          <h1>Nieuwe kandidaat</h1><p>Voeg handmatig een kandidaat toe, bijvoorbeeld uit je netwerk of LinkedIn.</p>
        </div>
      </div>
      <div className="card panel" style={{ maxWidth: 820 }}>
        <AdminForm action={createCandidate} submitLabel="Kandidaat opslaan" reset={false}>
          <div className="form-grid">
            <div className="field"><label htmlFor="firstName">Voornaam</label><input id="firstName" name="firstName" required /></div>
            <div className="field"><label htmlFor="lastName">Achternaam</label><input id="lastName" name="lastName" required /></div>
            <div className="field"><label htmlFor="email">E-mail</label><input id="email" name="email" type="email" required /></div>
            <div className="field"><label htmlFor="phone">Telefoon</label><input id="phone" name="phone" type="tel" /></div>
            <div className="field"><label htmlFor="city">Woonplaats</label><input id="city" name="city" /></div>
            <div className="field">
              <label htmlFor="sector">Vakgebied</label>
              <select id="sector" name="sector" defaultValue=""><option value="">Kies…</option>{sectors.map((s) => <option key={s.name}>{s.name}</option>)}</select>
            </div>
            <div className="field"><label htmlFor="currentRole">Huidige functie</label><input id="currentRole" name="currentRole" /></div>
            <div className="field"><label htmlFor="yearsExperience">Ervaring</label><input id="yearsExperience" name="yearsExperience" placeholder="Bijv. 5-10 jaar" /></div>
            <div className="field"><label htmlFor="linkedin">LinkedIn</label><input id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/..." /></div>
            <div className="field">
              <label htmlFor="source">Bron</label>
              <select id="source" name="source" defaultValue="handmatig">
                <option value="handmatig">Handmatig</option><option value="linkedin">LinkedIn</option><option value="netwerk">Netwerk</option><option value="doorverwijzing">Doorverwijzing</option>
              </select>
            </div>
          </div>
        </AdminForm>
      </div>
    </>
  )
}
