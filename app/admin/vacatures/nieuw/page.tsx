import { prisma } from '@/lib/db/prisma'
import { VacancyEditor } from '@/components/admin/VacancyEditor'

export const dynamic = 'force-dynamic'

export default async function NieuweVacaturePage() {
  const [companies, sectors] = await Promise.all([
    prisma.company.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    prisma.sector.findMany({ where: { active: true }, orderBy: { order: 'asc' }, select: { id: true, name: true } }),
  ])
  return (
    <>
      <div className="page-head">
        <div><h1>Nieuwe vacature</h1><p>Maak een vacature aan en publiceer deze daarna naar de gewenste kanalen.</p></div>
      </div>
      <VacancyEditor companies={companies} sectors={sectors} />
    </>
  )
}
