import Link from 'next/link'
import { ReactNode } from 'react'
import { ActionButton } from '@/components/public/ActionButton'
import { getSiteImages } from '@/lib/data/site-images'

interface EmployerHeroProps {
  /** Op de werkgeverspagina is dit de paginatitel (h1), op de homepage een h2. */
  asPageTitle?: boolean
  title?: ReactNode
  text?: ReactNode
}

export async function EmployerHero({
  asPageTitle,
  title = 'De juiste mensen. Voor vandaag én morgen.',
  text = 'Wij helpen bedrijven in bouw, civiel, techniek en meer aan vakspecialisten. Niet alleen door te werven, maar ook door jouw vacatures zichtbaar te maken met slimme recruitment marketing.',
}: EmployerHeroProps) {
  const { images } = await getSiteImages()
  return (
    <div className="employer-hero">
      <div className="container grid">
        <div>
          <div className="eyebrow light">Voor werkgevers</div>
          {asPageTitle ? <h1 style={{ fontSize: 58 }}>{title}</h1> : <h2>{title}</h2>}
          <p>{text}</p>
          <div className="hero-ctas">
            <ActionButton open="scan">Bespreek mijn vacature →</ActionButton>
            {asPageTitle ? (
              <Link href="/contact" className="btn btn-outline">Plan een kennismaking →</Link>
            ) : (
              <Link href="/voor-werkgevers" className="btn btn-outline">Bekijk onze diensten →</Link>
            )}
          </div>
        </div>
        <div className="photo"><img src={images.team} alt="" /></div>
      </div>
    </div>
  )
}
