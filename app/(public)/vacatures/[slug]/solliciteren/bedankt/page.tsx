import { Metadata } from 'next'
import Link from 'next/link'
import { PublicLayout } from '@/components/public/PublicLayout'
import { PageHero } from '@/components/public/PageHero'
import { prisma } from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Bedankt voor je sollicitatie', robots: 'noindex' }

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ ref?: string }>
}

export default async function BedanktPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { ref } = await searchParams
  const application = ref
    ? await prisma.application.findUnique({ where: { id: ref }, select: { candidate: { select: { firstName: true } }, vacancy: { select: { title: true, slug: true } } } })
    : null
  const vacancy = application?.vacancy ?? (await prisma.vacancy.findUnique({ where: { slug }, select: { title: true, slug: true } }))
  const firstName = application?.candidate.firstName

  const steps = [
    { title: 'Bevestiging per e-mail', text: 'Je ontvangt een bevestiging van je sollicitatie in je inbox.' },
    { title: 'We bekijken je profiel', text: 'Een recruiter beoordeelt je cv, meestal binnen twee werkdagen.' },
    { title: 'Korte kennismaking', text: 'Sluit je achtergrond aan? Dan bellen we je voor een kort gesprek.' },
  ]

  return (
    <PublicLayout>
      <PageHero
        eyebrow="Sollicitatie verstuurd"
        title={firstName ? `Bedankt, ${firstName}!` : 'Bedankt voor je sollicitatie!'}
        titleSize={52}
        subtitle={vacancy ? `Je sollicitatie voor ${vacancy.title} is goed bij ons binnengekomen.` : 'Je sollicitatie is goed bij ons binnengekomen.'}
      />
      <section>
        <div className="container">
          <div className="section-head"><div><h2>Wat gebeurt er nu?</h2></div></div>
          <div className="approach cols-3" style={{ marginTop: 0 }}>
            {steps.map((s, i) => (
              <div key={s.title} className="step"><div className="n">{i + 1}</div><b>{s.title}</b><p>{s.text}</p></div>
            ))}
          </div>
          <div className="open-cta">
            <div>
              <h3>Nog vragen over je sollicitatie?</h3>
              <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 5 }}>Mail ons op info@themovemaker.nl of bel 055 - 000 00 00.</p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Link href="/vacatures" className="btn btn-dark btn-sm">Bekijk andere vacatures →</Link>
              {vacancy && <Link href={`/vacatures/${vacancy.slug}`} className="btn btn-outline-dark btn-sm">Terug naar de vacature</Link>}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
