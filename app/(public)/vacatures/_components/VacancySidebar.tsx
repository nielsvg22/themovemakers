'use client'

import { cn } from '@/lib/utils'
import { Search, ChevronRight } from 'lucide-react'

interface VacancySidebarProps {
  sectors: { name: string; value: string; count: number }[]
  activeSector: { name: string; value: string; count: number }
  onSectorChange: (value: string) => void
  locations: string[]
  selectedLocation: string
  onLocationChange: (value: string) => void
  sortOptions: string[]
  selectedSort: string
  onSortChange: (value: string) => void
  search: string
  onSearchChange: (value: string) => void
}

export function VacancySidebar({
  sectors,
  activeSector,
  onSectorChange,
  locations,
  selectedLocation,
  onLocationChange,
  sortOptions,
  selectedSort,
  onSortChange,
  search,
  onSearchChange,
}: VacancySidebarProps) {
  return (
    <div className="bg-navy text-white rounded-2xl p-5 space-y-5">
      <h3 className="font-extrabold text-lg mb-3">Vind jouw vakgebied</h3>
      <nav aria-label="Vakgebied filter">
        <ul className="space-y-1" role="list">
          {sectors.map((s) => (
            <li key={s.value}>
              <button
                onClick={() => onSectorChange(s.value)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold transition-colors',
                  s.value === activeSector.value
                    ? 'bg-lime text-navy'
                    : 'text-[#d9e4e9] hover:bg-white/5'
                )}
                aria-pressed={s.value === activeSector.value}
              >
                <span>{s.name}</span>
                <span className="text-xs opacity-80">{s.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-white border border-line rounded-2xl p-5 text-ink space-y-4">
        <h4 className="font-extrabold mb-3">Ontvang nieuwe vacatures</h4>
        <p className="text-sm text-muted mb-4">
          Stel een vacature-alert in en ontvang de nieuwste vacatures in je inbox.
        </p>
        <select
          className="w-full border border-line rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-lime"
          aria-label="Sector voor vacature alert"
        >
          <option>Bouw</option>
          <option>Civiel</option>
          <option>Techniek</option>
          <option>Engineering</option>
        </select>
        <input
          type="email"
          placeholder="E-mailadres"
          className="w-full border border-line rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-lime"
          aria-label="E-mailadres voor vacature alert"
        />
        <button className="w-full bg-navy text-white font-extrabold py-2.5 rounded-lg hover:bg-navy-2 transition-colors">
          Houd mij op de hoogte →
        </button>
      </div>
    </div>
  )
}