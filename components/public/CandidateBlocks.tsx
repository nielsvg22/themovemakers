import Link from 'next/link'
import { Fragment } from 'react'

const cvHref = (vacancySlug?: string) => (vacancySlug ? `/cv-check?vacature=${encodeURIComponent(vacancySlug)}` : '/cv-check')

/** "Eerst even kennismaken": laagdrempelige eerste stap i.p.v. direct een afspraak (stijl van .marketing-strip). */
export function KennismakenBlock({ paddingTop = 0 }: { paddingTop?: number }) {
  const flow = [
    { icon: '□', label: 'Cv delen' },
    { icon: '◎', label: 'Profiel bekeken' },
    { icon: '☎', label: 'Kort bellen' },
    { icon: '✓', label: 'Vervolgstap' },
  ]
  return (
    <section style={{ paddingTop }}>
      <div className="container">
        <div className="marketing-strip">
          <div>
            <div className="eyebrow light">Persoonlijk contact</div>
            <h2><span>Eerst even</span> kennismaken</h2>
            <p>
              Benieuwd of jouw ervaring aansluit bij onze vacatures in bouw, civiel of techniek? Laat je cv achter of plan een korte
              telefonische kennismaking. We kijken eerst samen of er een goede match is.
            </p>
            <div className="hero-ctas" style={{ marginTop: 0 }}>
              <Link href="/cv-check" className="btn btn-primary btn-sm">Laat mijn cv checken →</Link>
              <Link href="/kennismaking" className="btn btn-outline btn-sm">Plan een korte kennismaking →</Link>
            </div>
          </div>
          <div className="flow">
            {flow.map((f, i) => (
              <Fragment key={f.label}>
                {i > 0 && <div className="flow-arrow">→</div>}
                <div className="flow-item"><div className="flow-icon">{f.icon}</div>{f.label}</div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** "Twijfel je of jouw achtergrond aansluit?": stimuleert eerst het profiel te delen (stijl van .open-cta). */
export function FitCheckBlock({ vacancySlug, style }: { vacancySlug?: string; style?: React.CSSProperties }) {
  return (
    <div className="open-cta" style={style}>
      <div>
        <h3>Twijfel je of jouw achtergrond aansluit?</h3>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 5 }}>
          Laat je cv achter. We kijken graag met je mee of er passende mogelijkheden zijn.
        </p>
      </div>
      <Link href={cvHref(vacancySlug)} className="btn btn-dark btn-sm">Laat mijn cv checken →</Link>
    </div>
  )
}

const forWho = [
  { icon: '◉', title: 'Achtergrond in het vak', text: 'Je hebt ervaring of een opleiding in bouw, civiel, techniek of installatietechniek.' },
  { icon: '↗', title: 'Passende werkervaring', text: 'Je werkt al in het vak, of je hebt ervaring die goed aansluit op de rol.' },
  { icon: '♙', title: 'Interesse in het vakgebied', text: 'Je wilt verder groeien in functies als uitvoerder, werkvoorbereider, engineer of projectleider.' },
  { icon: '✓', title: 'Opleiding die aansluit', text: 'Net klaar met een technische opleiding? Ook dan kijken we graag naar de mogelijkheden.' },
]

/** "Voor wie zijn onze vacatures?": helpt bezoekers zelf in te schatten of ze aansluiten. */
export function ForWhoBlock({ background }: { background?: string }) {
  return (
    <section style={background ? { background } : undefined}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Voor wie zijn onze vacatures?</div>
            <h2>Voor vakmensen in bouw, civiel en techniek</h2>
            <p>Onze opdrachtgevers zoeken mensen die het vak kennen of er echt in willen groeien. Herken je jezelf hierin? Dan kijken we graag of er een match is.</p>
          </div>
        </div>
        <div className="services-grid">
          {forWho.map((c) => (
            <div key={c.title} className="service-card">
              <div className="service-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
