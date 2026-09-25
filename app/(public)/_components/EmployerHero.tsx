'use client'

import { Button } from '@/components/ui/Button'

export function EmployerHero() {
  return (
    <section className="py-24 bg-navy text-white relative overflow-hidden" aria-labelledby="employer-title">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-lime/80 mb-4">Voor werkgevers</p>
            <h2 id="employer-title" className="font-black tracking-tight text-3xl md:text-4xl mb-6">
              De juiste mensen. Voor vandaag én morgen.
            </h2>
            <p className="text-[#c8d6dd] text-lg max-w-2xl mb-8">
              Wij helpen bedrijven in bouw, civiel, techniek en meer aan vakspecialisten.
              Niet alleen door te werven, maar ook door jouw vacatures zichtbaar te maken met slimme recruitment marketing.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="/gratis-recruitmentscan">Bespreek mijn vacature →</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/voor-werkgevers">Bekijk onze diensten →</a>
              </Button>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] max-w-lg mx-auto lg:mx-0">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=85"
              alt="Team samenwerken"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}