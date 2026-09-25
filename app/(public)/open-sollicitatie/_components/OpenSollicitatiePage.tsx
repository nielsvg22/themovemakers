'use client'

import { PageHero } from '@/components/public/PageHero'
import { useSiteUI } from '@/components/public/SiteUI'

export function OpenSollicitatiePage() {
  const { toast } = useSiteUI()

  return (
    <>
      <PageHero eyebrow="Kandidaat" title="Open sollicitatie" subtitle="Staat jouw perfecte vacature er nog niet tussen? Laat je gegevens achter en we zoeken voor jou." />
      <div className="forms-zone">
        <div className="container" style={{ maxWidth: 720 }}>
          <form className="form-card" onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); toast('Bedankt! We nemen snel contact met je op.') }}>
            <h3>Laat je gegevens achter</h3>
            <p className="sub">We matchen jouw profiel met huidige en toekomstige vacatures en nemen contact op zodra er iets passends is.</p>
            <div className="form-grid">
              <div className="field"><label>Voornaam *</label><input className="form-control" required /></div>
              <div className="field"><label>Achternaam *</label><input className="form-control" required /></div>
              <div className="field"><label>E-mailadres *</label><input className="form-control" type="email" required /></div>
              <div className="field"><label>Telefoonnummer</label><input className="form-control" type="tel" /></div>
              <div className="field">
                <label>Vakgebied</label>
                <select className="form-control"><option>Bouw</option><option>Civiel</option><option>Techniek</option><option>Engineering</option><option>Installatietechniek</option><option>Werkvoorbereiding</option><option>Projectmanagement</option></select>
              </div>
              <div className="field"><label>Regio</label><input className="form-control" placeholder="Bijv. Gelderland" /></div>
              <div className="field full"><label>Vertel kort wat je zoekt</label><textarea className="form-control" rows={5} /></div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: 16 }} type="submit">Verstuur open sollicitatie →</button>
          </form>
        </div>
      </div>
    </>
  )
}
