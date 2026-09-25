'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db/prisma'

export type FormState = { ok: boolean; message?: string; errors?: Record<string, string> } | null

const MAX_CV_BYTES = 4 * 1024 * 1024
const CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const text = (max = 200) => z.string().trim().max(max)
const required = (label: string, max = 200) => text(max).min(1, `${label} is verplicht`)
const optional = (max = 200) =>
  text(max)
    .optional()
    .transform((v) => (v ? v : undefined))

const candidateBase = {
  firstName: required('Voornaam', 80),
  lastName: required('Achternaam', 80),
  email: z.string().trim().toLowerCase().email('Vul een geldig e-mailadres in'),
  phone: optional(40),
  city: optional(80),
  sector: optional(80),
  currentRole: optional(120),
  desiredRole: optional(120),
  yearsExperience: optional(40),
  linkedin: optional(300),
  availability: optional(80),
  motivation: optional(2000),
  callPreference: optional(200),
  vacancySlug: optional(200),
}

function fieldErrors(error: z.ZodError) {
  const errors: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    errors[key] ??= issue.message
  }
  return errors
}

function formObject(formData: FormData) {
  const obj: Record<string, string> = {}
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') obj[key] = value
  }
  return obj
}

/** Honeypot: bots vullen het verborgen veld "website" in. */
const isBot = (formData: FormData) => Boolean(formData.get('website'))

async function readCv(formData: FormData, requiredCv: boolean): Promise<{ file?: File; error?: string }> {
  const file = formData.get('cv')
  if (!(file instanceof File) || file.size === 0) {
    return requiredCv ? { error: 'Voeg je cv toe (pdf of Word)' } : {}
  }
  if (file.size > MAX_CV_BYTES) return { error: 'Je cv mag maximaal 4 MB zijn' }
  const ok = CV_TYPES.includes(file.type) || /\.(pdf|docx?)$/i.test(file.name)
  if (!ok) return { error: 'Upload je cv als pdf of Word-bestand' }
  return { file }
}

type Source = 'cv_check' | 'kennismaking' | 'open_sollicitatie' | 'sollicitatie'

const sourceLabel: Record<Source, string> = {
  cv_check: 'CV-check',
  kennismaking: 'Korte kennismaking',
  open_sollicitatie: 'Open sollicitatie',
  sollicitatie: 'Sollicitatie',
}

/**
 * Slaat een kandidaat op (of werkt een bestaande bij op e-mailadres), zet het profiel op
 * "Te beoordelen" en koppelt het cv. Alles komt eerst in de beoordelingsinbox van de admin,
 * zodat de recruiter zelf bepaalt wie een kennismaking krijgt.
 */
async function saveCandidate(formData: FormData, source: Source, opts: { requireCv: boolean; requirePhone?: boolean }) {
  if (isBot(formData)) return { ok: true } as FormState

  const parsed = z.object(candidateBase).safeParse(formObject(formData))
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) }
  const data = parsed.data

  const errors: Record<string, string> = {}
  if (opts.requirePhone && !data.phone) errors.phone = 'Telefoonnummer is verplicht'
  const cv = await readCv(formData, opts.requireCv)
  if (cv.error) errors.cv = cv.error
  if (Object.keys(errors).length) return { ok: false, errors }

  const vacancy = data.vacancySlug
    ? await prisma.vacancy.findUnique({ where: { slug: data.vacancySlug }, select: { id: true, title: true } })
    : null
  if (source === 'sollicitatie' && !vacancy) return { ok: false, message: 'Deze vacature is niet meer beschikbaar.' }

  const now = new Date()
  const fields = {
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    city: data.city,
    region: data.city,
    sector: data.sector,
    currentRole: data.currentRole,
    desiredRole: data.desiredRole ?? vacancy?.title,
    yearsExperience: data.yearsExperience,
    linkedin: data.linkedin,
    availability: data.availability,
    motivation: data.motivation,
    callPreference: data.callPreference,
    source,
    profileStatus: 'TE_BEOORDELEN' as const,
    lastSubmittedAt: now,
    gdprConsent: true,
    gdprConsentAt: now,
  }

  const candidate = await prisma.candidate.upsert({
    where: { email: data.email },
    create: { email: data.email, ...fields },
    update: Object.fromEntries(Object.entries(fields).filter(([, v]) => v !== undefined)),
  })

  if (cv.file) {
    await prisma.cvFile.create({
      data: {
        candidateId: candidate.id,
        fileName: cv.file.name.slice(0, 200),
        mimeType: cv.file.type || 'application/octet-stream',
        size: cv.file.size,
        data: Buffer.from(await cv.file.arrayBuffer()),
      },
    })
  }

  let applicationId: string | undefined
  if (vacancy) {
    const existing = await prisma.application.findFirst({ where: { candidateId: candidate.id, vacancyId: vacancy.id } })
    applicationId = existing?.id
    if (!existing) {
      const application = await prisma.application.create({
        data: { candidateId: candidate.id, vacancyId: vacancy.id, source, coverLetter: data.motivation, availability: data.availability },
      })
      applicationId = application.id
    }
  }

  await prisma.activity.create({
    data: {
      type: source,
      description: `${sourceLabel[source]}: ${data.firstName} ${data.lastName}${vacancy ? ` (${vacancy.title})` : ''}`,
      candidateId: candidate.id,
      vacancyId: vacancy?.id,
      applicationId,
    },
  })

  revalidatePath('/admin', 'layout')
  return { ok: true } as FormState
}

export async function submitCvCheck(_: FormState, formData: FormData): Promise<FormState> {
  return saveCandidate(formData, 'cv_check', { requireCv: true, requirePhone: true })
}

export async function requestKennismaking(_: FormState, formData: FormData): Promise<FormState> {
  return saveCandidate(formData, 'kennismaking', { requireCv: false, requirePhone: true })
}

export async function submitOpenSollicitatie(_: FormState, formData: FormData): Promise<FormState> {
  return saveCandidate(formData, 'open_sollicitatie', { requireCv: true })
}

export async function applyToVacancy(_: FormState, formData: FormData): Promise<FormState> {
  return saveCandidate(formData, 'sollicitatie', { requireCv: true, requirePhone: true })
}

const leadSchema = z.object({
  name: required('Naam', 120),
  email: z.string().trim().toLowerCase().email('Vul een geldig e-mailadres in'),
  phone: optional(40),
  companyName: optional(120),
  vacancyTitle: optional(120),
  location: optional(120),
  challenge: optional(2000),
})

async function saveLead(formData: FormData, type: 'RECRUITMENT_SCAN' | 'CONTACT'): Promise<FormState> {
  if (isBot(formData)) return { ok: true }
  const parsed = leadSchema.safeParse(formObject(formData))
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) }
  const { name, ...rest } = parsed.data
  const [firstName, ...last] = name.split(/\s+/)
  await prisma.lead.create({ data: { type, firstName, lastName: last.join(' ') || '-', ...rest } })
  revalidatePath('/admin', 'layout')
  return { ok: true }
}

export async function submitRecruitmentScan(_: FormState, formData: FormData): Promise<FormState> {
  return saveLead(formData, 'RECRUITMENT_SCAN')
}

export async function submitContact(_: FormState, formData: FormData): Promise<FormState> {
  return saveLead(formData, 'CONTACT')
}

export async function subscribeJobAlert(_: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { ok: true }
  const parsed = z
    .object({ email: z.string().trim().toLowerCase().email('Vul een geldig e-mailadres in'), sector: optional(80) })
    .safeParse(formObject(formData))
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) }
  const sector = parsed.data.sector ? await prisma.sector.findFirst({ where: { name: parsed.data.sector } }) : null
  await prisma.jobAlert.create({ data: { email: parsed.data.email, sectorId: sector?.id } })
  return { ok: true }
}
