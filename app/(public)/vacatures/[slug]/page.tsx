import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PublicLayout } from '@/components/public/PublicLayout'
import { getPublicJob } from '@/lib/data/vacancies'
import { JobDetailPage } from './_components/JobDetailPage'

export const dynamic = 'force-dynamic'

interface JobDetailRouteProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: JobDetailRouteProps): Promise<Metadata> {
  const job = await getPublicJob((await params).slug)
  if (!job) return { title: 'Vacature niet gevonden' }
  return {
    title: `${job.title} | Vacature`,
    description: `${job.title}${job.company ? ` bij ${job.company}` : ''} in ${job.city}. ${job.description.slice(0, 140)}`,
  }
}

export default async function JobDetailRoute({ params }: JobDetailRouteProps) {
  const job = await getPublicJob((await params).slug)
  if (!job) notFound()
  return (
    <PublicLayout>
      <JobDetailPage job={job} />
    </PublicLayout>
  )
}
