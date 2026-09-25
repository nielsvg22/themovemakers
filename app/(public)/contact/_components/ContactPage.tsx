import { PageHero } from '@/components/public/PageHero'
import { ContactForm } from '@/components/public/CandidateForms'

const details = [
  { icon: '⌂', title: 'Bezoekadres', text: 'The Move Maker, Apeldoorn' },
  { icon: '☎', title: 'Telefoon', text: '055 - 000 00 00 · ma - vr 09:00 - 17:00', href: 'tel:0550000000' },
  { icon: '✉', title: 'E-mail', text: 'info@themovemaker.nl · reactie binnen 24 uur', href: 'mailto:info@themovemaker.nl' },
  { icon: '◎', title: 'LinkedIn', text: 'Volg The Move Maker', href: 'https://linkedin.com' },
]

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Neem contact op"
        title="Contact"
        subtitle="Heb je een vraag? Wij helpen je graag. Vul het formulier in of neem contact op via telefoon of e-mail."
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
          <div className="form-card">
            <h3>Stuur ons een bericht</h3>
            <p className="sub">We reageren binnen één werkdag.</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}
