import Link from 'next/link'
import { getSiteImages } from '@/lib/data/site-images'

const benefits = [
  { icon: '✓', text: 'Persoonlijk contact' },
  { icon: '⌁', text: 'Specialist in bouw, civiel en techniek' },
  { icon: '↗', text: 'Snelle en gerichte matches' },
  { icon: '◎', text: 'Ook recruitment marketing' },
]

export async function Hero() {
  const { images } = await getSiteImages()
  return (
    <div className="hero">
      <img className="hero-bg" src={images.hero} alt="Bouwplaats" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow light">Recruitment voor bouw, civiel &amp; techniek</div>
          <h1>De schakel tussen <span>talent en vooruitgang</span></h1>
          <p>Wij verbinden vakspecialisten en bedrijven in de bouw, civiel, techniek en meer. Met de juiste mensen maken we samen Nederland sterker.</p>
          <div className="hero-ctas">
            <Link href="/vacatures" className="btn btn-primary">Ik zoek een baan →</Link>
            <Link href="/voor-werkgevers" className="btn btn-outline">Ik zoek personeel →</Link>
          </div>
        </div>
      </div>
      <div className="hero-benefits">
        <div className="container benefit-grid">
          {benefits.map((b) => (
            <div key={b.text} className="benefit"><div className="benefit-icon">{b.icon}</div>{b.text}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
