import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { VacancyList } from '@/components/admin/VacancyList'
import { hoursLabel, salaryLabel } from '@/lib/data/vacancies'

export const dynamic = 'force-dynamic'

export default async function AdminVacaturesPage({ searchParams }: { searchParams: Promise<{ opgeslagen?: string }> }) {
  const { opgeslagen } = await searchParams
  const [rows, sectors] = await Promise.all([
    prisma.vacancy.findMany({ include: { company: true, sector: true, _count: { select: { applications: true } } }, orderBy: { updatedAt: 'desc' } }),
    prisma.sector.findMany({ where: { active: true }, orderBy: { order: 'asc' }, select: { name: true } }),
  ])
  const vacancies = rows.map((v) => ({
    id: v.id,
    slug: v.slug,
    title: v.title,
    company: v.company?.name ?? null,
    sector: v.sector.name,
    city: v.city ?? v.location,
    salary: salaryLabel(v.salaryMin, v.salaryMax),
    hours: hoursLabel(v.hoursMin, v.hoursMax),
    applications: v._count.applications,
    status: v.status,
  }))

  return (
    <>
      <div className="page-head">
        <div><h1>Vacatures</h1><p>Beheer vacatures, publicaties en prestaties.</p></div>
        <Link href="/admin/vacatures/nieuw" className="btn primary">＋ Nieuwe vacature</Link>
      </div>
      {opgeslagen && (
        <div className="card panel" style={{ marginBottom: 14, background: '#f0ffd0', borderColor: '#dcf8a9' }}>
          {opgeslagen === 'gepubliceerd' ? 'Vacature opgeslagen en live gezet op de website.' : 'Vacature opgeslagen als concept.'}
        </div>
      )}
      <VacancyList vacancies={vacancies} sectors={sectors.map((s) => s.name)} />
    </>
  )
}
