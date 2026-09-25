'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { ApplicationStatus, JobBoardChannel, ProfileStatus, VacancyStatus } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import { requireStaffSession } from '@/lib/auth/session'
import { profileStatusLabel, profileStatuses } from '@/lib/admin/labels'
import { generateSlug } from '@/lib/utils'
import { PublicationService } from '@/lib/services/publication-service'

const refresh = () => revalidatePath('/', 'layout')

/** "2026-09-26T10:00" uit een datetime-local veld interpreteren als Nederlandse tijd. */
function parseAmsterdam(local: string) {
  const asUtc = new Date(`${local}:00Z`)
  if (Number.isNaN(asUtc.getTime())) return null
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Amsterdam', hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
  }).formatToParts(asUtc)
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value)
  const shown = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'))
  return new Date(asUtc.getTime() - (shown - asUtc.getTime()))
}

export async function setProfileStatus(candidateId: string, status: ProfileStatus) {
  const session = await requireStaffSession()
  if (!profileStatuses.includes(status)) throw new Error('Onbekende status')
  const candidate = await prisma.candidate.update({ where: { id: candidateId }, data: { profileStatus: status } })
  await prisma.activity.create({
    data: {
      type: 'status',
      description: `${session.user.name ?? 'Recruiter'} zette ${candidate.firstName} ${candidate.lastName} op "${profileStatusLabel[status]}"`,
      candidateId,
      userId: session.user.id,
    },
  })
  refresh()
}

export type ActionState = { ok: boolean; message?: string } | null

export async function planKennismaking(_: ActionState, formData: FormData): Promise<ActionState> {
  const session = await requireStaffSession()
  const candidateId = String(formData.get('candidateId') ?? '')
  const start = parseAmsterdam(String(formData.get('startTime') ?? ''))
  const note = String(formData.get('note') ?? '').slice(0, 1000)
  if (!start) return { ok: false, message: 'Kies een datum en tijd.' }

  const candidate = await prisma.candidate.findUnique({ where: { id: candidateId } })
  if (!candidate) return { ok: false, message: 'Kandidaat niet gevonden.' }

  await prisma.$transaction([
    prisma.appointment.create({
      data: {
        title: `Korte kennismaking – ${candidate.firstName} ${candidate.lastName}`,
        description: note || 'Telefonische kennismaking van 15 minuten: achtergrond, wensen en match.',
        type: 'KANDIDATEN_GESPREK',
        startTime: start,
        endTime: new Date(start.getTime() + 15 * 60000),
        location: candidate.phone ? `Telefonisch (${candidate.phone})` : 'Telefonisch',
        ownerId: session.user.id,
        candidateId,
      },
    }),
    prisma.candidate.update({ where: { id: candidateId }, data: { profileStatus: 'KENNISMAKING_GEPLAND' } }),
    prisma.activity.create({
      data: {
        type: 'kennismaking',
        description: `Korte kennismaking gepland met ${candidate.firstName} ${candidate.lastName}`,
        candidateId,
        userId: session.user.id,
      },
    }),
  ])
  refresh()
  return { ok: true }
}

export async function addCandidateNote(_: ActionState, formData: FormData): Promise<ActionState> {
  const session = await requireStaffSession()
  const candidateId = String(formData.get('candidateId') ?? '')
  const content = String(formData.get('content') ?? '').trim().slice(0, 4000)
  if (!content) return { ok: false, message: 'Schrijf eerst een notitie.' }
  await prisma.note.create({ data: { content, candidateId, authorId: session.user.id } })
  refresh()
  return { ok: true }
}

export async function updateApplicationStatus(applicationId: string, status: ApplicationStatus) {
  await requireStaffSession()
  const now = new Date()
  const stamp: Partial<Record<ApplicationStatus, string>> = {
    SCREENING: 'screeningAt', GESPREK: 'interviewAt', VOORGESTELD: 'proposedAt', AANBOD: 'offeredAt', GEPLAATST: 'placedAt', AFGEWEZEN: 'rejectedAt',
  }
  const field = stamp[status]
  await prisma.application.update({ where: { id: applicationId }, data: { status, ...(field ? { [field]: now } : {}) } })
  refresh()
}

const vacancySchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(2, 'Functietitel is verplicht').max(150),
  companyId: z.string().optional(),
  newCompany: z.string().trim().max(120).optional(),
  sectorId: z.string().min(1, 'Kies een vakgebied'),
  city: z.string().trim().min(1, 'Locatie is verplicht').max(120),
  hoursMin: z.coerce.number().int().min(0).max(60).optional(),
  hoursMax: z.coerce.number().int().min(0).max(60).optional(),
  contractType: z.enum(['VAST', 'TIJDELIJK', 'DETACHERING', 'FREELANCE', 'STAGE']),
  salaryMin: z.coerce.number().int().min(0).max(100000).optional(),
  salaryMax: z.coerce.number().int().min(0).max(100000).optional(),
  description: z.string().trim().min(20, 'Schrijf een intro van minimaal 20 tekens').max(5000),
  responsibilities: z.string().trim().max(5000).optional(),
  requirements: z.string().trim().max(5000).optional(),
  benefits: z.string().trim().max(3000).optional(),
  image: z.string().trim().url().optional().or(z.literal('')),
  intent: z.enum(['concept', 'publish']),
})

export type VacancyFormState = { ok: boolean; message?: string; errors?: Record<string, string> } | null

export async function saveVacancy(_: VacancyFormState, formData: FormData): Promise<VacancyFormState> {
  await requireStaffSession()
  const raw = Object.fromEntries(Array.from(formData.entries()).filter(([, v]) => typeof v === 'string' && v !== '')) as Record<string, string>
  const parsed = vacancySchema.safeParse(raw)
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const i of parsed.error.issues) errors[String(i.path[0])] ??= i.message
    return { ok: false, errors }
  }
  const d = parsed.data

  let companyId = d.companyId
  if (!companyId && d.newCompany) {
    const slug = generateSlug(d.newCompany)
    companyId = (await prisma.company.upsert({ where: { slug }, update: {}, create: { name: d.newCompany, slug } })).id
  }
  if (!companyId) return { ok: false, errors: { companyId: 'Kies een bedrijf of vul een nieuwe naam in' } }

  const data = {
    title: d.title,
    companyId,
    sectorId: d.sectorId,
    location: d.city,
    city: d.city,
    hoursMin: d.hoursMin ?? null,
    hoursMax: d.hoursMax ?? null,
    contractType: d.contractType,
    salaryMin: d.salaryMin ?? null,
    salaryMax: d.salaryMax ?? null,
    description: d.description,
    responsibilities: d.responsibilities ?? null,
    requirements: d.requirements ?? null,
    benefits: d.benefits ?? null,
    image: d.image || null,
  }
  const publish = d.intent === 'publish'
  const statusData = publish
    ? { status: 'ACTIEF' as const, publishedAt: new Date(), expiresAt: new Date(Date.now() + 60 * 86400000) }
    : {}

  let id = d.id
  if (id) {
    await prisma.vacancy.update({ where: { id }, data: { ...data, ...statusData } })
  } else {
    const base = generateSlug(`${d.title} ${d.city}`)
    let slug = base
    for (let n = 2; await prisma.vacancy.findUnique({ where: { slug } }); n++) slug = `${base}-${n}`
    id = (await prisma.vacancy.create({ data: { ...data, slug, status: 'CONCEPT', ...statusData } })).id
  }

  if (publish) {
    // Registreer de publicatie op de eigen website (en Google for Jobs via structured data).
    await PublicationService.publishVacancy(id, ['EIGEN_WEBSITE', 'GOOGLE_FOR_JOBS'], 'PRODUCTIE').catch(() => null)
  }
  refresh()
  redirect(`/admin/vacatures?opgeslagen=${publish ? 'gepubliceerd' : 'concept'}`)
}

export async function setVacancyStatus(id: string, status: VacancyStatus) {
  await requireStaffSession()
  await prisma.vacancy.update({
    where: { id },
    data: { status, ...(status === 'ACTIEF' ? { publishedAt: new Date(), expiresAt: new Date(Date.now() + 60 * 86400000) } : {}) },
  })
  refresh()
}

export async function publishToChannels(vacancyId: string, channels: JobBoardChannel[]) {
  await requireStaffSession()
  const results = await PublicationService.publishVacancy(vacancyId, channels, 'TEST')
  refresh()
  return results.map((r) => ({ channel: r.channel, success: r.success, error: r.error }))
}
