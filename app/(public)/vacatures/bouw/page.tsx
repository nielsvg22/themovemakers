import { Metadata } from 'next'
import { PublicLayout } from '@/components/public/PublicLayout'
import { SectorPage } from './_components/SectorPage'

export const metadata: Metadata = {
  title: 'Werken in de Bouw | Vacatures bouw',
  description: 'De bouwsector is continu in beweging. Van woningbouw tot utiliteitsbouw: wij hebben regelmatig nieuwe vacatures voor vakmensen, uitvoerders, werkvoorbereiders en projectleiders.',
}

const sectorData = {
  name: 'Bouw',
  slug: 'bouw',
  description: 'De bouwsector is continu in beweging. Van woningbouw tot utiliteitsbouw: wij hebben regelmatig nieuwe vacatures voor vakmensen, uitvoerders, werkvoorbereiders en projectleiders.',
  image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=85',
  popularRoles: [
    { name: 'Uitvoerder', count: 4 },
    { name: 'Werkvoorbereider', count: 3 },
    { name: 'Projectleider', count: 2 },
    { name: 'Timmerman', count: 2 },
    { name: 'Calculator', count: 1 },
  ],
  regions: ['Utrecht', 'Rotterdam', 'Amsterdam', 'Eindhoven', 'Apeldoorn'],
  recruiter: {
    name: 'Mark de Jong',
    title: 'Recruitmentspecialist Bouw & Civiel',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    phone: '055 - 000 00 01',
    email: 'mark@themovemaker.nl',
  },
  jobCount: 12,
}

export default function BouwPage() {
  return (
    <PublicLayout>
      <SectorPage sector={sectorData} />
    </PublicLayout>
  )
}