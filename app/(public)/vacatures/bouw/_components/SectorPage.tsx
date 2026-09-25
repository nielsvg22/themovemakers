import Link from 'next/link'
import { PageHero } from '@/components/public/PageHero'
import { JobCard } from '@/components/public/JobCard'
import { ActionButton } from '@/components/public/ActionButton'
import { jobs } from '@/lib/data/site'

export interface SectorData {
  name: string
  description: string
  image: string
  popularRoles: { name: string; count: number }[]
  recruiter: { name: string; title: string; image: string; phone: string; email: string }
  jobCount: number
}

export function SectorPage({ sector }: { sector: SectorData }) {
  const sectorJobs = jobs.filter((j) => j.sector === sector.name).slice(0, 3)
  const firstName = sector.recruiter.name.split(' ')[0]

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
              <h3>{sector.jobCount} vacatures in {sector.name}</h3>
              <Link href={`/vacatures?sector=${sector.name}`} style={{ fontSize: 13, fontWeight: 800 }}>
                Bekijk alle {sector.name.toLowerCase()} vacatures →
              </Link>
            </div>
            <div className="job-list">
              {sectorJobs.map((j) => <JobCard key={j.slug} job={j} />)}
            </div>
            <div className="open-cta">
              <div>
                <h3>Ontvang nieuwe {sector.name}-vacatures</h3>
                <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 5 }}>Laat je gegevens achter en ontvang updates.</p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <input className="form-control" style={{ width: 220 }} type="email" placeholder="E-mailadres" aria-label="E-mailadres" />
                <ActionButton className="btn btn-dark btn-sm" toast={`${sector.name}-alert ingesteld`}>Houd mij op de hoogte →</ActionButton>
              </div>
            </div>
          </div>
          <div className="recruiter-card">
            <div className="avatar"><img src={sector.recruiter.image} alt={sector.recruiter.name} /></div>
            <div><h4>{sector.recruiter.name}</h4><p>{sector.recruiter.title}</p></div>
            <a className="btn btn-primary btn-sm" href={`tel:${sector.recruiter.phone.replace(/\D/g, '')}`}>☎ Bel {firstName}</a>
            <a className="btn btn-outline-dark btn-sm" href={`mailto:${sector.recruiter.email}`}>✉ Stuur bericht</a>
          </div>
        </div>
      </section>
    </>
  )
}
