'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ScanFields, useSiteUI } from '@/components/public/SiteUI'
import { images, sectorHref, type Job } from '@/lib/data/site'

const tabs = [
  { id: 'over', label: 'Over de functie' },
  { id: 'doen', label: 'Wat ga je doen?' },
  { id: 'meebrengen', label: 'Wat breng je mee?' },
  { id: 'bieden', label: 'Wat bieden wij?' },
  { id: 'bedrijf', label: 'Het bedrijf' },
]

const steps = ['Gegevens', 'CV', 'Vragen', 'Verzenden']

export function JobDetailPage({ job }: { job: Job }) {
  const { openModal, toast } = useSiteUI()
  const [activeTab, setActiveTab] = useState('over')

  const goToTab = (id: string) => {
    setActiveTab(id)
    document.getElementById(`tab-${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> / <Link href="/vacatures">Vacatures</Link> / <Link href={sectorHref(job.sector)}>{job.sector}</Link>
          </div>
          <div className="job-top">
            <div>
              <h1 style={{ fontSize: 50 }}>{job.title}</h1>
              <div className="meta">
                <span>{job.company}</span>
                <span>📍 {job.city}</span>
                <span>{job.salary}</span>
                <span>{job.hours}</span>
                <span>{job.type}</span>
              </div>
            </div>
            <a className="btn btn-primary" href="#solliciteren">Solliciteer direct →</a>
          </div>
        </div>
      </div>

      <section>
        <div className="container job-detail-grid">
          <div>
            <div className="detail-tabs" role="tablist">
              {tabs.map((t) => (
                <button key={t.id} role="tab" aria-selected={activeTab === t.id} className={`detail-tab${activeTab === t.id ? ' active' : ''}`} onClick={() => goToTab(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="detail-content">
              <img className="detail-image" src={images.jobDetail} alt="" />
              <h3 id="tab-over">Over de functie</h3>
              <p>Als {job.title} ben jij verantwoordelijk voor de dagelijkse aansturing op de bouwplaats. Je bewaakt planning, kwaliteit en veiligheid en bent het centrale aanspreekpunt voor vaklieden, onderaannemers en projectleiding.</p>
              <h3 id="tab-doen">Wat ga je doen?</h3>
              <ul>
                <li>Aansturen van teams en onderaannemers.</li>
                <li>Bewaken van planning, veiligheid en kwaliteit.</li>
                <li>Afstemmen met werkvoorbereiding en projectleiding.</li>
                <li>Signaleren en oplossen van knelpunten.</li>
              </ul>
              <h3 id="tab-meebrengen">Wat breng je mee?</h3>
              <ul>
                <li>Ervaring als uitvoerder binnen woning- of utiliteitsbouw.</li>
                <li>Een praktische en communicatief sterke werkstijl.</li>
                <li>Veiligheid en kwaliteit staan voor jou voorop.</li>
              </ul>
              <h3 id="tab-bieden">Wat bieden wij?</h3>
              <p>Een verantwoordelijke functie met veel vrijheid, goede arbeidsvoorwaarden en ruimte om jezelf verder te ontwikkelen.</p>
            </div>
          </div>
          <aside>
            <div className="side-links">
              <h4>Meer binnen jouw vakgebied</h4>
              {['Bouw', 'Civiel', 'Techniek'].map((s) => (
                <Link key={s} className="side-link" href={sectorHref(s)}><span>{s}</span><span>›</span></Link>
              ))}
            </div>
            <div className="side-links">
              <h4>Niet helemaal wat je zoekt?</h4>
              <Link className="side-link" href={sectorHref(job.sector)}><span>Bekijk alle {job.sector}-vacatures</span><span>›</span></Link>
              <button className="side-link" onClick={() => toast('Vacature-alert geopend')}><span>Stel een vacature-alert in</span><span>›</span></button>
              <button className="side-link" onClick={() => openModal('application')}><span>Doe een open sollicitatie</span><span>›</span></button>
            </div>
          </aside>
        </div>
      </section>

      <div className="forms-zone" id="solliciteren">
        <div className="container forms-grid">
          <ApplicationCard />
          <form className="form-card" onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); toast('Recruitmentscan verstuurd') }}>
            <h3>Gratis recruitmentscan</h3>
            <p className="sub">Vertel ons welke vacature lastig in te vullen is. We kijken vrijblijvend naar doelgroep, bereik en aanpak.</p>
            <ScanFields />
            <button className="btn btn-primary" style={{ marginTop: 16 }} type="submit">Verstuur aanvraag →</button>
          </form>
        </div>
      </div>
    </>
  )
}

function ApplicationCard() {
  const { toast } = useSiteUI()
  const [step, setStep] = useState(0)
  const last = step === steps.length - 1

  const next = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (last) {
      e.currentTarget.reset()
      setStep(0)
      toast('Bedankt voor je sollicitatie!')
    } else {
      setStep(step + 1)
    }
  }

  return (
    <form className="form-card" onSubmit={next}>
      <h3>Solliciteren op deze vacature</h3>
      <div className="stepper">
        {steps.map((s, i) => (
          <div key={s} className={`stepdot${i === step ? ' active' : ''}`}><span className="dot">{i + 1}</span>{s}</div>
        ))}
      </div>
      <div className="form-grid" style={{ display: step === 0 ? undefined : 'none' }}>
        <div className="field"><label>Voornaam *</label><input className="form-control" required={step === 0} /></div>
        <div className="field"><label>Achternaam *</label><input className="form-control" required={step === 0} /></div>
        <div className="field"><label>E-mailadres *</label><input className="form-control" type="email" required={step === 0} /></div>
        <div className="field"><label>Telefoonnummer *</label><input className="form-control" type="tel" required={step === 0} /></div>
      </div>
      <div className="form-grid" style={{ display: step === 1 ? undefined : 'none' }}>
        <div className="field full"><label>CV uploaden *</label><input className="form-control" type="file" accept=".pdf,.doc,.docx" style={{ paddingTop: 10 }} required={step === 1} /></div>
        <div className="field full"><label>LinkedIn-profiel</label><input className="form-control" type="url" placeholder="https://linkedin.com/in/..." /></div>
      </div>
      <div className="form-grid" style={{ display: step === 2 ? undefined : 'none' }}>
        <div className="field full"><label>Motivatie</label><textarea className="form-control" rows={4} /></div>
        <div className="field">
          <label>Beschikbaarheid</label>
          <select className="form-control"><option>Direct</option><option>Binnen 1 maand</option><option>In overleg</option></select>
        </div>
        <div className="field"><label>Salarisindicatie</label><input className="form-control" placeholder="Bijv. € 4.500" /></div>
      </div>
      <p className="sub" hidden={!last} style={{ margin: 0 }}>Controleer je gegevens en verstuur je sollicitatie. We nemen binnen twee werkdagen contact met je op.</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        {step > 0 && <button type="button" className="btn btn-outline-dark" onClick={() => setStep(step - 1)}>← Vorige</button>}
        <button className="btn btn-primary" type="submit">{last ? 'Verstuur sollicitatie →' : 'Volgende stap →'}</button>
      </div>
    </form>
  )
}
