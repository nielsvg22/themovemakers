import { Metadata } from 'next'
import { PublicLayout } from '@/components/public/PublicLayout'
import { JobDetailPage } from './_components/JobDetailPage'
import { findJob, jobs } from '@/lib/data/site'

interface JobDetailRouteProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }))
}

export async function generateMetadata({ params }: JobDetailRouteProps): Promise<Metadata> {
  const job = findJob((await params).slug)
  return {
    title: `${job.title} | Vacature`,
    description: `Solliciteer direct op deze vacature als ${job.title} bij ${job.company} in ${job.city}.`,
  }
}

export default async function JobDetailRoute({ params }: JobDetailRouteProps) {
  const job = findJob((await params).slug)
  return (
    <PublicLayout>
      <JobDetailPage job={job} />
    </PublicLayout>
  )
}
