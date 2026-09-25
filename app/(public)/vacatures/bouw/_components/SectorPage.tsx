import Link from 'next/link'
import { PageHero } from '@/components/public/PageHero'
import { JobCard } from '@/components/public/JobCard'
import { JobAlertForm } from '@/components/public/CandidateForms'
import { FitCheckBlock } from '@/components/public/CandidateBlocks'
import type { Job } from '@/lib/data/site'

export interface SectorData {
  name: string
  description: string
  image: string
  popularRoles: { name: string; count: number }[]
  recruiter: { name: string; title: string; image: string }
}

export function SectorPage({ sector, jobs }: { sector: SectorData; jobs: Job[] }) {
  const sectorJobs = jobs.slice(0, 3)

  return (
    <>
      <PageHero
        image={sector.image}
        breadcrumbs={<><Link href="/">Home</Link> / <Link href="/vacatures">Vacatures</Link> / {sector.name}</>}
        title={`Werken in de ${sector.name}`}
        titleSize={52}
        subtitle={sector.description}
      />
      <section>
        <div className="container sector-layout">
          <div className="popular-list">
            <h4>Populaire functies</h4>
            {sector.popularRoles.map((r) => (
              <div key={r.name} className="popular-row"><span>{r.name}</span><b>{r.count}</b></div>
            ))}
          </div>
          <div>
            <div className="results-title">
              <h3>{jobs.length} {jobs.length === 1 ? 'vacature' : 'vacatures'} in {sector.name}</h3>
              <Link href={`/vacatures?sector=${sector.name}`} style={{ fontSize: 13, fontWeight: 800 }}>
                Bekijk alle {sector.name.toLowerCase()} vacatures →
              </Link>
            </div>
            <div className="job-list">
              {sectorJobs.map((j) => <JobCard key={j.slug} job={j} />)}
            </div>
            <FitCheckBlock />
            <div className="open-cta">
              <div>
                <h3>Ontvang nieuwe {sector.name}-vacatures</h3>
                <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 5 }}>Laat je gegevens achter en ontvang updates.</p>
              </div>
              <JobAlertForm sectors={[sector.name]} sector={sector.name} compact />
            </div>
          </div>
          <div className="recruiter-card">
            <div className="avatar"><img src={sector.recruiter.image} alt={sector.recruiter.name} /></div>
            <div><h4>{sector.recruiter.name}</h4><p>{sector.recruiter.title}. Eerst even kennismaken? Laat je cv achter of plan een kort telefoontje.</p></div>
            <Link className="btn btn-primary btn-sm" href="/cv-check">✉ Laat je cv checken</Link>
            <Link className="btn btn-outline-dark btn-sm" href="/kennismaking">☎ Korte kennismaking</Link>
          </div>
        </div>
      </section>
    </>
  )
}
