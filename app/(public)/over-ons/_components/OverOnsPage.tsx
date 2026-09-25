import Link from 'next/link'
import { PageHero } from '@/components/public/PageHero'
import { ServicesGrid } from '@/app/(public)/_components/ServicesGrid'
import { images } from '@/lib/data/site'

const team = [
  { name: 'Niels van Gortel', role: 'Founder & Recruiter', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80' },
  { name: 'Mark de Jong', role: 'Recruitmentspecialist Bouw & Civiel', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
  { name: 'Lisa Bakker', role: 'Recruitmentspecialist Techniek', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80' },
]

const values = [
  { icon: '◉', title: 'Specialisme', text: 'We kennen de bouw, civiel en techniek sector door en door.' },
  { icon: '♡', title: 'Persoonlijk', text: 'Geen standaardoplossingen, maar maatwerk voor kandidaat en klant.' },
  { icon: '↗', title: 'Snelheid', text: 'Efficiënte processen zonder in te boeten op kwaliteit.' },
  { icon: '✓', title: 'Duurzaam', text: 'We zoeken matches die langdurig werken, niet alleen voor nu.' },
]

export function OverOnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Wie we zijn"
        title="Over The Move Maker"
        subtitle="Wij zijn de recruitmentpartner voor bouw, civiel en techniek. Persoonlijk, zichtbaar en gericht op duurzame matches."
      />
      <section>
        <div className="container split-block">
          <div>
            <div className="eyebrow">Onze missie</div>
            <h2>De juiste mensen op de juiste plek.</h2>
            <p>De bouw, civiel en techniek hebben dringend vakspecialisten nodig. Maar de match tussen talent en organisatie is vaak lastig.</p>
            <p>Wij slaan die brug. Niet met standaard vacatures, maar met recruitment marketing, persoonlijke begeleiding en diepgaande sectorkennis.</p>
          </div>
          <div className="photo"><img src={images.team} alt="Team The Move Maker" /></div>
        </div>
      </section>
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head"><div><h2>Wat ons drijft</h2></div></div>
          <ServicesGrid services={values} />
        </div>
      </section>
      <section style={{ background: '#f7f8f8' }}>
        <div className="container">
          <div className="section-head">
            <div><h2>Ons team</h2></div>
            <Link href="/contact" className="btn btn-primary btn-sm">Neem contact op →</Link>
          </div>
          <div className="case-grid">
            {team.map((m) => (
              <div key={m.name} className="case-card">
                <div className="case-img" style={{ height: 260 }}><img src={m.image} alt={m.name} /></div>
                <div className="case-body"><h3>{m.name}</h3><p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 6 }}>{m.role}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
