'use client'

import { PageHero } from '@/components/public/PageHero'
import { useSiteUI } from '@/components/public/SiteUI'

const details = [
  { icon: '⌂', title: 'Bezoekadres', text: 'The Move Maker, Apeldoorn' },
  { icon: '☎', title: 'Telefoon', text: '055 - 000 00 00 · ma - vr 09:00 - 17:00', href: 'tel:0550000000' },
  { icon: '✉', title: 'E-mail', text: 'info@themovemaker.nl · reactie binnen 24 uur', href: 'mailto:info@themovemaker.nl' },
  { icon: '◎', title: 'LinkedIn', text: 'Volg The Move Maker', href: 'https://linkedin.com' },
]

export function ContactPage() {
  const { toast } = useSiteUI()

  return (
    <>
      <PageHero
        eyebrow="Neem contact op"
        title="Contact"
        subtitle="Heb je een vraag? Wij helpen je graag. Vul het formulier in of neem direct contact op via telefoon of e-mail."
      />
      <div className="forms-zone">
        <div className="container forms-grid">
          <div className="form-card">
            <h3>Contactgegevens</h3>
            <p className="sub">Bel, mail of kom langs. We denken graag met je mee.</p>
            {details.map((d) => (
              <a key={d.title} className="contact-row" href={d.href}>
                <div className="service-icon" style={{ margin: 0, flex: 'none' }}>{d.icon}</div>
                <div><b>{d.title}</b><span>{d.text}</span></div>
              </a>
            ))}
          </div>
          <form className="form-card" onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); toast('Bericht verstuurd') }}>
            <h3>Stuur ons een bericht</h3>
            <p className="sub">We reageren binnen één werkdag.</p>
            <div className="form-grid">
              <div className="field"><label>Voornaam *</label><input className="form-control" required /></div>
              <div className="field"><label>Achternaam *</label><input className="form-control" required /></div>
              <div className="field"><label>E-mailadres *</label><input className="form-control" type="email" required /></div>
              <div className="field"><label>Telefoonnummer</label><input className="form-control" type="tel" /></div>
              <div className="field full">
                <label>Onderwerp</label>
                <select className="form-control"><option>Ik zoek een baan</option><option>Ik zoek personeel</option><option>Recruitment marketing</option><option>Overig</option></select>
              </div>
              <div className="field full"><label>Bericht *</label><textarea className="form-control" rows={5} required /></div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: 16 }} type="submit">Verstuur bericht →</button>
          </form>
        </div>
      </div>
    </>
  )
}
