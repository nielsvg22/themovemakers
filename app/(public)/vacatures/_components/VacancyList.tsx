'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { cn, formatSalary, getInitials } from '@/lib/utils'
import { Search, MapPin, Clock, Briefcase, ChevronRight } from 'lucide-react'

const mockJobs = [
  { id: 1, title: 'Uitvoerder Bouw', company: 'BAM', city: 'Utrecht', salary: '€ 4.000 - € 5.500', hours: '32 - 40 uur', type: 'Vast', sector: 'Bouw', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80' },
  { id: 2, title: 'Werkvoorbereider Bouw', company: 'Heijmans', city: 'Rotterdam', salary: '€ 3.500 - € 5.000', hours: '32 - 40 uur', type: 'Vast', sector: 'Bouw', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=500&q=80' },
  { id: 3, title: 'Projectleider Bouw', company: 'VolkerWessels', city: 'Eindhoven', salary: '€ 5.000 - € 7.000', hours: '32 - 40 uur', type: 'Vast', sector: 'Bouw', image: 'https://images.unsplash.com/photo-1513467655676-561b7d489a88?auto=format&fit=crop&w=500&q=80' },
  { id: 4, title: 'Timmerman', company: 'Strukton', city: 'Amsterdam', salary: '€ 2.800 - € 3.800', hours: '32 - 40 uur', type: 'Vast', sector: 'Bouw', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=500&q=80' },
  { id: 5, title: 'Projectcoördinator Civiel', company: 'Boskalis', city: 'Gouda', salary: '€ 4.200 - € 5.700', hours: '36 - 40 uur', type: 'Vast', sector: 'Civiel', image: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=500&q=80' },
  { id: 6, title: 'Engineer Werktuigbouw', company: 'SPIE', city: 'Arnhem', salary: '€ 3.800 - € 5.200', hours: '32 - 40 uur', type: 'Vast', sector: 'Engineering', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=500&q=80' },
  { id: 7, title: 'Monteur Installatietechniek', company: 'Unica', city: 'Apeldoorn', salary: '€ 3.000 - € 4.100', hours: '32 - 40 uur', type: 'Vast', sector: 'Installatietechniek', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=500&q=80' },
  { id: 8, title: 'Technisch Projectmanager', company: 'TenneT', city: 'Arnhem', salary: '€ 5.400 - € 7.200', hours: '36 - 40 uur', type: 'Vast', sector: 'Projectmanagement', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=500&q=80' },
  { id: 9, title: 'Calculator Civiel', company: 'BAM Infra', city: 'Utrecht', salary: '€ 4.000 - € 5.500', hours: '32 - 40 uur', type: 'Vast', sector: 'Civiel', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80' },
  { id: 10, title: 'BIM Modelleur', company: 'Heijmans', city: 'Rosmalen', salary: '€ 3.500 - € 4.800', hours: '32 - 40 uur', type: 'Vast', sector: 'Techniek', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=500&q=80' },
  { id: 11, title: 'Werkvoorbereider Installatietechniek', company: 'Vink Bouw', city: 'Apeldoorn', salary: '€ 3.500 - € 4.800', hours: '32 - 40 uur', type: 'Vast', sector: 'Installatietechniek', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=500&q=80' },
  { id: 12, title: 'Site Manager', company: 'VolkerWessels', city: 'Amsterdam', salary: '€ 5.000 - € 6.500', hours: '36 - 40 uur', type: 'Vast', sector: 'Projectmanagement', image: 'https://images.unsplash.com/photo-1513467655676-561b7d489a88?auto=format&fit=crop&w=500&q=80' },
]

interface VacancyListProps {
  search: string
  sector: string
  location: string
  sort: string
}

export function VacancyList({ search, sector, location, sort }: VacancyListProps) {
  const filteredJobs = useMemo(() => {
    let jobs = [...mockJobs]

    if (search) {
      const q = search.toLowerCase()
      jobs = jobs.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.city.toLowerCase().includes(q)
      )
    }

    if (sector !== 'all') {
      jobs = jobs.filter(j => j.sector.toLowerCase() === sector.toLowerCase())
    }

    if (location) {
      jobs = jobs.filter(j => j.city.toLowerCase() === location.toLowerCase())
    }

    switch (sort) {
      case 'salaris':
        jobs.sort((a, b) => {
          const aMax = parseInt(a.salary.replace(/[^0-9]/g, ''))
          const bMax = parseInt(b.salary.replace(/[^0-9]/g, ''))
          return bMax - aMax
        })
        break
      case 'relevantie':
      default:
        break
    }

    return jobs
  }, [search, sector, location, sort])

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="search"
            placeholder="Zoek op functie, trefwoord of bedrijf..."
            defaultValue={search}
            onChange={(e) => {}}
            className="w-full pl-10 pr-4 py-3 border border-line rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-lime"
            aria-label="Zoek vacatures"
          />
        </div>
        <select
          defaultValue={location}
          onChange={(e) => {}}
          className="w-48 px-4 py-3 border border-line rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-lime"
          aria-label="Filter op locatie"
        >
          <option value="">Locatie</option>
          {['Apeldoorn', 'Utrecht', 'Rotterdam', 'Amsterdam', 'Eindhoven', 'Gouda', 'Arnhem'].map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <select
          defaultValue={sort}
          onChange={(e) => {}}
          className="w-40 px-4 py-3 border border-line rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-lime"
          aria-label="Sorteer vacatures"
        >
          <option value="nieuwste">Nieuwste</option>
          <option value="relevantie">Relevantie</option>
          <option value="salaris">Salaris</option>
        </select>
      </div>

      <div className="flex items-center justify-between mb-5">
        <h3 className="font-extrabold text-lg">
          {filteredJobs.length} vacature{filteredJobs.length !== 1 ? 's' : ''}
          {sector !== 'all' && ` in ${sectors.find(s => s.value === sector)?.name}`}
        </h3>
        <span className="text-sm text-muted">Meest recent</span>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="py-12 text-center border-2 border-dashed border-line rounded-2xl">
          <p className="text-muted">Geen vacatures gevonden.</p>
        </div>
      ) : (
        <div className="space-y-3" role="list" aria-label="Vacatures">
          {filteredJobs.map((job) => (
            <Link
              key={job.id}
              href={`/vacatures/${job.title.toLowerCase().replace(/\s+/g, '-')}-${job.city.toLowerCase()}`}
              className={cn(
                'grid grid-cols-[90px_1fr_auto] gap-4 items-center p-4 border border-line rounded-2xl bg-white',
                'shadow-card-hover hover:shadow-card transition-all duration-200 hover:-translate-y-0.5'
              )}
              role="listitem"
            >
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <img src={job.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-lg truncate">{job.title}</h3>
                <p className="text-sm text-muted mt-1">{job.company}</p>
                <div className="flex flex-wrap gap-3 mt-3 text-xs text-[#697983]">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.city}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.hours}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {job.type}</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-lime flex items-center justify-center font-black text-navy">
                <ChevronRight className="w-6 h-6" />
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#efffd0] to-[#f8ffed] border border-[#dcf8a9] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-lg">Staat jouw ideale vacature er niet tussen?</h3>
          <p className="text-sm text-muted mt-1">
            Laat je gegevens achter en we nemen contact met je op zodra we iets passends hebben.
          </p>
        </div>
        <a href="/open-sollicitatie" className="bg-navy text-white font-extrabold py-3 px-6 rounded-lg hover:bg-navy-2 transition-colors whitespace-nowrap">
          Open sollicitatie →
        </a>
      </div>
    </div>
  )
}

const sectors = [
  { name: 'Bouw', value: 'bouw' },
  { name: 'Civiel', value: 'civiel' },
  { name: 'Techniek', value: 'techniek' },
  { name: 'Engineering', value: 'engineering' },
  { name: 'Installatietechniek', value: 'installatietechniek' },
  { name: 'Werkvoorbereiding', value: 'werkvoorbereiding' },
  { name: 'Projectmanagement', value: 'projectmanagement' },
]