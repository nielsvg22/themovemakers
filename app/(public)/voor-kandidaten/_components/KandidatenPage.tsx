import { PageHero } from '@/components/public/PageHero'
import { FitCheckBlock, ForWhoBlock, KennismakenBlock } from '@/components/public/CandidateBlocks'
import { SectorGrid } from '@/app/(public)/_components/SectorGrid'
import { ServicesGrid } from '@/app/(public)/_components/ServicesGrid'

const support = [
  { icon: '✓', title: 'Persoonlijk contact', text: 'Geen anonieme systemen. Je hebt een vaste recruiter die met je meedenkt.' },
  { icon: '◎', title: 'Cv-check', text: 'We kijken naar je ervaring en helpen je profiel scherp te maken.' },
  { icon: '↗', title: 'Gerichte matching', text: 'Door ons netwerk in bouw, civiel en techniek zoeken we gericht naar een passende rol.' },
  { icon: '♙', title: 'Vacature-alerts', text: 'Ontvang automatisch nieuwe vacatures in je vakgebied en regio.' },
]

export function KandidatenPage({ counts }: { counts: Record<string, number> }) {
  return (
    <>
      <PageHero
        eyebrow="Voor kandidaten"
        title="Jouw volgende carrièrestap begint hier"
        subtitle="Of je nu actief zoekt of wilt weten wat er speelt: we kijken eerst samen of er een goede match is. Persoonlijk, eerlijk en met een netwerk in bouw, civiel en techniek."
      />
      <section>
        <div className="container">
          <SectorGrid counts={counts} />
          <FitCheckBlock />
        </div>
      </section>
      <KennismakenBlock />
      <ForWhoBlock background="#f7f8f8" />
      <section>
        <div className="container">
          <div className="section-head"><div><h2>Hoe we je ondersteunen</h2></div></div>
          <ServicesGrid services={support} />
        </div>
      </section>
    </>
  )
}
