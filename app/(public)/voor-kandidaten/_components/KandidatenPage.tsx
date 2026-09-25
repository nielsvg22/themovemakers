import { PageHero } from '@/components/public/PageHero'
import { ActionButton } from '@/components/public/ActionButton'
import { SectorGrid } from '@/app/(public)/_components/SectorGrid'
import { ServicesGrid } from '@/app/(public)/_components/ServicesGrid'

const support = [
  { icon: '✓', title: 'Persoonlijk contact', text: 'Geen anonieme systemen. Je hebt een vaste recruiter die je begeleidt.' },
  { icon: '◎', title: 'CV & LinkedIn check', text: 'We helpen je profiel scherp te maken voor maximale zichtbaarheid.' },
  { icon: '↗', title: 'Snelle matching', text: 'Door ons netwerk in bouw, civiel & techniek matchen we snel en gericht.' },
  { icon: '♙', title: 'Vacature-alerts', text: 'Ontvang automatisch de nieuwste vacatures in je vakgebied en regio.' },
]

export function KandidatenPage() {
  return (
    <>
      <PageHero
        eyebrow="Voor kandidaten"
        title="Jouw volgende carrièrestap begint hier"
        subtitle="Of je nu actief op zoek bent of gewoon wilt weten wat er speelt: wij staan voor je klaar. Persoonlijk, eerlijk en met een netwerk in bouw, civiel en techniek."
      />
      <section>
        <div className="container">
          <SectorGrid />
          <div className="open-cta">
            <div>
              <h3>Niets passends gevonden?</h3>
              <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 5 }}>Doe een open sollicitatie. We matchen jouw profiel met huidige en toekomstige vacatures.</p>
            </div>
            <ActionButton className="btn btn-dark btn-sm" open="application">Open sollicitatie →</ActionButton>
          </div>
        </div>
      </section>
      <section style={{ background: '#f7f8f8' }}>
        <div className="container">
          <div className="section-head"><div><h2>Hoe we je ondersteunen</h2></div></div>
          <ServicesGrid services={support} />
        </div>
      </section>
    </>
  )
}
