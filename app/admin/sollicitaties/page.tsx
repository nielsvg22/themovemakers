import { prisma } from '@/lib/db/prisma'
import { PipelineBoard } from '@/components/admin/PipelineBoard'

export const dynamic = 'force-dynamic'

export default async function SollicitatiesPage() {
  const applications = await prisma.application.findMany({
    where: { status: { not: 'AFGEWEZEN' } },
    include: { candidate: true, vacancy: true },
    orderBy: { appliedAt: 'desc' },
  })
  return (
    <>
      <div className="page-head">
        <div><h1>Sollicitaties</h1><p>Sleep kandidaten door de recruitmentpipeline. Nieuwe profielen beoordeel je eerst onder Kandidaten.</p></div>
      </div>
      <PipelineBoard
        cards={applications.map((a) => ({
          id: a.id,
          candidateId: a.candidateId,
          name: `${a.candidate.firstName} ${a.candidate.lastName}`,
          vacancy: a.vacancy.title,
          source: a.source,
          status: a.status,
        }))}
      />
    </>
  )
}
