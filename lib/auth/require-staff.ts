import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from './config'

/** Geeft een 401-response terug als de aanvrager geen ingelogde admin of recruiter is. */
export async function requireStaff(): Promise<NextResponse | null> {
  const session = await getServerSession(authOptions)
  const role = session?.user?.role
  if (role !== 'ADMIN' && role !== 'RECRUITER') {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }
  return null
}
