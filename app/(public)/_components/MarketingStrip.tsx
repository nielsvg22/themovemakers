import Link from 'next/link'
import { Fragment, ReactNode } from 'react'

interface MarketingStripProps {
  title?: ReactNode
  text?: string
  cta?: ReactNode
  lastStep?: string
}

export function MarketingStrip({
  title = <><span>Van vacature</span> tot plaatsing.</>,
  text = 'Wij zorgen dat het juiste talent je bedrijf vindt. Van doelgroep en campagne tot sollicitatie en plaatsing.',
  cta = <Link href="/recruitment-marketing" className="btn btn-primary btn-sm">Meer over recruitment marketing →</Link>,
  lastStep = 'Kandidaten',
}: MarketingStripProps) {
  const flow = [
    { icon: '□', label: 'Vacature' },
    { icon: '◫', label: 'Campagne' },
    { icon: '◎', label: 'Bereik' },
    { icon: '♙', label: lastStep },
    { icon: '✓', label: 'Plaatsing' },
  ]

  return (
    <section style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="marketing-strip">
          <div>
            <div className="eyebrow light">Recruitment marketing</div>
            <h2>{title}</h2>
            <p>{text}</p>
            {cta}
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
