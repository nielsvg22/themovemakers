import { EigenWebsiteConnector, GoogleForJobsConnector, LinkedInConnector, IndeedConnector } from '@/lib/jobboards/connectors'
import { FeedJobBoardConnector } from '@/lib/jobboards/feed-connector'
import { JobBoardConnectorRegistry } from '@/lib/jobboards/base-connector'
import { JobBoardChannel, VacancyStatus, ContractType, WorkMode, type VacancyPublication } from '@prisma/client'

const mockVacancy = {
  id: 'test-vacancy-1',
  title: 'Uitvoerder Bouw',
  slug: 'uitvoerder-bouw-utrecht',
  company: { id: '1', name: 'BAM', logo: null },
  sector: { id: '1', name: 'Bouw', slug: 'bouw' },
  recruiter: { id: '1', user: { name: 'Mark de Jong', image: null }, title: 'Recruiter Bouw' },
  location: 'Utrecht, Nederland',
  city: 'Utrecht',
  hoursMin: 32,
  hoursMax: 40,
  contractType: ContractType.VAST,
  workMode: WorkMode.HYBRIDE,
  salaryMin: 4000,
  salaryMax: 5500,
  salaryPeriod: 'maand',
  status: VacancyStatus.ACTIEF,
  publishedAt: new Date(),
  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  description: 'Als Uitvoerder Bouw ben jij verantwoordelijk voor de dagelijkse aansturing op de bouwplaats. Je bewaakt planning, kwaliteit en veiligheid en bent het centrale aanspreekpunt voor vaklieden, onderaannemers en projectleiding.',
  responsibilities: 'Aansturen van teams en onderaannemers.\nBewaken van planning, veiligheid en kwaliteit.\nAfstemmen met werkvoorbereiding en projectleiding.\nSignaleren en oplossen van knelpunten.',
  requirements: 'Ervaring als uitvoerder binnen woning- of utiliteitsbouw.\nEen praktische en communicatief sterke werkstijl.\nVeiligheid en kwaliteit staan voor jou voorop.',
  benefits: 'Een verantwoordelijke functie met veel vrijheid, goede arbeidsvoorwaarden en ruimte om jezelf verder te ontwikkelen.',
  companyInfo: 'BAM is een toonaangevend bouw- en infrabedrijf.',
  applicationProcess: 'Kennismakingsgesprek → Technisch gesprek → Voorstel',
  metaTitle: 'Uitvoerder Bouw | BAM Utrecht',
  metaDescription: 'Solliciteer als Uitvoerder Bouw bij BAM in Utrecht.',
  _count: { applications: 5, publications: 2 },
}

describe('JobBoard Connectors', () => {
  describe('EigenWebsiteConnector', () => {
    const connector = new EigenWebsiteConnector()

    it('has correct key and name', () => {
      expect(connector.key).toBe(JobBoardChannel.EIGEN_WEBSITE)
      expect(connector.name).toBe('Eigen website')
    })

    it('validates required fields', async () => {
      const result = await connector.validate(mockVacancy)
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('rejects vacancy without title', async () => {
      const vacancy = { ...mockVacancy, title: '' }
      const result = await connector.validate(vacancy)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Veld "title" is verplicht voor Eigen website')
    })

    it('builds correct payload', async () => {
      const { payload } = await connector.dryRun(mockVacancy)
      expect(payload.title).toBe('Uitvoerder Bouw')
      expect(payload.company).toBe('BAM')
      expect(payload.location).toBe('Utrecht, Nederland')
    })

    it('publishes successfully', async () => {
      const publication = { id: 'pub-1', vacancyId: 'test-vacancy-1', channel: JobBoardChannel.EIGEN_WEBSITE, mode: 'TEST', status: 'CONCEPT' }
      const result = await connector.publish(mockVacancy, publication as unknown as VacancyPublication)
      expect(result.success).toBe(true)
      expect(result.externalJobId).toBeDefined()
      expect(result.url).toContain('/vacatures/')
    })
  })

  describe('GoogleForJobsConnector', () => {
    const connector = new GoogleForJobsConnector()

    it('has correct key and name', () => {
      expect(connector.key).toBe(JobBoardChannel.GOOGLE_FOR_JOBS)
      expect(connector.name).toBe('Google for Jobs')
    })

    it('requires salary for validation', async () => {
      const vacancyNoSalary = { ...mockVacancy, salaryMin: null, salaryMax: null }
      const result = await connector.validate(vacancyNoSalary)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.includes('salaryMin') || e.includes('salaryMax'))).toBe(true)
    })

    it('builds schema.org JobPosting payload', async () => {
      const { payload } = await connector.dryRun(mockVacancy)
      expect(payload['@context']).toBe('https://schema.org')
      expect(payload['@type']).toBe('JobPosting')
      expect(payload.title).toBe('Uitvoerder Bouw')
      expect((payload.hiringOrganization as { name: string }).name).toBe('BAM')
      expect(payload.baseSalary).toBeDefined()
    })
  })

  describe('LinkedInConnector', () => {
    const connector = new LinkedInConnector()

    it('has correct key and name', () => {
      expect(connector.key).toBe(JobBoardChannel.LINKEDIN)
      expect(connector.name).toBe('LinkedIn')
    })

    it('publishes in test mode successfully', async () => {
      const publication = { id: 'pub-1', vacancyId: 'test-vacancy-1', channel: JobBoardChannel.LINKEDIN, mode: 'TEST', status: 'CONCEPT' }
      const result = await connector.publish(mockVacancy, publication as unknown as VacancyPublication)
      expect(result.success).toBe(true)
      expect(result.rawResponse?.testMode).toBe(true)
    })

    it('fails in production mode without credentials', async () => {
      const publication = { id: 'pub-1', vacancyId: 'test-vacancy-1', channel: JobBoardChannel.LINKEDIN, mode: 'PRODUCTIE', status: 'CONCEPT' }
      const result = await connector.publish(mockVacancy, publication as unknown as VacancyPublication)
      expect(result.success).toBe(false)
      expect(result.errors).toContain('LinkedIn API credentials niet geconfigureerd')
    })
  })

  describe('IndeedConnector', () => {
    const connector = new IndeedConnector()

    it('has correct key and name', () => {
      expect(connector.key).toBe(JobBoardChannel.INDEED)
      expect(connector.name).toBe('Indeed')
    })

    it('publishes in test mode successfully', async () => {
      const publication = { id: 'pub-1', vacancyId: 'test-vacancy-1', channel: JobBoardChannel.INDEED, mode: 'TEST', status: 'CONCEPT' }
      const result = await connector.publish(mockVacancy, publication as unknown as VacancyPublication)
      expect(result.success).toBe(true)
      expect(result.rawResponse?.testMode).toBe(true)
    })
  })

  describe('FeedJobBoardConnector (Nationale Vacaturebank)', () => {
    const connector = new FeedJobBoardConnector(JobBoardChannel.NATIONALE_VACATUREBANK, 'Nationale Vacaturebank', 'N')

    it('has correct key and name', () => {
      expect(connector.key).toBe(JobBoardChannel.NATIONALE_VACATUREBANK)
      expect(connector.name).toBe('Nationale Vacaturebank')
    })

    it('publishes successfully via the shared jobfeed', async () => {
      const publication = { id: 'pub-1', vacancyId: 'test-vacancy-1', channel: JobBoardChannel.NATIONALE_VACATUREBANK, mode: 'TEST', status: 'CONCEPT' }
      const result = await connector.publish(mockVacancy, publication as unknown as VacancyPublication)
      expect(result.success).toBe(true)
      expect(result.url).toContain('/api/jobfeeds/vacatures.xml')
    })
  })
})
describe('JobBoardConnectorRegistry', () => {
  it('registers all connectors when the connectors module is loaded', () => {
    expect(JobBoardConnectorRegistry.get(JobBoardChannel.EIGEN_WEBSITE)).toBeInstanceOf(EigenWebsiteConnector)
    expect(JobBoardConnectorRegistry.get(JobBoardChannel.LINKEDIN)).toBeInstanceOf(LinkedInConnector)
    expect(JobBoardConnectorRegistry.get(JobBoardChannel.NATIONALE_VACATUREBANK)).toBeInstanceOf(FeedJobBoardConnector)
    expect(JobBoardConnectorRegistry.getAll()).toHaveLength(15)
  })
})
