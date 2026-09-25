import { NextResponse } from 'next/server'
import { buildJobFeedXml } from '@/lib/jobboards/feed'

export const dynamic = 'force-dynamic'

/**
 * Gedeelde jobfeed voor externe jobboards (Werkzoeken.nl, Jobbird, Jobsonline, Jober,
 * NuBanen, 24werk, TopVacaturebank e.a.). Deze URL meld je eenmalig aan bij elk board;
 * ze halen 'm daarna zelf periodiek op. Zie /admin/publicaties.
 */
export async function GET() {
  const { xml } = await buildJobFeedXml()
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' } })
}
