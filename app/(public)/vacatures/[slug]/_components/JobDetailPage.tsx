'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSiteUI } from '@/components/public/SiteUI'
import { ApplyForm } from '@/components/public/CandidateForms'
import { images, sectorHref, type Job } from '@/lib/data/site'

export interface JobDetail extends Job {
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string | null
  companyInfo: string | null
}

export function JobDetailPage({ job }: { job: JobDetail }) {
  const { openModal } = useSiteUI()
  const [activeTab, setActiveTab] = useState('over')

  const tabs = [
    { id: 'over', label: 'Over de functie' },
    job.responsibilities.length ? { id: 'doen', label: 'Wat ga je doen?' } : null,
    job.requirements.length ? { id: 'meebrengen', label: 'Wat breng je mee?' } : null,
    job.benefits ? { id: 'bieden', label: 'Wat bieden wij?' } : null,
    job.companyInfo ? { id: 'bedrijf', label: 'Het bedrijf' } : null,
  ].filter((t): t is { id: string; label: string } => t !== null)

  const goToTab = (id: string) => {
    setActiveTab(id)
    document.getElementById(`tab-${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> / <Link href="/vacatures">Vacatures</Link> / <Link href={sectorHref(job.sector)}>{job.sector}</Link>
          </div>
          <div className="job-top">
            <div>
              <h1 style={{ fontSize: 50 }}>{job.title}</h1>
              <div className="meta">
                <span>{job.company}</span>
                <span>📍 {job.city}</span>
                <span>{job.salary}</span>
                <span>{job.hours}</span>
                <span>{job.type}</span>
              </div>
            </div>
            <a className="btn btn-primary" href="#solliciteren">Solliciteer op deze vacature →</a>
          </div>
        </div>
      </div>

      <section>
        <div className="container job-detail-grid">
          <div>
            <div className="detail-tabs" role="tablist">
              {tabs.map((t) => (
                <button key={t.id} role="tab" aria-selected={activeTab === t.id} className={`detail-tab${activeTab === t.id ? ' active' : ''}`} onClick={() => goToTab(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="detail-content">
              <img className="detail-image" src={job.img || images.jobDetail} alt="" />
              <h3 id="tab-over">Over de functie</h3>
              <p>{job.description}</p>
              {job.responsibilities.length > 0 && (
                <>
                  <h3 id="tab-doen">Wat ga je doen?</h3>
                  <ul>{job.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
                </>
              )}
              {job.requirements.length > 0 && (
                <>
                  <h3 id="tab-meebrengen">Wat breng je mee?</h3>
                  <ul>{job.requirements.map((r) => <li key={r}>{r}</li>)}</ul>
                </>
              )}
              {job.benefits && (
                <>
                  <h3 id="tab-bieden">Wat bieden wij?</h3>
                  <p>{job.benefits}</p>
                </>
              )}
              {job.companyInfo && (
                <>
                  <h3 id="tab-bedrijf">Het bedrijf</h3>
                  <p>{job.companyInfo}</p>
                </>
              )}
            </div>
          </div>
          <aside>
            <div className="side-links">
              <h4>Meer binnen jouw vakgebied</h4>
              {['Bouw', 'Civiel', 'Techniek'].map((s) => (
                <Link key={s} className="side-link" href={sectorHref(s)}><span>{s}</span><span>›</span></Link>
              ))}
            </div>
            <div className="side-links">
              <h4>Niet helemaal wat je zoekt?</h4>
              <Link className="side-link" href="/kennismaking"><span>Eerst kort kennismaken</span><span>›</span></Link>
              <Link className="side-link" href={sectorHref(job.sector)}><span>Bekijk alle {job.sector}-vacatures</span><span>›</span></Link>
              <button className="side-link" onClick={() => openModal('application')}><span>Doe een open sollicitatie</span><span>›</span></button>
            </div>
          </aside>
        </div>
      </section>

      <div className="forms-zone" id="solliciteren">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="form-card">
            <h3>Solliciteren op {job.title}</h3>
            <p className="sub">Binnen een minuut geregeld: je gegevens en je cv. We bekijken je profiel en nemen contact op als je achtergrond aansluit.</p>
            <ApplyForm vacancySlug={job.slug} vacancyTitle={job.title} />
          </div>
        </div>
      </div>
    </>
  )
}
