import { Metadata } from 'next'
import { PublicLayout } from '@/components/public/PublicLayout'
import { PageHero } from '@/components/public/PageHero'
import { CvCheckForm } from '@/components/public/CandidateForms'
import { prisma } from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Laat je cv checken',
  description: 'Benieuwd of jouw ervaring aansluit bij vacatures in bouw, civiel of techniek? Laat je cv achter, dan kijken we eerst samen of er een goede match is.',
}

const steps = [
  { title: 'Cv delen', text: 'Vul je gegevens in en upload je cv.' },
  { title: 'Profiel bekeken', text: 'Een recruiter bekijkt je ervaring.' },
  { title: 'Kort contact', text: 'Sluit het aan? Dan bellen we je kort.' },
  { title: 'Vervolgstap', text: 'Samen kijken we naar passende vacatures.' },
]

export default async function CvCheckPage({ searchParams }: { searchParams: Promise<{ vacature?: string }> }) {
  const slug = (await searchParams).vacature
  const vacancy = slug ? await prisma.vacancy.findUnique({ where: { slug }, select: { slug: true, title: true } }) : null

  return (
    <PublicLayout>
      <PageHero
        eyebrow="Persoonlijk contact"
        title="Laat je cv checken"
        subtitle="Benieuwd of jouw ervaring aansluit bij onze vacatures in bouw, civiel of techniek? Laat je cv achter. We kijken eerst of er een goede match is en nemen contact op als je achtergrond aansluit."
      />
      <section style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="approach cols-4" style={{ marginTop: 0 }}>
            {steps.map((s, i) => (
              <div key={s.title} className="step"><div className="n">{i + 1}</div><b>{s.title}</b><p>{s.text}</p></div>
            ))}
          </div>
        </div>
      </section>
      <div className="forms-zone">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="form-card">
            <h3>{vacancy ? `Cv checken voor ${vacancy.title}` : 'Je gegevens'}</h3>
            <p className="sub">Het invullen duurt ongeveer twee minuten. Je gegevens gebruiken we alleen om je profiel te beoordelen.</p>
            <CvCheckForm vacancySlug={vacancy?.slug} />
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
