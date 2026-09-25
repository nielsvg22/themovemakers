import Link from 'next/link'
import { PageHero } from '@/components/public/PageHero'
import { ServicesGrid } from '@/app/(public)/_components/ServicesGrid'
import { images } from '@/lib/data/site'

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
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="open-cta">
            <div>
              <h3>Kennismaken?</h3>
              <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 5 }}>Of je nu een baan of personeel zoekt: we denken graag met je mee.</p>
            </div>
            <Link href="/contact" className="btn btn-dark btn-sm">Neem contact op →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
