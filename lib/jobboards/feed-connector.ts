import { JobBoardChannel, VacancyWithRelations, VacancyPublication, JobBoardPublicationResult, JobBoardPublicationStatus } from '@/types'
import { BaseJobBoardConnector } from './base-connector'
import { jobFeedUrl } from './feed-url'

/**
 * Connector voor jobboards zonder publieke push-API: ze halen vacatures zelf op uit onze
 * gedeelde XML-jobfeed, zodra die eenmalig bij het board is aangemeld (zie /admin/publicaties).
 * "Publiceren" betekent hier: de vacature staat in de feed zodra hij actief en gepubliceerd is.
 */
export class FeedJobBoardConnector extends BaseJobBoardConnector {
  key: JobBoardChannel
  name: string
  logo: string
  description: string

  constructor(key: JobBoardChannel, name: string, logo: string) {
    super()
    this.key = key
    this.name = name
    this.logo = logo
    this.description = 'Automatisch via de gedeelde vacature-jobfeed'
  }

  protected getRequiredFields(): string[] {
    return ['title', 'company', 'location', 'description']
  }

  protected buildPayload(vacancy: VacancyWithRelations): Record<string, unknown> {
    return {
      title: vacancy.title,
      company: vacancy.company?.name ?? 'The Move Maker',
      location: vacancy.location,
      description: vacancy.description,
      feedUrl: jobFeedUrl(),
    }
  }

  async publish(vacancy: VacancyWithRelations, _publication: VacancyPublication): Promise<JobBoardPublicationResult> {
    return {
      success: true,
      externalJobId: `FEED-${this.key}-${vacancy.id.slice(0, 8)}`,
      sourceCode: 'jobfeed',
      url: jobFeedUrl(),
      errors: [],
      rawResponse: { note: `${this.name} haalt vacatures op uit de aangemelde feed; geen directe API-call per vacature.` },
    }
  }

  async update(vacancy: VacancyWithRelations, publication: VacancyPublication): Promise<JobBoardPublicationResult> {
    return this.publish(vacancy, publication)
  }

  async close(_publication: VacancyPublication): Promise<void> {
    // De feed bevat alleen actieve vacatures; zodra de vacature niet meer actief is, verdwijnt hij vanzelf uit de feed.
  }

  async status(publication: VacancyPublication): Promise<JobBoardPublicationStatus> {
    return { status: 'ELIGIBLE', externalJobId: publication.externalJobId ?? undefined, url: jobFeedUrl() }
  }
}
