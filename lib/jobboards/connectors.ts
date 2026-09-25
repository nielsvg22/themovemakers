import { JobBoardChannel, VacancyWithRelations, VacancyPublication, JobBoardValidationResult, JobBoardDryRunResult, JobBoardPublicationResult, JobBoardPublicationStatus } from '@/types'
import { BaseJobBoardConnector, JobBoardConnectorRegistry } from './base-connector'

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
      company: vacancy.company.name,
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

  async publish(vacancy: VacancyWithRelations, publication: VacancyPublication): Promise<JobBoardPublicationResult> {
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

  async close(publication: VacancyPublication): Promise<void> {
    // No-op for own website - handled by vacancy status
  }

  async status(publication: VacancyPublication): Promise<JobBoardPublicationStatus> {
    return { status: 'LIVE', externalJobId: publication.externalJobId }
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

  async publish(vacancy: VacancyWithRelations, publication: VacancyPublication): Promise<JobBoardPublicationResult> {
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

  async close(publication: VacancyPublication): Promise<void> {
    // Handled by removing structured data
  }

  async status(publication: VacancyPublication): Promise<JobBoardPublicationStatus> {
    return { status: 'ELIGIBLE', externalJobId: publication.externalJobId }
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
      companyName: vacancy.company.name,
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

  async close(publication: VacancyPublication): Promise<void> {
    // Would call LinkedIn API to close job
  }

  async status(publication: VacancyPublication): Promise<JobBoardPublicationStatus> {
    if (publication.mode === 'TEST') {
      return { status: 'GETEST', externalJobId: publication.externalJobId }
    }
    return { status: publication.status, externalJobId: publication.externalJobId }
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
      company: vacancy.company.name,
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

  async close(publication: VacancyPublication): Promise<void> {
    // Would call Indeed API to close job
  }

  async status(publication: VacancyPublication): Promise<JobBoardPublicationStatus> {
    if (publication.mode === 'TEST') {
      return { status: 'GETEST', externalJobId: publication.externalJobId }
    }
    return { status: publication.status, externalJobId: publication.externalJobId }
  }
}

export class DisconnectedConnector extends BaseJobBoardConnector {
  abstract key: JobBoardChannel
  abstract name: string
  abstract logo: string
  abstract description: string

  protected getRequiredFields(): string[] {
    return ['title', 'company', 'location', 'description']
  }

  protected buildPayload(vacancy: VacancyWithRelations): Record<string, unknown> {
    return {
      title: vacancy.title,
      company: vacancy.company.name,
      location: vacancy.location,
      description: vacancy.description,
    }
  }

  async publish(vacancy: VacancyWithRelations, publication: VacancyPublication): Promise<JobBoardPublicationResult> {
    return {
      success: false,
      errors: [`${this.name} is niet gekoppeld. Configureer eerst de API koppeling in Instellingen.`],
      rawResponse: { error: 'NOT_CONNECTED', connector: this.key },
    }
  }

  async update(vacancy: VacancyWithRelations, publication: VacancyPublication): Promise<JobBoardPublicationResult> {
    return this.publish(vacancy, publication)
  }

  async close(publication: VacancyPublication): Promise<void> {}

  async status(publication: VacancyPublication): Promise<JobBoardPublicationStatus> {
    return { status: 'NIET_GEKOPPELD', errorMessage: `${this.name} is niet gekoppeld` }
  }
}

export class NationaleVacaturebankConnector extends DisconnectedConnector {
  key = 'NATIONALE_VACATUREBANK' as JobBoardChannel
  name = 'Nationale Vacaturebank'
  logo = 'N'
  description = 'API/feed configuratie nog nodig'
}

export class JobbirdConnector extends DisconnectedConnector {
  key = 'JOBBIRD' as JobBoardChannel
  name = 'Jobbird'
  logo = 'J'
  description = 'API/feed configuratie nog nodig'
}

export class MonsterboardConnector extends DisconnectedConnector {
  key = 'MONSTERBOARD' as JobBoardChannel
  name = 'Monsterboard'
  logo = 'M'
  description = 'API/feed configuratie nog nodig'
}

export class WerkzoekenConnector extends DisconnectedConnector {
  key = 'WERKZOEKEN_NL' as JobBoardChannel
  name = 'Werkzoeken.nl'
  logo = 'W'
  description = 'API/feed configuratie nog nodig'
}

export class JoobleConnector extends DisconnectedConnector {
  key = 'JOOBLE' as JobBoardChannel
  name = 'Jooble'
  logo = 'J'
  description = 'API/feed configuratie nog nodig'
}

export function registerAllConnectors() {
  JobBoardConnectorRegistry.register(new EigenWebsiteConnector())
  JobBoardConnectorRegistry.register(new GoogleForJobsConnector())
  JobBoardConnectorRegistry.register(new LinkedInConnector())
  JobBoardConnectorRegistry.register(new IndeedConnector())
  JobBoardConnectorRegistry.register(new NationaleVacaturebankConnector())
  JobBoardConnectorRegistry.register(new JobbirdConnector())
  JobBoardConnectorRegistry.register(new MonsterboardConnector())
  JobBoardConnectorRegistry.register(new WerkzoekenConnector())
  JobBoardConnectorRegistry.register(new JoobleConnector())
}

registerAllConnectors()