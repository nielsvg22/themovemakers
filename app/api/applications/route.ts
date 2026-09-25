import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const applicationSchema = z.object({
  vacancyId: z.string().cuid(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  linkedin: z.string().url().optional().or(z.literal('')),
  cvUrl: z.string().url().optional().or(z.literal('')),
  coverLetter: z.string().optional(),
  availability: z.string().optional(),
  salaryExpectation: z.string().optional(),
  source: z.string().optional(),
  publicationId: z.string().cuid().optional(),
  gdprConsent: z.boolean().default(false),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = applicationSchema.parse(body)

    const vacancy = await prisma.vacancy.findUnique({
      where: { id: data.vacancyId, status: 'ACTIEF' },
    })

    if (!vacancy) {
      return NextResponse.json({ error: 'Vacature niet gevonden of niet actief' }, { status: 404 })
    }

    let candidate = await prisma.candidate.findUnique({
      where: { email: data.email },
    })

    if (!candidate) {
      candidate = await prisma.candidate.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          linkedin: data.linkedin || null,
          cvUrl: data.cvUrl || null,
          source: data.source || 'website',
          gdprConsent: data.gdprConsent,
          gdprConsentAt: data.gdprConsent ? new Date() : null,
        },
      })
    } else {
      await prisma.candidate.update({
        where: { id: candidate.id },
        data: {
          phone: data.phone,
          linkedin: data.linkedin || candidate.linkedin,
          cvUrl: data.cvUrl || candidate.cvUrl,
          source: data.source || candidate.source,
          gdprConsent: data.gdprConsent,
          gdprConsentAt: data.gdprConsent ? new Date() : candidate.gdprConsentAt,
        },
      })
    }

    const application = await prisma.application.create({
      data: {
        vacancyId: data.vacancyId,
        candidateId: candidate.id,
        status: 'NIEUW',
        source: data.source || 'website',
        publicationId: data.publicationId || null,
        coverLetter: data.coverLetter || null,
        cvUrl: data.cvUrl || null,
        availability: data.availability || null,
        salaryExpectation: data.salaryExpectation || null,
        appliedAt: new Date(),
      },
    })

    await prisma.activity.create({
      data: {
        type: 'APPLICATION_RECEIVED',
        description: `Nieuwe sollicitatie van ${candidate.firstName} ${candidate.lastName} op ${vacancy.title}`,
        candidateId: candidate.id,
        vacancyId: vacancy.id,
        applicationId: application.id,
        metadata: { source: data.source },
      },
    })

    return NextResponse.json({ success: true, applicationId: application.id })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validatiefout', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Solliciteren mislukt' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const vacancyId = searchParams.get('vacancyId')
  const status = searchParams.get('status')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')

  const where: any = {}
  if (vacancyId) where.vacancyId = vacancyId
  if (status) where.status = status

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where,
      include: {
        vacancy: { select: { title: true, company: { select: { name: true } } } },
        candidate: { select: { firstName: true, lastName: true, email: true, phone: true, cvUrl: true } },
        publication: { select: { channel: true, externalJobId: true } },
      },
      orderBy: { appliedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.application.count({ where }),
  ])

  return NextResponse.json({ applications, total, page, totalPages: Math.ceil(total / limit) }
  )
}