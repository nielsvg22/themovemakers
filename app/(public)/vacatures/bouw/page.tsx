import { Metadata } from 'next'
import { PublicLayout } from '@/components/public/PublicLayout'
import { SectorPage, SectorData } from './_components/SectorPage'
import { images } from '@/lib/data/site'
import { getPublicJobs } from '@/lib/data/vacancies'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Werken in de Bouw | Vacatures bouw',
  description: 'De bouwsector is continu in beweging. Van woningbouw tot utiliteitsbouw: wij hebben regelmatig nieuwe vacatures voor vakmensen, uitvoerders, werkvoorbereiders en projectleiders.',
}

const sectorData: SectorData = {
  name: 'Bouw',
  description: 'De bouwsector is continu in beweging. Van woningbouw tot utiliteitsbouw: wij hebben regelmatig nieuwe vacatures voor vakmensen, uitvoerders, werkvoorbereiders en projectleiders.',
  image: images.bouwHero,
  popularRoles: [
    { name: 'Uitvoerder', count: 4 },
    { name: 'Werkvoorbereider', count: 3 },
    { name: 'Projectleider', count: 2 },
    { name: 'Timmerman', count: 2 },
    { name: 'Calculator', count: 1 },
  ],
  recruiter: {
    name: 'Mark de Jong',
    title: 'Recruitmentspecialist Bouw & Civiel',
    image: images.recruiter,
  },
}

export default async function BouwPage() {
  const jobs = await getPublicJobs('Bouw')
  return (
    <PublicLayout>
      <SectorPage sector={sectorData} jobs={jobs} />
    </PublicLayout>
  )
}
