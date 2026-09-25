'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { PageHero } from '@/components/public/PageHero'
import { Button } from '@/components/ui/Button'
import { ArrowRight, MapPin, Users, Clock, ChevronRight, Mail, Phone } from 'lucide-react'

interface SectorData {
  name: string
  slug: string
  description: string
  image: string
  popularRoles: { name: string; count: number }[]
  regions: string[]
  recruiter: {
    name: string
    title: string
    image: string
    phone: string
    email: string
  }
  jobCount: number
}

interface SectorPageProps {
  sector: SectorData
}

export function SectorPage({ sector }: SectorPageProps) {
  const mockJobs = [
    { id: 1, title: 'Uitvoerder Bouw', company: 'BAM', city: 'Utrecht', salary: '€ 4.000 - € 5.500', hours: '32 - 40 uur', type: 'Vast', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80' },
    { id: 2, title: 'Werkvoorbereider Bouw', company: 'Heijmans', city: 'Rotterdam', salary: '€ 3.500 - € 5.000', hours: '32 - 40 uur', type: 'Vast', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=500&q=80' },
    { id: 3, title: 'Projectleider Bouw', company: 'VolkerWessels', city: 'Eindhoven', salary: '€ 5.000 - € 7.000', hours: '32 - 40 uur', type: 'Vast', image: 'https://images.unsplash.com/photo-1513467655676-561b7d489a88?auto=format&fit=crop&w=500&q=80' },
  ]

  return (
    <>
      <PageHero
        title={`Werken in de ${sector.name}`}
        subtitle={sector.description}
        eyebrow="Vakgebied"
        image={sector.image}
      />
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[220px_1fr_260px] gap-6">
            <aside className="space-y-6">
              <div className="bg-white border border-line rounded-2xl p-5">
                <h4 className="font-extrabold mb-4">Populaire functies</h4>
                <ul className="space-y-3" role="list">
                  {sector.popularRoles.map((role) => (
                    <li key={role.name} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                      <span className="text-sm">{role.name}</span>
                      <span className="font-bold text-sm text-lime">{role.count}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-line rounded-2xl p-5 text-center">
                <h4 className="font-extrabold mb-4">Relevante regio's</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {sector.regions.map((region) => (
                    <span key={region} className="px-3 py-1 bg-soft text-sm rounded-full text-ink">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            </aside>

            <div className="min-w-0 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-xl">{sector.jobCount} vacatures in {sector.name}</h3>
                <Link
                  href={`/vacatures?sector=${sector.slug}`}
                  className="text-sm font-extrabold text-lime hover:underline flex items-center gap-1"
                >
                  Bekijk alle {sector.name.toLowerCase()} vacatures
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-3" role="list" aria-label={`${sector.name} vacatures`}>
                {mockJobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/vacatures/${job.title.toLowerCase().replace(/\s+/g, '-')}-${job.city.toLowerCase()}`}
                    className={cn(
                      'grid grid-cols-[90px_1fr] gap-4 p-4 border border-line rounded-2xl bg-white',
                      'hover:shadow-card-hover transition-shadow'
                    )}
                    role="listitem"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <img src={job.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-extrabold">{job.title}</h4>
                      <p className="text-sm text-muted mt-1">{job.company}</p>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-[#697983]">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.city}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.hours}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-[#efffd0] to-[#f8ffed] border border-[#dcf8a9] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold">Ontvang nieuwe {sector.name}-vacatures</h3>
                  <p className="text-sm text-muted mt-1">Laat je gegevens achter en ontvang updates.</p>
                </div>
                <div className="flex gap-3 flex-wrap w-full md:w-auto">
                  <input
                    type="email"
                    placeholder="E-mailadres"
                    className="flex-1 min-w-[200px] border border-line rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lime"
                  />
                  <Button size="sm" variant="dark">Houd mij op de hoogte →</Button>
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24">
              <div className="bg-white border border-line rounded-2xl p-5 text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
                  <img src={sector.recruiter.image} alt={sector.recruiter.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-extrabold">{sector.recruiter.name}</h4>
                <p className="text-sm text-muted">{sector.recruiter.title}</p>
                <div className="mt-4 space-y-2">
                  <Button variant="primary" className="w-full" asChild>
                    <a href={`tel:${sector.recruiter.phone.replace(/\s/g, '')}`}>
                      <Phone className="w-4 h-4 mr-2" /> Bel {sector.recruiter.name.split(' ')[0]}
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`mailto:${sector.recruiter.email}`}>
                      <Mail className="w-4 h-4 mr-2" /> Stuur bericht
                    </a>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}