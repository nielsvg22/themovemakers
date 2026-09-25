import { JobBoardChannel, JobBoardConnector, JobBoardValidationResult, JobBoardDryRunResult, JobBoardPublicationResult, JobBoardPublicationStatus, VacancyWithRelations, VacancyPublication } from '@/types'

export abstract class BaseJobBoardConnector implements JobBoardConnector {
  abstract key: JobBoardChannel
  abstract name: string
  abstract logo: string
  abstract description: string

  protected abstract getRequiredFields(): string[]

  async validate(vacancy: VacancyWithRelations): Promise<JobBoardValidationResult> {
    const errors: string[] = []
    const warnings: string[] = []
    const requiredFields = this.getRequiredFields()

    for (const field of requiredFields) {
      const value = this.getFieldValue(vacancy, field)
      if (!value) {
        errors.push(`Veld "${field}" is verplicht voor ${this.name}`)
      }
    }

    if (vacancy.salaryMin === null && vacancy.salaryMax === null) {
      warnings.push('Geen salaris opgegeven - sommige jobboards vereisen dit')
    }

    if (!vacancy.description || vacancy.description.length < 100) {
      warnings.push('Vacaturetekst is erg kort - overweeg meer detail toe te voegen')
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      requiredFields,
    }
  }

  async dryRun(vacancy: VacancyWithRelations): Promise<JobBoardDryRunResult> {
    const validation = await this.validate(vacancy)
    const payload = this.buildPayload(vacancy)

    return {
      valid: validation.valid,
      payload,
      errors: validation.errors,
      warnings: validation.warnings,
    }
  }

  abstract publish(vacancy: VacancyWithRelations, publication: VacancyPublication): Promise<JobBoardPublicationResult>
  abstract update(vacancy: VacancyWithRelations, publication: VacancyPublication): Promise<JobBoardPublicationResult>
  abstract close(publication: VacancyPublication): Promise<void>
  abstract status(publication: VacancyPublication): Promise<JobBoardPublicationStatus>

  protected getFieldValue(vacancy: VacancyWithRelations, field: string): unknown {
    const fieldMap: Record<string, unknown> = {
      title: vacancy.title,
      company: vacancy.company.name,
      location: vacancy.location,
      description: vacancy.description,
      salaryMin: vacancy.salaryMin,
      salaryMax: vacancy.salaryMax,
      contractType: vacancy.contractType,
      workMode: vacancy.workMode,
      hoursMin: vacancy.hoursMin,
      hoursMax: vacancy.hoursMax,
    }
    return fieldMap[field]
  }

  protected abstract buildPayload(vacancy: VacancyWithRelations): Record<string, unknown>
}

export class JobBoardConnectorRegistry {
  private static connectors: Map<JobBoardChannel, JobBoardConnector> = new Map()

  static register(connector: JobBoardConnector) {
    this.connectors.set(connector.key, connector)
  }

  static get(key: JobBoardChannel): JobBoardConnector | undefined {
    return this.connectors.get(key)
  }

  static getAll(): JobBoardConnector[] {
    return Array.from(this.connectors.values())
  }

  static getConnected(): JobBoardConnector[] {
    return Array.from(this.connectors.values()).filter(c => c.key !== 'EIGEN_WEBSITE' && c.key !== 'GOOGLE_FOR_JOBS')
  }
}