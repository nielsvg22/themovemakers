import { PageHero } from '@/components/public/PageHero'
import { ActionButton } from '@/components/public/ActionButton'
import { ServicesGrid } from '@/app/(public)/_components/ServicesGrid'
import { MarketingStrip } from '@/app/(public)/_components/MarketingStrip'
import { CaseStudies } from '@/app/(public)/_components/CaseStudies'

const services = [
  { icon: '◎', title: 'Doelgroepanalyse', text: 'Wie is je ideale kandidaat, wat drijft hem en waar is hij te vinden?' },
  { icon: '□', title: 'Vacatureteksten', text: 'Vindbare, aantrekkelijke vacatures die aanzetten tot solliciteren.' },
  { icon: '◫', title: 'Recruitmentcampagnes', text: 'Campagnes op LinkedIn, Indeed, Google, social media en niche jobboards.' },
  { icon: '↗', title: 'Employer branding', text: 'Maak zichtbaar waarom talent voor jouw organisatie kiest.' },
]

export function RecruitmentMarketingPage() {
  return (
    <>
      <PageHero
        eyebrow="Voor werkgevers"
        title="Recruitment marketing"
        subtitle="Van vacaturetekst tot campagne, bereik en sollicitatie. Wij zorgen dat het juiste talent jouw bedrijf vindt."
      />
      <section id="vacaturemarketing">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Wat we voor je doen</h2>
              <p>Van strategie tot uitvoering. Onze recruitment marketing specialisten regelen de volledige keten.</p>
            </div>
          </div>
          <ServicesGrid services={services} />
        </div>
      </section>
      <div id="employer-branding">
        <MarketingStrip
          title={<><span>Van bereik</span> naar sollicitatie.</>}
          text="We combineren doelgroepkennis, vacaturecontent en campagnes om precies de juiste mensen te bereiken."
          cta={<ActionButton className="btn btn-primary btn-sm" open="scan">Start met een recruitmentscan →</ActionButton>}
          lastStep="Kandidaat"
        />
      </div>
      <CaseStudies title="Cases die laten zien wat werkt" labels={['kandidaten', 'dagen', 'plaatsing']} />
    </>
  )
}
