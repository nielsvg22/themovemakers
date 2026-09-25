'use client'

import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/public/PageHero'
import { ServicesGrid } from '@/app/(public)/_components/ServicesGrid'
import { ApproachSteps } from '@/app/(public)/_components/ApproachSteps'
import { MarketingStrip } from '@/app/(public)/_components/MarketingStrip'
import { CaseStudies } from '@/app/(public)/_components/CaseStudies'

export function EmployerPage() {
  return (
    <>
      <PageHero
        title="Moeite om de juiste mensen te vinden?"
        subtitle="Wij helpen organisaties in bouw, civiel en techniek aan de juiste vakspecialisten. Niet alleen door te zoeken, maar door jouw werkgeversverhaal en vacatures zichtbaar te maken."
        eyebrow="Voor werkgevers"
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=85"
      />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <h2 className="font-black tracking-tight text-3xl md:text-4xl mb-4">
              Recruitment dat verder gaat dan zoeken
            </h2>
            <p className="text-muted text-lg">
              Van positionering en campagne tot selectie en plaatsing. We maken recruitment meetbaar, persoonlijk en zichtbaar.
            </p>
          </div>
          <ServicesGrid />
        </div>
      </section>
      <ApproachSteps />
      <MarketingStrip />
      <CaseStudies />
    </>
  )
}