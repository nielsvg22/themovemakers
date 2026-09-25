import { Metadata } from 'next'
import { PublicLayout } from '@/components/public/PublicLayout'
import { KandidatenPage } from './_components/KandidatenPage'

export const metadata: Metadata = {
  title: 'Voor kandidaten | Vacatures, carrièreadvies & open sollicitatie',
  description: 'Zoek je een nieuwe uitdaging in bouw, civiel of techniek? Bekijk onze vacatures, meld je aan voor job alerts of doe een open sollicitatie. Wij helpen je stap voor stap.',
}

export default function KandidatenRoute() {
  return (
    <PublicLayout>
      <KandidatenPage />
    </PublicLayout>
  )
}
