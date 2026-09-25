import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const vacancies = await prisma.vacancy.findMany({
    where: {
      status: 'ACTIEF',
      publishedAt: { not: null },
      expiresAt: { gte: new Date() },
    },
    include: {
      company: true,
    },
    orderBy: { publishedAt: 'desc' },
    take: 1000,
  })

  const jobsJsonLd = vacancies.map(vacancy => {
    const contractTypeMap: Record<string, string> = {
      VAST: 'FULL_TIME',
      TIJDELIJK: 'TEMPORARY',
      DETACHERING: 'CONTRACTOR',
      FREELANCE: 'CONTRACTOR',
      STAGE: 'INTERN',
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: vacancy.title,
      description: vacancy.description,
      identifier: {
        '@type': 'PropertyValue',
        name: 'The Move Maker',
        value: vacancy.id,
      },
      url: `${baseUrl}/vacatures/${vacancy.slug}`,
      datePosted: vacancy.publishedAt?.toISOString().split('T')[0],
      validThrough: vacancy.expiresAt?.toISOString().split('T')[0] || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      employmentType: contractTypeMap[vacancy.contractType] || 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: vacancy.company.name,
        sameAs: vacancy.company.website || undefined,
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          streetAddress: vacancy.location,
          addressLocality: vacancy.city || '',
          addressCountry: 'NL',
        },
      },
      baseSalary: vacancy.salaryMin && vacancy.salaryMax ? {
        '@type': 'MonetaryAmount',
        currency: 'EUR',
        value: {
          '@type': 'QuantitativeValue',
          minValue: vacancy.salaryMin,
          maxValue: vacancy.salaryMax,
          unitText: vacancy.salaryPeriod === 'maand' ? 'MONTH' : 'YEAR',
        },
      } : undefined,
      applicationContact: {
        '@type': 'ContactPoint',
        contactType: 'HR',
        email: 'info@themovemaker.nl',
        telephone: '+31-55-000-00-00',
      },
    }
  })

  return NextResponse.json({
    '@context': 'https://schema.org',
    '@graph': jobsJsonLd,
  }, {
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}