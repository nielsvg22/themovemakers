'use client'

import { startTransition, useActionState } from 'react'
import { saveVacancy } from '@/app/admin/actions'

export interface EditorVacancy {
  id: string
  title: string
  companyId: string
  sectorId: string
  city: string
  hoursMin: number | null
  hoursMax: number | null
  contractType: string
  salaryMin: number | null
  salaryMax: number | null
  description: string
  responsibilities: string | null
  requirements: string | null
  benefits: string | null
  image: string | null
  status: string
}

interface Props {
  vacancy?: EditorVacancy
  companies: { id: string; name: string }[]
  sectors: { id: string; name: string }[]
}

const contracts = [['VAST', 'Vast'], ['TIJDELIJK', 'Tijdelijk'], ['DETACHERING', 'Detachering'], ['FREELANCE', 'Freelance'], ['STAGE', 'Stage']]

export function VacancyEditor({ vacancy: v, companies, sectors }: Props) {
  const [state, action, pending] = useActionState(saveVacancy, null)
  const err = (k: string) => state?.errors?.[k] && <small style={{ color: 'var(--red)' }}>{state.errors[k]}</small>

  return (
    <form
      onSubmit={(e) => {
        // onSubmit i.p.v. action: behoudt ingevulde velden bij een validatiefout.
        e.preventDefault()
        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null
        const data = new FormData(e.currentTarget, submitter)
        startTransition(() => action(data))
      }}
    >
      {v && <input type="hidden" name="id" value={v.id} />}
      <div className="editor-layout">
        <div className="grid">
          <div className="card panel">
            <h3 className="section-title">Basisinformatie</h3>
            <div className="form-grid">
              <div className="field"><label htmlFor="title">Functietitel</label><input id="title" name="title" defaultValue={v?.title} required />{err('title')}</div>
              <div className="field">
                <label htmlFor="companyId">Bedrijf</label>
                <select id="companyId" name="companyId" defaultValue={v?.companyId ?? ''}>
                  <option value="">— Nieuw bedrijf —</option>
                  {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                {err('companyId')}
              </div>
              <div className="field"><label htmlFor="newCompany">Of nieuw bedrijf</label><input id="newCompany" name="newCompany" placeholder="Naam opdrachtgever" /></div>
              <div className="field"><label htmlFor="city">Locatie</label><input id="city" name="city" defaultValue={v?.city} required />{err('city')}</div>
              <div className="field">
                <label htmlFor="sectorId">Vakgebied</label>
                <select id="sectorId" name="sectorId" defaultValue={v?.sectorId ?? sectors[0]?.id} required>
                  {sectors.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="field"><label htmlFor="image">Afbeelding-URL (optioneel)</label><input id="image" name="image" type="url" defaultValue={v?.image ?? ''} placeholder="Standaard: foto van het vakgebied" />{err('image')}</div>
            </div>
          </div>
          <div className="card panel">
            <h3 className="section-title">Dienstverband &amp; salaris</h3>
            <div className="form-grid">
              <div className="field"><label htmlFor="hoursMin">Uren per week (min)</label><input id="hoursMin" name="hoursMin" type="number" min={0} max={60} defaultValue={v?.hoursMin ?? 32} /></div>
              <div className="field"><label htmlFor="hoursMax">Uren per week (max)</label><input id="hoursMax" name="hoursMax" type="number" min={0} max={60} defaultValue={v?.hoursMax ?? 40} /></div>
              <div className="field">
                <label htmlFor="contractType">Dienstverband</label>
                <select id="contractType" name="contractType" defaultValue={v?.contractType ?? 'VAST'}>
                  {contracts.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
              </div>
              <div />
              <div className="field"><label htmlFor="salaryMin">Salaris vanaf (per maand)</label><input id="salaryMin" name="salaryMin" type="number" min={0} step={100} defaultValue={v?.salaryMin ?? ''} /></div>
              <div className="field"><label htmlFor="salaryMax">Salaris tot (per maand)</label><input id="salaryMax" name="salaryMax" type="number" min={0} step={100} defaultValue={v?.salaryMax ?? ''} /></div>
            </div>
          </div>
          <div className="card panel">
            <h3 className="section-title">Vacaturetekst</h3>
            <div className="field"><label htmlFor="description">Intro / over de functie</label><textarea id="description" name="description" defaultValue={v?.description} required />{err('description')}</div>
            <br />
            <div className="field"><label htmlFor="responsibilities">Wat ga je doen? (één punt per regel)</label><textarea id="responsibilities" name="responsibilities" defaultValue={v?.responsibilities ?? ''} /></div>
            <br />
            <div className="field"><label htmlFor="requirements">Wat breng je mee? (één punt per regel)</label><textarea id="requirements" name="requirements" defaultValue={v?.requirements ?? ''} /></div>
            <br />
            <div className="field"><label htmlFor="benefits">Wat bieden wij?</label><textarea id="benefits" name="benefits" defaultValue={v?.benefits ?? ''} style={{ minHeight: 80 }} /></div>
          </div>
        </div>
        <div className="card panel sticky">
          <h3>Status &amp; publicatie</h3>
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>
            {v ? `Huidige status: ${v.status.toLowerCase()}. ` : ''}Sla op als concept, of publiceer direct op de website en Google for Jobs.
          </p>
          {state && !state.ok && <p style={{ color: 'var(--red)', fontSize: 13 }}>{state.message ?? 'Controleer de gemarkeerde velden.'}</p>}
          <button className="btn ghost" style={{ width: '100%', marginBottom: 8 }} type="submit" name="intent" value="concept" disabled={pending}>
            {v ? 'Wijzigingen opslaan' : 'Opslaan als concept'}
          </button>
          <button className="btn primary" style={{ width: '100%' }} type="submit" name="intent" value="publish" disabled={pending}>
            {pending ? 'Bezig…' : 'Opslaan & publiceren'}
          </button>
        </div>
      </div>
    </form>
  )
}
