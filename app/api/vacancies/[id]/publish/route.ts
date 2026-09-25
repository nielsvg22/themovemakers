import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { PublicationService } from '@/lib/services/publication-service'
import { z } from 'zod'

const publishSchema = z.object({
  channels: z.array(z.string()).min(1),
  mode: z.enum(['TEST', 'PRODUCTIE']).default('TEST'),
  scheduledAt: z.string().datetime().optional(),
  applicationMethod: z.enum(['FORM', 'EXTERNAL']).default('FORM'),
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { channels, mode, scheduledAt, applicationMethod } = publishSchema.parse(body)

    const results = await PublicationService.publishVacancy(
      id,
      channels as any,
      mode,
      scheduledAt ? new Date(scheduledAt) : undefined
    )

    return NextResponse.json({ results })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Ongeldige data', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Publicatie mislukt' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await PublicationService.closeVacancy(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Sluiten mislukt' }, { status: 500 })
  }
}