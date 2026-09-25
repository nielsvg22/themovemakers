import { ActionButton } from '@/components/public/ActionButton'
import { EmployerHero } from '@/app/(public)/_components/EmployerHero'
import { ServicesGrid, Service } from '@/app/(public)/_components/ServicesGrid'
import { MarketingStrip } from '@/app/(public)/_components/MarketingStrip'
import { CaseStudies } from '@/app/(public)/_components/CaseStudies'

const services: Service[] = [
  { icon: '◉', title: 'Recruitment', text: 'Gerichte search en persoonlijke benadering.' },
  { icon: '◇', title: 'Werving & selectie', text: 'Van intake tot introductie van kandidaten.' },
  { icon: '◁', title: 'Recruitment marketing', text: 'Campagnes die zorgen dat vacatures gevonden worden.' },
  { icon: '↗', title: 'Employer branding', text: 'Maak zichtbaar waarom talent voor jouw organisatie kiest.' },
]

export function EmployerPage() {
  return (
    <>
      <EmployerHero
        asPageTitle
        title="Moeite om de juiste mensen te vinden?"
        text="Wij helpen organisaties in bouw, civiel en techniek aan de juiste vakspecialisten. Niet alleen door te zoeken, maar door jouw werkgeversverhaal en vacatures zichtbaar te maken."
      />
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Recruitment dat verder gaat dan zoeken</h2>
              <p>Van positionering en campagne tot selectie en plaatsing. We maken recruitment meetbaar, persoonlijk en zichtbaar.</p>
            </div>
          </div>
          <ServicesGrid services={services} />
        </div>
      </section>
      <MarketingStrip
        title={<><span>Van bereik</span> naar sollicitatie.</>}
        text="We combineren doelgroepkennis, vacaturecontent en campagnes om precies de juiste mensen te bereiken."
        cta={<ActionButton className="btn btn-primary btn-sm" open="scan">Start met een recruitmentscan →</ActionButton>}
        lastStep="Kandidaat"
      />
      <CaseStudies title="Cases die laten zien wat werkt" labels={['kandidaten', 'dagen', 'plaatsing']} />
    </>
  )
}
