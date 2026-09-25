import { Metadata } from 'next'
import Link from 'next/link'
import { PublicLayout } from '@/components/public/PublicLayout'
import { PageHero } from '@/components/public/PageHero'
import { KennismakingForm } from '@/components/public/CandidateForms'

export const metadata: Metadata = {
  title: 'Korte kennismaking',
  description: 'Maak kort kennis met The Move Maker: een telefonisch gesprek van ongeveer 15 minuten om te kijken of er een goede match is.',
}

const topics = [
  { icon: '◉', title: 'Je achtergrond', text: 'Waar werk je nu en welke ervaring heb je?' },
  { icon: '↗', title: 'Je wensen', text: 'Wat zoek je in je volgende stap?' },
  { icon: '✓', title: 'Een goede match?', text: 'Samen bepalen we of er relevante mogelijkheden zijn.' },
]

export default function KennismakingPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Persoonlijk contact"
        title="Plan een korte kennismaking"
        subtitle="Een telefonisch gesprek van ongeveer 15 minuten. Geen uitgebreide intake, maar een eerste kennismaking om te kijken of er een goede match is."
      />
      <section style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="section-head"><div><h2>Waar we het kort over hebben</h2></div></div>
          <div className="services-grid cols-3">
            {topics.map((t) => (
              <div key={t.title} className="service-card"><div className="service-icon">{t.icon}</div><h3>{t.title}</h3><p>{t.text}</p></div>
            ))}
          </div>
        </div>
      </section>
      <div className="forms-zone">
        <div className="container forms-grid">
          <div className="form-card">
            <h3>Vraag een korte kennismaking aan</h3>
            <p className="sub">Laat weten wanneer je het best bereikbaar bent. We bekijken je gegevens en bellen je om een moment af te stemmen.</p>
            <KennismakingForm />
          </div>
          <div className="form-card" style={{ alignSelf: 'start' }}>
            <h3>Liever eerst je cv delen?</h3>
            <p className="sub">Dan kijken we eerst naar je ervaring en nemen we contact op als je achtergrond aansluit.</p>
            <Link href="/cv-check" className="btn btn-dark">Laat mijn cv checken →</Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
