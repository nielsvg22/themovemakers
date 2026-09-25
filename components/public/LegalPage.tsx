import { ReactNode } from 'react'
import { PublicLayout } from './PublicLayout'
import { PageHero } from './PageHero'

export function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <PublicLayout>
      <PageHero eyebrow="The Move Maker" title={title} subtitle={intro} />
      <section>
        <div className="container prose-block">
          {children}
          <h3>Vragen?</h3>
          <p>Neem contact op via <a href="mailto:info@themovemaker.nl" style={{ fontWeight: 800 }}>info@themovemaker.nl</a> of bel 055 - 000 00 00.</p>
        </div>
      </section>
    </PublicLayout>
  )
}
