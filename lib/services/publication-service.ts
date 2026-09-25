import { prisma } from '@/lib/db/prisma'
import { JobBoardConnectorRegistry } from '@/lib/jobboards/base-connector'
import { JobBoardChannel, PublicationMode, PublicationStatus, VacancyStatus } from '@prisma/client'
import { VacancyWithRelations } from '@/types'

export class PublicationService {
  static async publishVacancy(
    vacancyId: string,
    channels: JobBoardChannel[],
    mode: PublicationMode = 'TEST',
    scheduledAt?: Date
  ) {
    const vacancy = await prisma.vacancy.findUnique({
      where: { id: vacancyId },
      include: {
        company: true,
        sector: true,
        recruiter: { include: { user: true } },
      },
    })

    if (!vacancy) {
      throw new Error('Vacature niet gevonden')
    }

    const results = await Promise.all(
      channels.map(async (channel) => {
        const connector = JobBoardConnectorRegistry.get(channel)
        if (!connector) {
          return { channel, success: false, error: 'Connector niet gevonden' }
        }

        const validation = await connector.validate(vacancy as VacancyWithRelations)
        if (!validation.valid) {
          return { channel, success: false, error: validation.errors.join(', ') }
        }

        const publication = await prisma.vacancyPublication.create({
          data: {
            vacancyId,
            channel,
            mode,
            status: 'IN_WACHTRIJ',
            scheduledAt,
          },
        })

        try {
          const result = await connector.publish(vacancy as VacancyWithRelations, publication)

          await prisma.vacancyPublication.update({
            where: { id: publication.id },
            data: {
              status: result.success ? 'LIVE' : 'FOUD',
              externalJobId: result.externalJobId,
              sourceCode: result.sourceCode,
              publishedAt: result.success ? new Date() : null,
              errorMessage: result.errors.join(', ') || null,
              rawResponse: result.rawResponse as any,
            },
          })

          if (result.success && mode === 'PRODUCTIE') {
            await prisma.vacancy.update({
              where: { id: vacancyId },
              data: { status: 'ACTIEF', publishedAt: new Date() },
            })
          }

          return { channel, success: result.success, externalJobId: result.externalJobId, error: result.errors.join(', ') }
        } catch (error) {
          await prisma.vacancyPublication.update({
            where: { id: publication.id },
            data: {
              status: 'FOUD',
              errorMessage: error instanceof Error ? error.message : 'Onbekende fout',
            },
          })
          return { channel, success: false, error: error instanceof Error ? error.message : 'Onbekende fout' }
        }
      })
    )

    return results
  }

  static async closeVacancy(vacancyId: string) {
    const publications = await prisma.vacancyPublication.findMany({
      where: { vacancyId, status: { in: ['LIVE', 'IN_WACHTRIJ', 'ELIGIBLE'] } },
    })

    for (const publication of publications) {
      const connector = JobBoardConnectorRegistry.get(publication.channel)
      if (connector) {
        try {
          await connector.close(publication)
          await prisma.vacancyPublication.update({
            where: { id: publication.id },
            data: { status: 'INGETROKKEN' },
          })
        } catch (error) {
          await prisma.vacancyPublication.update({
            where: { id: publication.id },
            data: { errorMessage: error instanceof Error ? error.message : 'Fout bij intrekken' },
          })
        }
      }
    }

    await prisma.vacancy.update({
      where: { id: vacancyId },
      data: { status: 'INGEVULD' },
    })
  }

  static async syncPublicationStatus(publicationId: string) {
    const publication = await prisma.vacancyPublication.findUnique({
      where: { id: publicationId },
      include: { vacancy: { include: { company: true, sector: true, recruiter: { include: { user: true } } } } },
    })

    if (!publication) return

    const connector = JobBoardConnectorRegistry.get(publication.channel)
    if (!connector) return

    try {
      const status = await connector.status(publication)
      await prisma.vacancyPublication.update({
        where: { id: publicationId },
        data: {
          status: status.status,
          lastSyncedAt: new Date(),
          errorMessage: status.errorMessage,
        },
      })
    } catch (error) {
      await prisma.vacancyPublication.update({
        where: { id: publicationId },
        data: { errorMessage: error instanceof Error ? error.message : 'Sync fout' },
      })
    }
  }

  static async validateForChannel(vacancyId: string, channel: JobBoardChannel) {
    const vacancy = await prisma.vacancy.findUnique({
      where: { id: vacancyId },
      include: { company: true, sector: true, recruiter: { include: { user: true } } },
    })

    if (!vacancy) throw new Error('Vacature niet gevonden')

    const connector = JobBoardConnectorRegistry.get(channel)
    if (!connector) throw new Error('Connector niet gevonden')

    return connector.validate(vacancy as VacancyWithRelations)
  }

  static async dryRunForChannel(vacancyId: string, channel: JobBoardChannel) {
    const vacancy = await prisma.vacancy.findUnique({
      where: { id: vacancyId },
      include: { company: true, sector: true, recruiter: { include: { user: true } } },
    })

    if (!vacancy) throw new Error('Vacature niet gevonden')

    const connector = JobBoardConnectorRegistry.get(channel)
    if (!connector) throw new Error('Connector niet gevonden')

    return connector.dryRun(vacancy as VacancyWithRelations)
  }
}