import 'server-only'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import type { Job } from './site'

const contractLabels: Record<string, string> = {
  VAST: 'Vast',
  TIJDELIJK: 'Tijdelijk',
  DETACHERING: 'Detachering',
  FREELANCE: 'Freelance',
  STAGE: 'Stage',
}

const fallbackImage = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80'

const publicInclude = { company: true, sector: true } satisfies Prisma.VacancyInclude
type VacancyRow = Prisma.VacancyGetPayload<{ include: typeof publicInclude }>

const euro = (n: number) => `€ ${n.toLocaleString('nl-NL')}`

export function salaryLabel(min: number | null, max: number | null) {
  if (min && max) return `${euro(min)} - ${euro(max)}`
  if (min) return `Vanaf ${euro(min)}`
  if (max) return `Tot ${euro(max)}`
  return 'Marktconform'
}

export function hoursLabel(min: number | null, max: number | null) {
  if (min && max) return min === max ? `${min} uur` : `${min} - ${max} uur`
  if (min || max) return `${min ?? max} uur`
  return 'In overleg'
}

export function toJob(v: VacancyRow): Job {
  return {
    id: v.id,
    slug: v.slug,
    title: v.title,
    company: v.company.name,
    city: v.city ?? v.location,
    salary: salaryLabel(v.salaryMin, v.salaryMax),
    hours: hoursLabel(v.hoursMin, v.hoursMax),
    type: contractLabels[v.contractType] ?? v.contractType,
    sector: v.sector.name,
    img: v.image || v.sector.image || fallbackImage,
  }
}

/** Alleen actieve, gepubliceerde en niet-verlopen vacatures zijn publiek. */
const publicWhere = (): Prisma.VacancyWhereInput => ({
  status: 'ACTIEF',
  publishedAt: { not: null, lte: new Date() },
  OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }],
})

export async function getPublicJobs(sectorName?: string) {
  const rows = await prisma.vacancy.findMany({
    where: { ...publicWhere(), ...(sectorName ? { sector: { name: sectorName } } : {}) },
    include: publicInclude,
    orderBy: { publishedAt: 'desc' },
  })
  return rows.map(toJob)
}

export async function getPublicJob(slug: string) {
  const v = await prisma.vacancy.findFirst({ where: { ...publicWhere(), slug }, include: publicInclude })
  if (!v) return null
  const lines = (text: string | null) => (text ?? '').split('\n').map((l) => l.trim()).filter(Boolean)
  return {
    ...toJob(v),
    description: v.description,
    responsibilities: lines(v.responsibilities),
    requirements: lines(v.requirements),
    benefits: v.benefits,
    companyInfo: v.companyInfo || v.company.description,
  }
}

/** Aantal publieke vacatures per sectornaam, plus totaal onder "Alle". */
export async function getSectorCounts() {
  const [sectors, total] = await Promise.all([
    prisma.sector.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      select: { name: true, _count: { select: { vacancies: { where: publicWhere() } } } },
    }),
    prisma.vacancy.count({ where: publicWhere() }),
  ])
  const counts: Record<string, number> = { Alle: total }
  for (const s of sectors) counts[s.name] = s._count.vacancies
  return { counts, sectors: sectors.map((s) => s.name) }
}
