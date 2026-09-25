import { Metadata } from 'next'
import { Suspense } from 'react'
import { PublicLayout } from '@/components/public/PublicLayout'
import { PageHero } from '@/components/public/PageHero'
import { VacancyBrowser } from './_components/VacancyBrowser'

export const metadata: Metadata = {
  title: 'Vacatures',
  description: 'Vind jouw volgende uitdaging in de bouw, civiel, techniek en meer.',
}

export default function VacaturesPage() {
  return (
    <PublicLayout>
      <PageHero eyebrow="Vind jouw volgende stap" title="Vacatures" subtitle="Vind jouw volgende uitdaging in de bouw, civiel, techniek en meer." />
      <Suspense>
        <VacancyBrowser />
      </Suspense>
    </PublicLayout>
  )
}
