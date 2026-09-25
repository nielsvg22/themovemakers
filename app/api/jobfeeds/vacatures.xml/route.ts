import { NextRequest, NextResponse } from 'next/server'
import type { JobBoardChannel } from '@prisma/client'
import { buildJobFeedXml } from '@/lib/jobboards/feed'

export const dynamic = 'force-dynamic'

const knownChannels = new Set<string>([
  'WERKZOEKEN_NL', 'JOBBIRD', 'NATIONALE_VACATUREBANK', 'TOPVACATUREBANK', 'JOBER',
  'JOBSONLINE', 'TWENTY4WERK', 'NUBANEN', 'JOOF', 'MONSTERBOARD', 'JOOBLE',
])

/**
 * Jobfeed voor externe jobboards (Werkzoeken.nl, Jobbird, Jobsonline, Jober, NuBanen,
 * 24werk, TopVacaturebank e.a.). Met `?channel=<kanaal>` toont de feed alleen vacatures
 * die voor dat board actief zijn gepubliceerd (zie de "Publiceer"-modal in de admin);
 * zonder channel alle actieve vacatures (algemene/testfeed). Elk board meldt zijn eigen
 * URL, met zijn kanaal erin, eenmalig aan — zie /admin/publicaties.
 */
export async function GET(req: NextRequest) {
  const channelParam = req.nextUrl.searchParams.get('channel')
  const channel = channelParam && knownChannels.has(channelParam) ? (channelParam as JobBoardChannel) : undefined
  const { xml } = await buildJobFeedXml(channel)
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' } })
}
