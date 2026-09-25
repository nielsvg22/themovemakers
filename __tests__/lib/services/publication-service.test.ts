import { PublicationService } from '@/lib/services/publication-service'
import { prisma } from '@/lib/db/prisma'
import { JobBoardChannel, PublicationMode, VacancyStatus } from '@prisma/client'

jest.mock('@/lib/db/prisma', () => ({
  prisma: {
    vacancy: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    vacancyPublication: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
    activity: {
      create: jest.fn(),
    },
  },
}))

jest.mock('@/lib/jobboards/connectors', () => ({}))

jest.mock('@/lib/jobboards/base-connector', () => ({
  JobBoardConnectorRegistry: {
    get: jest.fn(),
  },
}))

import { JobBoardConnectorRegistry } from '@/lib/jobboards/base-connector'

describe('PublicationService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('publishVacancy', () => {
    it('publishes to multiple channels successfully', async () => {
      const mockVacancy = {
        id: 'vac-1',
        title: 'Test Vacature',
        company: { name: 'Test BV' },
        sector: { name: 'Bouw' },
      }

      const mockConnector = {
        validate: jest.fn().mockResolvedValue({ valid: true, errors: [], warnings: [] }),
        publish: jest.fn().mockResolvedValue({ success: true, externalJobId: 'EXT-123', sourceCode: 'test', errors: [] }),
      }

      ;(prisma.vacancy.findUnique as jest.Mock).mockResolvedValue(mockVacancy)
      ;(JobBoardConnectorRegistry.get as jest.Mock).mockReturnValue(mockConnector)
      ;(prisma.vacancyPublication.create as jest.Mock).mockResolvedValue({ id: 'pub-1' })
      ;(prisma.vacancyPublication.update as jest.Mock).mockResolvedValue({})
      ;(prisma.vacancy.update as jest.Mock).mockResolvedValue({})

      const results = await PublicationService.publishVacancy('vac-1', [JobBoardChannel.EIGEN_WEBSITE, JobBoardChannel.LINKEDIN], PublicationMode.TEST)

      expect(results).toHaveLength(2)
      expect(results[0].success).toBe(true)
      expect(results[1].success).toBe(true)
      expect(prisma.vacancyPublication.create).toHaveBeenCalledTimes(2)
    })

    it('handles validation errors', async () => {
      const mockVacancy = { id: 'vac-1', title: 'Test' }
      const mockConnector = {
        validate: jest.fn().mockResolvedValue({ valid: false, errors: ['Titel ontbreekt'], warnings: [] }),
      }

      ;(prisma.vacancy.findUnique as jest.Mock).mockResolvedValue(mockVacancy)
      ;(JobBoardConnectorRegistry.get as jest.Mock).mockReturnValue(mockConnector)

      const results = await PublicationService.publishVacancy('vac-1', [JobBoardChannel.EIGEN_WEBSITE], PublicationMode.TEST)

      expect(results[0].success).toBe(false)
      expect(results[0].error).toBe('Titel ontbreekt')
    })

    it('throws error when vacancy not found', async () => {
      ;(prisma.vacancy.findUnique as jest.Mock).mockResolvedValue(null)

      await expect(PublicationService.publishVacancy('vac-1', [JobBoardChannel.EIGEN_WEBSITE], PublicationMode.TEST))
        .rejects.toThrow('Vacature niet gevonden')
    })
  })

  describe('closeVacancy', () => {
    it('closes all active publications', async () => {
      const mockPublications = [
        { id: 'pub-1', channel: JobBoardChannel.EIGEN_WEBSITE, status: 'LIVE' },
        { id: 'pub-2', channel: JobBoardChannel.LINKEDIN, status: 'LIVE' },
      ]

      const mockConnector = {
        close: jest.fn().mockResolvedValue(undefined),
      }

      ;(prisma.vacancyPublication.findMany as jest.Mock).mockResolvedValue(mockPublications)
      ;(JobBoardConnectorRegistry.get as jest.Mock).mockReturnValue(mockConnector)
      ;(prisma.vacancyPublication.update as jest.Mock).mockResolvedValue({})
      ;(prisma.vacancy.update as jest.Mock).mockResolvedValue({})

      await PublicationService.closeVacancy('vac-1')

      expect(prisma.vacancyPublication.findMany).toHaveBeenCalledWith({
        where: { vacancyId: 'vac-1', status: { in: ['LIVE', 'IN_WACHTRIJ', 'ELIGIBLE'] } },
      })
      expect(mockConnector.close).toHaveBeenCalledTimes(2)
      expect(prisma.vacancy.update).toHaveBeenCalledWith({
        where: { id: 'vac-1' },
        data: { status: VacancyStatus.INGEVULD },
      })
    })

    it('handles connector errors gracefully', async () => {
      const mockPublications = [{ id: 'pub-1', channel: JobBoardChannel.LINKEDIN, status: 'LIVE' }]
      const mockConnector = {
        close: jest.fn().mockRejectedValue(new Error('API error')),
      }

      ;(prisma.vacancyPublication.findMany as jest.Mock).mockResolvedValue(mockPublications)
      ;(JobBoardConnectorRegistry.get as jest.Mock).mockReturnValue(mockConnector)
      ;(prisma.vacancyPublication.update as jest.Mock).mockResolvedValue({})
      ;(prisma.vacancy.update as jest.Mock).mockResolvedValue({})

      await PublicationService.closeVacancy('vac-1')

      expect(prisma.vacancyPublication.update).toHaveBeenCalledWith({
        where: { id: 'pub-1' },
        data: { errorMessage: 'API error' },
      })
    })
  })

  describe('validateForChannel', () => {
    it('returns validation result from connector', async () => {
      const mockVacancy = { id: 'vac-1' }
      const mockValidation = { valid: true, errors: [], warnings: [], requiredFields: [] }
      const mockConnector = { validate: jest.fn().mockResolvedValue(mockValidation) }

      ;(prisma.vacancy.findUnique as jest.Mock).mockResolvedValue(mockVacancy)
      ;(JobBoardConnectorRegistry.get as jest.Mock).mockReturnValue(mockConnector)

      const result = await PublicationService.validateForChannel('vac-1', JobBoardChannel.LINKEDIN)

      expect(result).toEqual(mockValidation)
      expect(mockConnector.validate).toHaveBeenCalledWith(mockVacancy)
    })
  })

  describe('dryRunForChannel', () => {
    it('returns dry run result from connector', async () => {
      const mockVacancy = { id: 'vac-1' }
      const mockDryRun = { valid: true, payload: {}, errors: [], warnings: [] }
      const mockConnector = { dryRun: jest.fn().mockResolvedValue(mockDryRun) }

      ;(prisma.vacancy.findUnique as jest.Mock).mockResolvedValue(mockVacancy)
      ;(JobBoardConnectorRegistry.get as jest.Mock).mockReturnValue(mockConnector)

      const result = await PublicationService.dryRunForChannel('vac-1', JobBoardChannel.LINKEDIN)

      expect(result).toEqual(mockDryRun)
      expect(mockConnector.dryRun).toHaveBeenCalledWith(mockVacancy)
    })
  })
})