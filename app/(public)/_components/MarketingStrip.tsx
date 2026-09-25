'use client'

import { Button } from '@/components/ui/Button'

const flowSteps = [
  { icon: '□', label: 'Vacature' },
  { icon: '◫', label: 'Campagne' },
  { icon: '◎', label: 'Bereik' },
  { icon: '♙', label: 'Kandidaten' },
  { icon: '✓', label: 'Plaatsing' },
]

export function MarketingStrip() {
  return (
    <section className="py-20" aria-labelledby="marketing-title">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-navy text-white p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-lime/80 mb-3">Recruitment marketing</p>
              <h2 id="marketing-title" className="font-black tracking-tight text-3xl md:text-4xl mb-4">
                Van <span className="text-lime">vacature</span> tot plaatsing.
              </h2>
              <p className="text-[#c7d6dd] text-lg mb-8 max-w-xl">
                Wij zorgen dat het juiste talent je bedrijf vindt. Van doelgroep en campagne tot sollicitatie en plaatsing.
              </p>
              <Button size="sm" variant="primary" asChild>
                <a href="/recruitment-marketing">Meer over recruitment marketing →</a>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {flowSteps.map((step, index) => (
                <div key={index} className="text-center flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full border-2 border-lime/40 text-lime flex items-center justify-center mb-2">
                    {step.icon}
                  </div>
                  <span className="text-xs text-[#cdd9de]">{step.label}</span>
                  {index < flowSteps.length - 1 && (
                    <span className="text-lime text-xl -mt-2">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}