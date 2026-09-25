import { Metadata } from 'next'
import { PublicLayout } from '@/components/public/PublicLayout'
import { Hero } from './_components/Hero'
import { SectorGrid } from './_components/SectorGrid'
import { DualCta } from './_components/DualCta'
import { PartnerLogos } from './_components/PartnerLogos'
import { EmployerHero } from './_components/EmployerHero'
import { ServicesGrid } from './_components/ServicesGrid'
import { ApproachSteps } from './_components/ApproachSteps'
import { MarketingStrip } from './_components/MarketingStrip'
import { CaseStudies } from './_components/CaseStudies'

export const metadata: Metadata = {
  title: 'Recruitment voor bouw, civiel & techniek',
  description: 'Wij verbinden vakspecialisten en bedrijven in de bouw, civiel, techniek en meer. Met de juiste mensen maken we samen Nederland sterker.',
}

export default function HomePage() {
  return (
    <PublicLayout>
      <Hero />

      <section>
        <div className="container">
          <SectorGrid />
          <DualCta />
          <PartnerLogos />
        </div>
      </section>

      <EmployerHero />

      <section>
        <div className="container">
          <div className="section-head"><div><h2>Waar kunnen we bij helpen?</h2></div></div>
          <ServicesGrid />
          <ApproachSteps />
        </div>
      </section>

      <MarketingStrip />
      <CaseStudies />
    </PublicLayout>
  )
}
