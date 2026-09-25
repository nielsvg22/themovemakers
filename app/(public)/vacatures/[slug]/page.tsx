'use client'

import { Metadata } from 'next'
import { PublicLayout } from '@/components/public/PublicLayout'
import { JobDetailPage } from './_components/JobDetailPage'

interface JobDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  return {
    title: `${title} | Vacature`,
    description: `Solliciteer direct op deze vacature als ${title}. Bekijk alle details, eisen en aanbod.`,
  }
}

export default async function JobDetailPageRoute({ params }: JobDetailPageProps) {
  const { slug } = await params
  return (
    <PublicLayout>
      <JobDetailPage slug={slug} />
    </PublicLayout>
  )
}