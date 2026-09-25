import 'server-only'
import { prisma } from '@/lib/db/prisma'
import { siteUrl } from '@/lib/email/templates'
export { jobFeedUrl } from './feed-url'

const contractTypeMap: Record<string, string> = {
  VAST: 'FULL_TIME',
  TIJDELIJK: 'TEMPORARY',
  DETACHERING: 'CONTRACTOR',
  FREELANCE: 'CONTRACTOR',
  STAGE: 'INTERN',
}

const workModeMap: Record<string, string> = {
  OP_LOCATIE: 'ON_SITE',
  HYBRIDE: 'HYBRID',
  VOLLEDIG_REMOTE: 'REMOTE',
}

/**
 * Bouwt de vacature-jobfeed (Indeed-achtig XML-formaat, breed ondersteund door NL-jobboards
 * zoals Werkzoeken.nl, Jobbird, Jobsonline, Jober, NuBanen, 24werk, TopVacaturebank en Joof).
 * Deze boards halen vacatures zelf periodiek op zodra de feed-URL eenmalig bij ze is
 * aangemeld; er bestaat voor deze boards geen publieke push-API per vacature.
 */
export async function buildJobFeedXml() {
  const baseUrl = siteUrl()

  const vacancies = await prisma.vacancy.findMany({
    where: { status: 'ACTIEF', publishedAt: { not: null }, expiresAt: { gte: new Date() } },
    include: { company: true, sector: true },
    orderBy: { publishedAt: 'desc' },
    take: 1000,
  })

  const jobsXml = vacancies
    .map((vacancy) => {
      const salary =
        vacancy.salaryMin && vacancy.salaryMax
          ? `<salaryCurrency>EUR</salaryCurrency><salaryMin>${vacancy.salaryMin}</salaryMin><salaryMax>${vacancy.salaryMax}</salaryMax><salaryPeriod>${vacancy.salaryPeriod || 'MONTH'}</salaryPeriod>`
          : ''

      return `
    <job>
      <id>${vacancy.id}</id>
      <title><![CDATA[${vacancy.title}]]></title>
      <company><![CDATA[${vacancy.company?.name ?? 'The Move Maker'}]]></company>
      <location><![CDATA[${vacancy.location}${vacancy.city ? `, ${vacancy.city}` : ''}]]></location>
      <description><![CDATA[${vacancy.description}]]></description>
      <url>${baseUrl}/vacatures/${vacancy.slug}</url>
      <applyUrl>${baseUrl}/vacatures/${vacancy.slug}/solliciteren</applyUrl>
      <datePosted>${vacancy.publishedAt?.toISOString().split('T')[0]}</datePosted>
      <validThrough>${vacancy.expiresAt?.toISOString().split('T')[0] || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}</validThrough>
      <employmentType>${contractTypeMap[vacancy.contractType] || 'FULL_TIME'}</employmentType>
      <workMode>${workModeMap[vacancy.workMode] || 'ON_SITE'}</workMode>
      ${salary}
      <sector><![CDATA[${vacancy.sector.name}]]></sector>
      <reference>${vacancy.id}</reference>
    </job>`
    })
    .join('')

  return { xml: `<?xml version="1.0" encoding="UTF-8"?>
<jobs>
  <source>The Move Maker</source>
  <sourceUrl>${baseUrl}</sourceUrl>
  <generatedAt>${new Date().toISOString()}</generatedAt>
  ${jobsXml}
</jobs>`, count: vacancies.length }
}

