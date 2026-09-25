'use client'

import { PageHero } from '@/components/public/PageHero'
import { ScanFields, useSiteUI } from '@/components/public/SiteUI'

export function RecruitmentScanPage() {
  const { toast } = useSiteUI()

  return (
    <>
      <PageHero eyebrow="Voor werkgevers" title="Gratis recruitmentscan" subtitle="Vertel ons welke vacature lastig in te vullen is. We kijken vrijblijvend naar doelgroep, bereik en aanpak." />
      <div className="forms-zone">
        <div className="container" style={{ maxWidth: 720 }}>
          <form className="form-card" onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); toast('Recruitmentscan verstuurd') }}>
            <h3>Gratis recruitmentscan</h3>
            <p className="sub">Geen verplichtingen, wel concreet advies.</p>
            <ScanFields rows={5} />
            <button className="btn btn-primary" style={{ marginTop: 16 }} type="submit">Verstuur aanvraag →</button>
          </form>
        </div>
      </div>
    </>
  )
}
