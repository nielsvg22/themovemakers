import { Metadata } from 'next'
import { PublicLayout } from '@/components/public/PublicLayout'
import { getSectorCounts } from '@/lib/data/vacancies'
import { KandidatenPage } from './_components/KandidatenPage'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Voor kandidaten | Vacatures, cv-check & open sollicitatie',
  description: 'Zoek je een nieuwe uitdaging in bouw, civiel of techniek? Bekijk onze vacatures, laat je cv checken of maak kort kennis. We kijken eerst samen of er een goede match is.',
}

export default async function KandidatenRoute() {
  const { counts } = await getSectorCounts()
  return (
    <PublicLayout>
      <KandidatenPage counts={counts} />
    </PublicLayout>
  )
}
