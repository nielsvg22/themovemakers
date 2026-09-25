import Link from 'next/link'
import { images } from '@/lib/data/site'

const ctas = [
  { title: 'Ik zoek baan', text: 'Vind de vacature die bij jou past en maak de volgende stap in je carrière.', href: '/vacatures', label: 'Bekijk alle vacatures →', img: images.ctaJob },
  { title: 'Ik zoek personeel', text: 'Wij vinden, selecteren en overtuigen de juiste mensen voor jouw organisatie.', href: '/voor-werkgevers', label: 'Bekijk onze diensten →', img: images.ctaStaff },
]

export function DualCta() {
  return (
    <div className="dual-cta">
      {ctas.map((cta) => (
        <div key={cta.title} className="cta-photo">
          <img src={cta.img} alt="" />
          <div className="content">
            <h2 style={{ fontSize: 32 }}>{cta.title}</h2>
            <p>{cta.text}</p>
            <Link href={cta.href} className="btn btn-primary btn-sm">{cta.label}</Link>
          </div>
        </div>
      ))}
    </div>
  )
}
