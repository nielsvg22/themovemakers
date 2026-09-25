import { NextRequest, NextResponse } from 'next/server'
import { JobBoardChannel } from '@prisma/client'
import { PublicationService } from '@/lib/services/publication-service'
import { requireStaff } from '@/lib/auth/require-staff'
import { z } from 'zod'

const publishSchema = z.object({
  channels: z.array(z.enum(JobBoardChannel)).min(1),
  mode: z.enum(['TEST', 'PRODUCTIE']).default('TEST'),
  scheduledAt: z.string().datetime().optional(),
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireStaff()
  if (denied) return denied

  try {
    const { id } = await params
    const body = await request.json()
    const { channels, mode, scheduledAt } = publishSchema.parse(body)

    const results = await PublicationService.publishVacancy(
      id,
      channels,
      mode,
      scheduledAt ? new Date(scheduledAt) : undefined
    )

    return NextResponse.json({ results })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Ongeldige data', details: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Publicatie mislukt' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireStaff()
  if (denied) return denied

  try {
    const { id } = await params
    await PublicationService.closeVacancy(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Sluiten mislukt' }, { status: 500 })
  }
}