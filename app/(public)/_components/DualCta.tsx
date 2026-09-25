'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const ctas = [
  {
    title: 'Ik zoek baan',
    description: 'Vind de vacature die bij jou past en maak de volgende stap in je carrière.',
    href: '/vacatures',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=85',
  },
  {
    title: 'Ik zoek personeel',
    description: 'Wij vinden, selecteren en overtuigen de juiste mensen voor jouw organisatie.',
    href: '/voor-werkgevers',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=85',
  },
]

export function DualCta() {
  return (
    <section className="py-20" aria-labelledby="dual-cta-title">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4">
          {ctas.map((cta) => (
            <Link
              key={cta.title}
              href={cta.href}
              className={cn(
                'relative min-h-[275px] rounded-2xl overflow-hidden text-white',
                'bg-[#112b3b] card-hover focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-navy'
              )}
            >
              <img
                src={cta.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-navy/20" />
              <div className="relative z-10 p-8 max-w-xs">
                <h3 className="font-black text-2xl">{cta.title}</h3>
                <p className="mt-3 text-[#d8e3e9]">{cta.description}</p>
                <Button size="sm" variant="primary" className="mt-6" asChild>
                  Bekijk alle vacatures →
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}