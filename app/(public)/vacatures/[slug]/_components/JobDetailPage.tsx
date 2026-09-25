'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { PageHero } from '@/components/public/PageHero'
import { MapPin, Clock, Briefcase, Euro, ChevronRight, ArrowRight, Building2, User, Mail, Phone, Share2 } from 'lucide-react'

const tabs = [
  { id: 'over', label: 'Over de functie' },
  { id: 'wat-ga-je-doen', label: 'Wat ga je doen?' },
  { id: 'wat-breng-je-mee', label: 'Wat breng je mee?' },
  { id: 'wat-bieden-wij', label: 'Wat bieden wij?' },
  { id: 'bedrijf', label: 'Het bedrijf' },
]

const jobData = {
  title: 'Uitvoerder Bouw',
  company: 'BAM',
  city: 'Utrecht',
  salary: '€ 4.000 - € 5.500',
  hours: '32 - 40 uur',
  type: 'Vast',
  workMode: 'Hybride',
  recruiter: { name: 'Mark de Jong', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  description: 'Als Uitvoerder Bouw ben jij verantwoordelijk voor de dagelijkse aansturing op de bouwplaats. Je bewaakt planning, kwaliteit en veiligheid en bent het centrale aanspreekpunt voor vaklieden, onderaannemers en projectleiding.',
  responsibilities: [
    'Aansturen van teams en onderaannemers.',
    'Bewaken van planning, veiligheid en kwaliteit.',
    'Afstemmen met werkvoorbereiding en projectleiding.',
    'Signaleren en oplossen van knelpunten.',
  ],
  requirements: [
    'Ervaring als uitvoerder binnen woning- of utiliteitsbouw.',
    'Een praktische en communicatief sterke werkstijl.',
    'Veiligheid en kwaliteit staan voor jou voorop.',
  ],
  benefits: 'Een verantwoordelijke functie met veel vrijheid, goede arbeidsvoorwaarden en ruimte om jezelf verder te ontwikkelen.',
  companyInfo: 'BAM is een toonaangevend bouw- en infrabedrijf dat projecten realiseert die maatschappelijke waarde creëren. Van woningen en utiliteitsgebouwen tot wegen, bruggen en tunnels.',
  applicationProcess: 'Na je sollicitatie nemen we contact met je op voor een kennismakingsgesprek. Daarna volgt een gesprek met de opdrachtgever en bij wederzijdse interesse maken we een voorstel.',
  similarJobs: [
    { title: 'Werkvoorbereider Bouw', sector: 'Bouw', href: '/vacatures/werkvoorbereider-bouw-rotterdam' },
    { title: 'Projectleider Bouw', sector: 'Bouw', href: '/vacatures/projectleider-bouw-eindhoven' },
    { title: 'Calculator Civiel', sector: 'Civiel', href: '/vacatures/calculator-civiel-utrecht' },
  ],
}

interface JobDetailPageProps {
  slug: string
}

export function JobDetailPage({ slug }: JobDetailPageProps) {
  const [activeTab, setActiveTab] = useState('over')
  const [showApplication, setShowApplication] = useState(false)

  return (
    <>
      <PageHero
        title={jobData.title}
        subtitle={`${jobData.company} · ${jobData.city}`}
        eyebrow="Vacature"
      />

      <section className="py-10">
        <div className="container mx-auto px-4">
          <nav className="flex gap-2 text-sm text-muted mb-6" aria-label="Broodkruimels">
            <Link href="/" className="hover:text-lime">Home</Link>
            <span>/</span>
            <Link href="/vacatures" className="hover:text-lime">Vacatures</Link>
            <span>/</span>
            <Link href="/vacatures/bouw" className="hover:text-lime">Bouw</Link>
            <span>/</span>
            <span className="text-ink">{jobData.title}</span>
          </nav>

          <div className="flex items-start justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="flex flex-wrap gap-3 text-sm text-[#d2e0e6] mt-4">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {jobData.city}</span>
                <span className="flex items-center gap-1"><Euro className="w-4 h-4" /> {jobData.salary}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {jobData.hours}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {jobData.type}</span>
                <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {jobData.workMode}</span>
              </div>
            </div>
            <Button size="lg" onClick={() => setShowApplication(true)}>
              <span>Solliciteer direct</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-[1fr_280px] gap-8">
            <div>
              <div className="flex gap-6 border-b border-line mb-8 overflow-x-auto" role="tablist">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`${tab.id}-panel`}
                    id={`${tab.id}-trigger`}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'px-2 py-3 text-sm font-extrabold whitespace-nowrap border-b-3 -mb-px transition-colors',
                      activeTab === tab.id
                        ? 'border-lime text-ink'
                        : 'text-muted hover:text-ink'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="prose prose-invert max-w-none">
                {activeTab === 'over' && (
                  <div id="over-panel" role="tabpanel" aria-labelledby="over-trigger">
                    <h3 className="font-extrabold text-2xl mb-4 mt-8">Over de functie</h3>
                    <p className="text-muted leading-relaxed mb-6">{jobData.description}</p>
                    <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                      <img
                        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80"
                        alt="Bouwplaats"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'wat-ga-je-doen' && (
                  <div id="wat-ga-je-doen-panel" role="tabpanel" aria-labelledby="wat-ga-je-doen-trigger">
                    <h3 className="font-extrabold text-2xl mb-4 mt-8">Wat ga je doen?</h3>
                    <ul className="list-disc list-inside space-y-3 text-muted">
                      {jobData.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'wat-breng-je-mee' && (
                  <div id="wat-breng-je-mee-panel" role="tabpanel" aria-labelledby="wat-breng-je-mee-trigger">
                    <h3 className="font-extrabold text-2xl mb-4 mt-8">Wat breng je mee?</h3>
                    <ul className="list-disc list-inside space-y-3 text-muted">
                      {jobData.requirements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'wat-bieden-wij' && (
                  <div id="wat-bieden-wij-panel" role="tabpanel" aria-labelledby="wat-bieden-wij-trigger">
                    <h3 className="font-extrabold text-2xl mb-4 mt-8">Wat bieden wij?</h3>
                    <p className="text-muted leading-relaxed">{jobData.benefits}</p>
                  </div>
                )}

                {activeTab === 'bedrijf' && (
                  <div id="bedrijf-panel" role="tabpanel" aria-labelledby="bedrijf-trigger">
                    <h3 className="font-extrabold text-2xl mb-4 mt-8">Het bedrijf</h3>
                    <p className="text-muted leading-relaxed">{jobData.companyInfo}</p>
                    <h3 className="font-extrabold text-2xl mb-4 mt-8">Sollicitatieproces</h3>
                    <p className="text-muted leading-relaxed">{jobData.applicationProcess}</p>
                  </div>
                )}
              </div>

              <div className="mt-10 border-t border-line pt-8">
                <h3 className="font-extrabold text-xl mb-4">Vergelijkbare vacatures</h3>
                <div className="space-y-3">
                  {jobData.similarJobs.map((job) => (
                    <Link
                      key={job.title}
                      href={job.href}
                      className="flex items-center justify-between p-4 border border-line rounded-xl bg-white hover:bg-soft transition-colors"
                    >
                      <div>
                        <p className="font-bold">{job.title}</p>
                        <p className="text-sm text-muted">{job.sector}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-lime" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 space-y-4">
              <div className="bg-white border border-line rounded-2xl p-5">
                <h4 className="font-extrabold mb-3">Meer binnen jouw vakgebied</h4>
                <nav aria-label="Gerelateerde sectoren">
                  <ul className="space-y-2" role="list">
                    {['Bouw', 'Civiel', 'Techniek', 'Engineering', 'Installatietechniek', 'Projectmanagement'].map((s) => (
                      <li key={s}>
                        <Link
                          href={`/vacatures/${s.toLowerCase()}`}
                          className="flex items-center justify-between py-2 border-b border-line last:border-0 text-sm hover:text-lime transition-colors"
                        >
                          <span>{s}</span>
                          <ChevronRight className="w-4 h-4 text-muted" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="bg-white border border-line rounded-2xl p-5">
                <h4 className="font-extrabold mb-3">Niet helemaal wat je zoekt?</h4>
                <nav aria-label="Alternatieve opties">
                  <ul className="space-y-2" role="list">
                    <li>
                      <Link
                        href={`/vacatures?sector=bouw`}
                        className="flex items-center justify-between py-2 border-b border-line last:border-0 text-sm hover:text-lime transition-colors"
                      >
                        <span>Bekijk alle Bouw-vacatures</span>
                        <ChevronRight className="w-4 h-4 text-muted" />
                      </Link>
                    </li>
                    <li>
                      <button
                        className="flex items-center justify-between w-full py-2 border-b border-line last:border-0 text-sm hover:text-lime transition-colors text-left"
                        onClick={() => setShowApplication(true)}
                      >
                        <span>Stel een vacature-alert in</span>
                        <ChevronRight className="w-4 h-4 text-muted" />
                      </button>
                    </li>
                    <li>
                      <Link
                        href="/open-sollicitatie"
                        className="flex items-center justify-between py-2 text-sm hover:text-lime transition-colors"
                      >
                        <span>Doe een open sollicitatie</span>
                        <ChevronRight className="w-4 h-4 text-muted" />
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="bg-white border border-line rounded-2xl p-5 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden">
                  <img src={jobData.recruiter.image} alt={jobData.recruiter.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-bold">{jobData.recruiter.name}</p>
                <p className="text-sm text-muted">Recruiter</p>
                <div className="mt-3 flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1" asChild>
                    <a href={`tel:0550000001`}><Phone className="w-4 h-4 mr-1" /> Bellen</a>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1" asChild>
                    <a href={`mailto:mark@themovemaker.nl`}><Mail className="w-4 h-4 mr-1" /> Mailen</a>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Modal open={showApplication} onClose={() => setShowApplication(false)} title="Solliciteren op deze vacature" size="lg">
        <ApplicationForm onClose={() => setShowApplication(false)} />
      </Modal>
    </>
  )
}

function ApplicationForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)

  const steps = [
    { number: 1, label: 'Gegevens' },
    { number: 2, label: 'CV' },
    { number: 3, label: 'Vragen' },
    { number: 4, label: 'Verzenden' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4" role="progressbar" aria-label="Sollicitatie stappen">
        {steps.map((s) => (
          <div key={s.number} className={cn('flex items-center gap-2', s.number < steps.length && 'flex-1')}>
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-xs font-black',
              step >= s.number ? 'bg-navy text-white' : 'bg-soft text-muted'
            )}>
              {s.number}
            </div>
            <span className={cn('text-xs font-bold hidden sm:block', step >= s.number ? 'text-ink' : 'text-muted')}>
              {s.label}
            </span>
            {s.number < steps.length && (
              <div className={cn('flex-1 h-1 rounded', step > s.number ? 'bg-lime' : 'bg-line')} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(2) }}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Voornaam *</label>
              <input type="text" className="input" required />
            </div>
            <div>
              <label className="label">Achternaam *</label>
              <input type="text" className="input" required />
            </div>
            <div>
              <label className="label">E-mailadres *</label>
              <input type="email" className="input" required />
            </div>
            <div>
              <label className="label">Telefoonnummer *</label>
              <input type="tel" className="input" required />
            </div>
          </div>
          <Button type="submit" className="w-full">Volgende stap →</Button>
        </form>
      )}

      {step === 2 && (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(3) }}>
          <div>
            <label className="label">CV uploaden *</label>
            <input type="file" accept=".pdf,.doc,.docx" className="input" required />
            <p className="text-xs text-muted mt-1">PDF, DOC of DOCX (max. 5MB)</p>
          </div>
          <div>
            <label className="label">LinkedIn profiel</label>
            <input type="url" className="input" placeholder="https://linkedin.com/in/..." />
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(1)}>← Vorige</Button>
            <Button type="submit" className="flex-1">Volgende stap →</Button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(4) }}>
          <div>
            <label className="label">Motivatie *</label>
            <textarea className="input min-h-[120px] resize-y" required placeholder="Vertel waarom je de perfecte match bent..." />
          </div>
          <div>
            <label className="label">Beschikbaarheid *</label>
            <select className="input">
              <option value="">Kies beschikbaarheid</option>
              <option value="direct">Direct</option>
              <option value="1-maand">Binnen 1 maand</option>
              <option value="2-maanden">Binnen 2 maanden</option>
              <option value="overleg">In overleg</option>
            </select>
          </div>
          <div>
            <label className="label">Salarisverwachting</label>
            <input type="text" className="input" placeholder="Bijv. € 4.500 per maand" />
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(2)}>← Vorige</Button>
            <Button type="submit" className="flex-1">Volgende stap →</Button>
          </div>
        </form>
      )}

      {step === 4 && (
        <div className="space-y-4 text-center py-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-extrabold text-xl">Bedankt voor je sollicitatie!</h3>
          <p className="text-muted">We nemen zo snel mogelijk contact met je op.</p>
          <Button className="w-full mt-4" onClick={onClose}>Sluiten</Button>
        </div>
      )}
    </div>
  )
}