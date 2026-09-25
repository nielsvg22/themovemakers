import { Metadata } from 'next'
import { Suspense } from 'react'
import { PublicLayout } from '@/components/public/PublicLayout'
import { PageHero } from '@/components/public/PageHero'
import { ForWhoBlock } from '@/components/public/CandidateBlocks'
import { getPublicJobs, getSectorCounts } from '@/lib/data/vacancies'
import { VacancyBrowser } from './_components/VacancyBrowser'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Vacatures',
  description: 'Vind jouw volgende uitdaging in de bouw, civiel, techniek en meer.',
}

export default async function VacaturesPage() {
  const [jobs, { counts, sectors }] = await Promise.all([getPublicJobs(), getSectorCounts()])
  return (
    <PublicLayout>
      <PageHero eyebrow="Vind jouw volgende stap" title="Vacatures" subtitle="Vind jouw volgende uitdaging in de bouw, civiel, techniek en meer." />
      <Suspense>
        <VacancyBrowser jobs={jobs} sectors={sectors} counts={counts} />
      </Suspense>
      <ForWhoBlock background="#f7f8f8" />
    </PublicLayout>
  )
}
