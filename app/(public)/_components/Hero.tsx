'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[670px] bg-navy text-white overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0 bg-gradient-to-r from-navy/98 via-navy/82 to-navy/8" />
      <img
        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center-right saturate-90"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[590px] pt-18 pb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-wider text-lime/80 mb-4">
              Recruitment voor bouw, civiel & techniek
            </p>
            <h1 id="hero-title" className="font-black tracking-tight leading-[1.05]">
              De schakel tussen <span className="text-lime">talent en vooruitgang</span>
            </h1>
            <p className="mt-6 text-lg text-[#d2dde3] max-w-xl">
              Wij verbinden vakspecialisten en bedrijven in de bouw, civiel, techniek en meer.
              Met de juiste mensen maken we samen Nederland sterker.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/vacatures">
                  Ik zoek een baan →
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/voor-werkgevers">Ik zoek personeel →</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 bg-navy/70">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
            {[
              { icon: '✓', text: 'Persoonlijk contact' },
              { icon: '⌁', text: 'Specialist in bouw, civiel en techniek' },
              { icon: '↗', text: 'Snelle en gerichte matches' },
              { icon: '◎', text: 'Ook recruitment marketing' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-[#dce7ec] text-sm font-bold">
                <span className="w-8 h-8 rounded-lg border border-lime/35 text-lime flex items-center justify-center font-black">
                  {item.icon}
                </span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}