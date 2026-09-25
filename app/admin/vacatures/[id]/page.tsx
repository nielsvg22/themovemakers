import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import { VacancyEditor } from '@/components/admin/VacancyEditor'
import { applicationStatusLabel, dateLabel, sourceLabel } from '@/lib/admin/labels'

export const dynamic = 'force-dynamic'

export default async function EditVacaturePage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const [vacancy, companies, sectors] = await Promise.all([
    prisma.vacancy.findUnique({ where: { id }, include: { applications: { include: { candidate: true }, orderBy: { appliedAt: 'desc' } } } }),
    prisma.company.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    prisma.sector.findMany({ where: { active: true }, orderBy: { order: 'asc' }, select: { id: true, name: true } }),
  ])
  if (!vacancy) notFound()

  return (
    <>
      <div className="page-head">
        <div>
          <p style={{ marginBottom: 6 }}><Link href="/admin/vacatures" style={{ color: 'var(--muted)' }}>← Vacatures</Link></p>
          <h1>{vacancy.title}</h1>
          <p>{vacancy.applications.length} sollicitaties en cv-checks gekoppeld aan deze vacature.</p>
        </div>
        {vacancy.status === 'ACTIEF' && <a className="btn ghost" href={`/vacatures/${vacancy.slug}`} target="_blank" rel="noopener noreferrer">Bekijk op website</a>}
      </div>
      {vacancy.applications.length > 0 && (
        <div className="card panel" style={{ marginBottom: 16 }}>
          <h3>Kandidaten voor deze vacature</h3>
          <table className="table">
            <tbody>
              {vacancy.applications.map((a) => (
                <tr key={a.id}>
                  <td><Link href={`/admin/kandidaten/${a.candidateId}`}><b>{a.candidate.firstName} {a.candidate.lastName}</b></Link></td>
                  <td>{a.source ? (sourceLabel[a.source] ?? a.source) : '—'}</td>
                  <td>{dateLabel(a.appliedAt)}</td>
                  <td><span className="badge b-blue">{applicationStatusLabel[a.status]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <VacancyEditor
        companies={companies}
        sectors={sectors}
        vacancy={{
          id: vacancy.id,
          title: vacancy.title,
          companyId: vacancy.companyId,
          sectorId: vacancy.sectorId,
          city: vacancy.city ?? vacancy.location,
          hoursMin: vacancy.hoursMin,
          hoursMax: vacancy.hoursMax,
          contractType: vacancy.contractType,
          salaryMin: vacancy.salaryMin,
          salaryMax: vacancy.salaryMax,
          description: vacancy.description,
          responsibilities: vacancy.responsibilities,
          requirements: vacancy.requirements,
          benefits: vacancy.benefits,
          image: vacancy.image,
          status: vacancy.status,
        }}
      />
    </>
  )
}
