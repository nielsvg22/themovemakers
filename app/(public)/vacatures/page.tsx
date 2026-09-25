'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { PublicLayout } from '@/components/public/PublicLayout'
import { VacancyList } from './_components/VacancyList'
import { VacancySidebar } from './_components/VacancySidebar'
import { PageHero } from '@/components/public/PageHero'

const sectors = [
  { name: 'Alle vacatures', value: 'all', count: 38 },
  { name: 'Bouw', value: 'bouw', count: 12 },
  { name: 'Civiel', value: 'civiel', count: 8 },
  { name: 'Techniek', value: 'techniek', count: 7 },
  { name: 'Engineering', value: 'engineering', count: 5 },
  { name: 'Installatietechniek', value: 'installatietechniek', count: 4 },
  { name: 'Werkvoorbereiding', value: 'werkvoorbereiding', count: 3 },
  { name: 'Projectmanagement', value: 'projectmanagement', count: 2 },
]

const locations = ['Apeldoorn', 'Utrecht', 'Rotterdam', 'Amsterdam', 'Eindhoven', 'Gouda', 'Arnhem']
const sortOptions = ['Nieuwste', 'Relevantie', 'Salaris']

export default function VacaturesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [sector, setSector] = useState(searchParams.get('sector') || 'all')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [sort, setSort] = useState(searchParams.get('sort') || 'nieuwste')

  const updateParams = () => {
    const params = new URLSearchParams()
    if (search) params.set('q', search)
    if (sector !== 'all') params.set('sector', sector)
    if (location) params.set('location', location)
    if (sort !== 'nieuwste') params.set('sort', sort)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    const timer = setTimeout(updateParams, 300)
    return () => clearTimeout(timer)
  }, [search, sector, location, sort])

  const activeSector = sectors.find(s => s.value === sector) || sectors[0]

  return (
    <PublicLayout>
      <PageHero
        title="Vacatures"
        subtitle="Vind jouw volgende uitdaging in de bouw, civiel, techniek en meer."
        eyebrow="Vind jouw volgende stap"
      />
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[260px_1fr] gap-6">
            <aside className="lg:sticky lg:top-24">
              <VacancySidebar
                sectors={sectors}
                activeSector={activeSector}
                onSectorChange={setSector}
                locations={locations}
                selectedLocation={location}
                onLocationChange={setLocation}
                sortOptions={sortOptions}
                selectedSort={sort}
                onSortChange={setSort}
                search={search}
                onSearchChange={setSearch}
              />
            </aside>
            <div className="min-w-0">
              <VacancyList
                search={search}
                sector={sector}
                location={location}
                sort={sort}
              />
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}