import { PageHero } from '@/components/public/PageHero'
import { ScanForm } from '@/components/public/CandidateForms'

export function RecruitmentScanPage() {
  return (
    <>
      <PageHero eyebrow="Voor werkgevers" title="Gratis recruitmentscan" subtitle="Vertel ons welke vacature lastig in te vullen is. We kijken vrijblijvend naar doelgroep, bereik en aanpak." />
      <div className="forms-zone">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="form-card">
            <h3>Gratis recruitmentscan</h3>
            <p className="sub">Geen verplichtingen, wel concreet advies.</p>
            <ScanForm rows={5} />
          </div>
        </div>
      </div>
    </>
  )
}
