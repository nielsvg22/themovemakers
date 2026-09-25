import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { requireStaff } from '@/lib/auth/require-staff'

const SAFE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

/** Download van een geüpload cv; alleen voor ingelogde admins/recruiters. */
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireStaff()
  if (denied) return denied

  const file = await prisma.cvFile.findUnique({ where: { id: (await params).id } })
  if (!file) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 })

  // Het type komt van de uploader: alleen bekende documenttypes doorgeven, pdf inline, de rest als download.
  const type = SAFE_TYPES.includes(file.mimeType) ? file.mimeType : 'application/octet-stream'
  const disposition = type === 'application/pdf' ? 'inline' : 'attachment'
  return new NextResponse(new Uint8Array(file.data), {
    headers: {
      'Content-Type': type,
      'Content-Disposition': `${disposition}; filename*=UTF-8''${encodeURIComponent(file.fileName)}`,
      'Content-Security-Policy': "default-src 'none'; sandbox",
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
