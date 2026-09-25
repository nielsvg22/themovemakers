import { NextResponse } from 'next/server'
import { buildJobFeedXml } from '@/lib/jobboards/feed'

export const dynamic = 'force-dynamic'

/**
 * Zelfde als /api/jobfeeds/vacatures.xml?channel=JOOF, apart bereikbaar voor de
 * Joof-aanmelding. Toont alleen vacatures die voor Joof actief zijn gepubliceerd.
 */
export async function GET() {
  const { xml } = await buildJobFeedXml('JOOF')
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' } })
}
