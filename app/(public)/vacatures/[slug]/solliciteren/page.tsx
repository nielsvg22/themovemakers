import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PublicLayout } from '@/components/public/PublicLayout'
import { PageHero } from '@/components/public/PageHero'
import { ApplyForm } from '@/components/public/CandidateForms'
import { getPublicJob } from '@/lib/data/vacancies'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getPublicJob((await params).slug)
  return { title: job ? `Solliciteren: ${job.title}` : 'Solliciteren', robots: 'noindex' }
}

const nextSteps = [
  'Je ontvangt direct een bevestiging per e-mail.',
  'Een recruiter bekijkt je profiel, meestal binnen twee werkdagen.',
  'Sluit je achtergrond aan? Dan bellen we je voor een korte kennismaking.',
]

export default async function SolliciterenPage({ params }: Props) {
  const job = await getPublicJob((await params).slug)
  if (!job) notFound()

  return (
    <PublicLayout>
      <PageHero
        breadcrumbs={<><Link href="/">Home</Link> / <Link href="/vacatures">Vacatures</Link> / <Link href={`/vacatures/${job.slug}`}>{job.title}</Link> / Solliciteren</>}
        title={`Solliciteren als ${job.title}`}
        titleSize={44}
        subtitle={`${[job.company, job.city].filter(Boolean).join(' · ')}. Vul je gegevens in en upload je cv; het kost ongeveer twee minuten.`}
      />
      <div className="forms-zone">
        <div className="container forms-grid apply-grid">
          <div className="form-card">
            <h3>Je gegevens</h3>
            <p className="sub">Velden met een * zijn verplicht.</p>
            <ApplyForm vacancySlug={job.slug} vacancyTitle={job.title} />
          </div>
          <div className="form-card" style={{ alignSelf: 'start' }}>
            <h3>{job.title}</h3>
            {job.company && <p className="sub">{job.company}</p>}
            <div className="popular-row"><span>Locatie</span><b>{job.city}</b></div>
            <div className="popular-row"><span>Salaris</span><b>{job.salary}</b></div>
            <div className="popular-row"><span>Uren</span><b>{job.hours}</b></div>
            <div className="popular-row" style={{ borderBottom: 'none' }}><span>Dienstverband</span><b>{job.type}</b></div>
            <h3 style={{ marginTop: 18, fontSize: 17 }}>Wat gebeurt er na je sollicitatie?</h3>
            <div className="next-steps">
              {nextSteps.map((s, i) => (
                <div key={s} className="stepdot"><span className="dot">{i + 1}</span>{s}</div>
              ))}
            </div>
            <Link href={`/vacatures/${job.slug}`} className="btn btn-outline-dark btn-sm" style={{ marginTop: 18 }}>← Terug naar de vacature</Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
