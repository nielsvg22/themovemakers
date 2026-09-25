'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

const sectors = [
  { name: 'Bouw', count: 12, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80', href: '/vacatures/bouw' },
  { name: 'Civiel', count: 8, image: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=700&q=80', href: '/vacatures/civiel' },
  { name: 'Techniek', count: 14, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=700&q=80', href: '/vacatures/techniek' },
  { name: 'Engineering', count: 6, image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=700&q=80', href: '/vacatures/engineering' },
  { name: 'Installatietechniek', count: 9, image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=700&q=80', href: '/vacatures/installatietechniek' },
  { name: 'Projectmanagement', count: 5, image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=700&q=80', href: '/vacatures/projectmanagement' },
]

export function SectorGrid() {
  return (
    <section className="py-20" aria-labelledby="sectors-title">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-muted mb-2">Vind sneller wat bij je past</p>
            <h2 id="sectors-title" className="font-black tracking-tight text-3xl md:text-4xl">
              Direct naar jouw vakgebied
            </h2>
            <p className="mt-3 text-muted max-w-2xl">
              Ontdek vacatures in jouw specialisme. Klik en bekijk direct alle mogelijkheden.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {sectors.map((sector) => (
            <Link
              key={sector.name}
              href={sector.href}
              className={cn(
                'relative min-h-[220px] rounded-2xl overflow-hidden text-white',
                'bg-[#132e3d] shadow-card card-hover focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-navy'
              )}
              aria-label={`${sector.name} - ${sector.count} vacatures`}
            >
              <img
                src={sector.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="font-extrabold text-xl">{sector.name}</h3>
                <p className="text-sm text-[#d7e0e4] mt-1">{sector.count} vacatures</p>
                <div className="mt-3 flex items-center justify-end">
                  <ArrowRight className="w-6 h-6 text-lime" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}