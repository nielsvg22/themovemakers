import { JobBoardChannel, VacancyWithRelations, VacancyPublication, JobBoardPublicationResult, JobBoardPublicationStatus } from '@/types'
import { BaseJobBoardConnector, JobBoardConnectorRegistry } from './base-connector'
import { FeedJobBoardConnector } from './feed-connector'

export class EigenWebsiteConnector extends BaseJobBoardConnector {
  key = 'EIGEN_WEBSITE' as JobBoardChannel
  name = 'Eigen website'
  logo = '🌐'
  description = 'Publiceer direct op themovemaker.nl'

  protected getRequiredFields(): string[] {
    return ['title', 'company', 'location', 'description']
  }

  protected buildPayload(vacancy: VacancyWithRelations): Record<string, unknown> {
    return {
      title: vacancy.title,
      slug: vacancy.slug,
      company: (vacancy.company?.name ?? 'The Move Maker'),
      location: vacancy.location,
      description: vacancy.description,
      responsibilities: vacancy.responsibilities,
      requirements: vacancy.requirements,
      benefits: vacancy.benefits,
      companyInfo: vacancy.companyInfo,
      applicationProcess: vacancy.applicationProcess,
      salary: vacancy.salaryMin && vacancy.salaryMax ? `${vacancy.salaryMin}-${vacancy.salaryMax}` : null,
      contractType: vacancy.contractType,
      workMode: vacancy.workMode,
      hours: vacancy.hoursMin && vacancy.hoursMax ? `${vacancy.hoursMin}-${vacancy.hoursMax}` : null,
      publishedAt: new Date().toISOString(),
    }
  }

  async publish(vacancy: VacancyWithRelations, _publication: VacancyPublication): Promise<JobBoardPublicationResult> {
    return {
      success: true,
      externalJobId: `TMM-${vacancy.id.slice(0, 8)}`,
      sourceCode: 'eigen_website',
      url: `/vacatures/${vacancy.slug}`,
      errors: [],
    }
  }

  async update(vacancy: VacancyWithRelations, publication: VacancyPublication): Promise<JobBoardPublicationResult> {
    return this.publish(vacancy, publication)
  }

  async close(_publication: VacancyPublication): Promise<void> {
    // No-op for own website - handled by vacancy status
  }

  async status(publication: VacancyPublication): Promise<JobBoardPublicationStatus> {
    return { status: 'LIVE', externalJobId: publication.externalJobId ?? undefined }
  }
}

export class GoogleForJobsConnector extends BaseJobBoardConnector {
  key = 'GOOGLE_FOR_JOBS' as JobBoardChannel
  name = 'Google for Jobs'
  logo = 'G'
  description = 'Via JobPosting structured data'

  protected getRequiredFields(): string[] {
    return ['title', 'company', 'location', 'description', 'salaryMin', 'salaryMax', 'contractType']
  }

  protected buildPayload(vacancy: VacancyWithRelations): Record<string, unknown> {
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
      datePosted: new Date().toISOString().split('T')[0],
      validThrough: vacancy.expiresAt ? vacancy.expiresAt.toISOString().split('T')[0] : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      employmentType: this.mapContractType(vacancy.contractType),
      hiringOrganization: {
        '@type': 'Organization',
        name: (vacancy.company?.name ?? 'The Move Maker'),
        sameAs: vacancy.company?.website || undefined,
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
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'EUR',
        value: {
          '@type': 'QuantitativeValue',
          minValue: vacancy.salaryMin,
          maxValue: vacancy.salaryMax,
          unitText: vacancy.salaryPeriod === 'maand' ? 'MONTH' : 'YEAR',
        },
      },
    }
  }

  private mapContractType(type: string): string {
    const map: Record<string, string> = {
      VAST: 'FULL_TIME',
      TIJDELIJK: 'TEMPORARY',
      DETACHERING: 'CONTRACTOR',
      FREELANCE: 'CONTRACTOR',
      STAGE: 'INTERN',
    }
    return map[type] || 'FULL_TIME'
  }

  async publish(vacancy: VacancyWithRelations, _publication: VacancyPublication): Promise<JobBoardPublicationResult> {
    return {
      success: true,
      externalJobId: `GOOGLE-${vacancy.id}`,
      sourceCode: 'google_jobs',
      errors: [],
    }
  }

  async update(vacancy: VacancyWithRelations, publication: VacancyPublication): Promise<JobBoardPublicationResult> {
    return this.publish(vacancy, publication)
  }

  async close(_publication: VacancyPublication): Promise<void> {
    // Handled by removing structured data
  }

  async status(publication: VacancyPublication): Promise<JobBoardPublicationStatus> {
    return { status: 'ELIGIBLE', externalJobId: publication.externalJobId ?? undefined }
  }
}

export class LinkedInConnector extends BaseJobBoardConnector {
  key = 'LINKEDIN' as JobBoardChannel
  name = 'LinkedIn'
  logo = 'in'
  description = 'ATS / Job Posting connector'

  protected getRequiredFields(): string[] {
    return ['title', 'company', 'location', 'description', 'salaryMin', 'salaryMax']
  }

  protected buildPayload(vacancy: VacancyWithRelations): Record<string, unknown> {
    return {
      title: vacancy.title,
      description: vacancy.description,
      companyName: (vacancy.company?.name ?? 'The Move Maker'),
      location: vacancy.location,
      salaryRange: {
        min: vacancy.salaryMin,
        max: vacancy.salaryMax,
        currency: 'EUR',
        period: vacancy.salaryPeriod,
      },
      employmentType: vacancy.contractType,
      workMode: vacancy.workMode,
    }
  }

  async publish(vacancy: VacancyWithRelations, publication: VacancyPublication): Promise<JobBoardPublicationResult> {
    if (publication.mode === 'TEST') {
      return {
        success: true,
        externalJobId: `LI-TEST-${vacancy.id.slice(0, 8)}`,
        sourceCode: 'linkedin_test',
        errors: [],
        rawResponse: { testMode: true, message: 'Test publicatie geslaagd - geen echte LinkedIn API call' },
      }
    }

    return {
      success: false,
      errors: ['LinkedIn API credentials niet geconfigureerd'],
      rawResponse: { error: 'CONFIGURATION_REQUIRED' },
    }
  }

  async update(vacancy: VacancyWithRelations, publication: VacancyPublication): Promise<JobBoardPublicationResult> {
    return this.publish(vacancy, publication)
  }

  async close(_publication: VacancyPublication): Promise<void> {
    // Would call LinkedIn API to close job
  }

  async status(publication: VacancyPublication): Promise<JobBoardPublicationStatus> {
    if (publication.mode === 'TEST') {
      return { status: 'GETEST', externalJobId: publication.externalJobId ?? undefined }
    }
    return { status: publication.status, externalJobId: publication.externalJobId ?? undefined }
  }
}

export class IndeedConnector extends BaseJobBoardConnector {
  key = 'INDEED' as JobBoardChannel
  name = 'Indeed'
  logo = 'i'
  description = 'Job Sync API connector'

  protected getRequiredFields(): string[] {
    return ['title', 'company', 'location', 'description']
  }

  protected buildPayload(vacancy: VacancyWithRelations): Record<string, unknown> {
    return {
      jobkey: `indeed-${vacancy.id}`,
      title: vacancy.title,
      company: (vacancy.company?.name ?? 'The Move Maker'),
      location: vacancy.location,
      description: vacancy.description,
      salary: vacancy.salaryMin && vacancy.salaryMax ? `${vacancy.salaryMin}-${vacancy.salaryMax}` : undefined,
      jobtype: vacancy.contractType,
    }
  }

  async publish(vacancy: VacancyWithRelations, publication: VacancyPublication): Promise<JobBoardPublicationResult> {
    if (publication.mode === 'TEST') {
      return {
        success: true,
        externalJobId: `IND-TEST-${vacancy.id.slice(0, 8)}`,
        sourceCode: 'indeed_test',
        errors: [],
        rawResponse: { testMode: true, message: 'Test publicatie geslaagd - geen echte Indeed API call' },
      }
    }

    return {
      success: false,
      errors: ['Indeed API credentials niet geconfigureerd'],
      rawResponse: { error: 'CONFIGURATION_REQUIRED' },
    }
  }

  async update(vacancy: VacancyWithRelations, publication: VacancyPublication): Promise<JobBoardPublicationResult> {
    return this.publish(vacancy, publication)
  }

  async close(_publication: VacancyPublication): Promise<void> {
    // Would call Indeed API to close job
  }

  async status(publication: VacancyPublication): Promise<JobBoardPublicationStatus> {
    if (publication.mode === 'TEST') {
      return { status: 'GETEST', externalJobId: publication.externalJobId ?? undefined }
    }
    return { status: publication.status, externalJobId: publication.externalJobId ?? undefined }
  }
}

/**
 * Boards zonder publieke push-API voor losse werkgevers: ze halen vacatures zelf op uit
 * onze gedeelde jobfeed zodra die eenmalig bij ze is aangemeld. Zie FeedJobBoardConnector
 * en /admin/publicaties voor de feed-URL en aanmeldinstructies per board.
 */
const feedBoards: [JobBoardChannel, string, string][] = [
  ['WERKZOEKEN_NL', 'Werkzoeken.nl', 'W'],
  ['JOBBIRD', 'Jobbird', 'J'],
  ['NATIONALE_VACATUREBANK', 'Nationale Vacaturebank', 'N'],
  ['TOPVACATUREBANK', 'TopVacaturebank', 'T'],
  ['JOBER', 'Jober', 'J'],
  ['JOBSONLINE', 'Jobsonline', 'J'],
  ['TWENTY4WERK', '24werk', '24'],
  ['NUBANEN', 'NuBanen', 'N'],
  ['JOOF', 'Joof', 'J'],
  ['MONSTERBOARD', 'Monsterboard', 'M'],
  ['JOOBLE', 'Jooble', 'J'],
]

export function registerAllConnectors() {
  JobBoardConnectorRegistry.register(new EigenWebsiteConnector())
  JobBoardConnectorRegistry.register(new GoogleForJobsConnector())
  JobBoardConnectorRegistry.register(new LinkedInConnector())
  JobBoardConnectorRegistry.register(new IndeedConnector())
  for (const [key, name, logo] of feedBoards) {
    JobBoardConnectorRegistry.register(new FeedJobBoardConnector(key, name, logo))
  }
}

registerAllConnectors()