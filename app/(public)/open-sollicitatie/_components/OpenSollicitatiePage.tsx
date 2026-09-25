import { PageHero } from '@/components/public/PageHero'
import { OpenSollicitatieForm } from '@/components/public/CandidateForms'

export function OpenSollicitatiePage() {
  return (
    <>
      <PageHero eyebrow="Kandidaat" title="Open sollicitatie" subtitle="Staat jouw vacature er nog niet tussen? Laat je gegevens en cv achter. We kijken eerst of je profiel aansluit op onze vacatures en opdrachtgevers." />
      <div className="forms-zone">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="form-card">
            <h3>Laat je gegevens achter</h3>
            <p className="sub">We nemen contact op zodra er iets passends is.</p>
            <OpenSollicitatieForm />
          </div>
        </div>
      </div>
    </>
  )
}
