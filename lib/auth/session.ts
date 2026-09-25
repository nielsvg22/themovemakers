import 'server-only'
import { getServerSession } from 'next-auth'
import { authOptions } from './config'
import { prisma } from '@/lib/db/prisma'

/** Geeft de ingelogde admin/recruiter terug, of gooit een fout (voor server-acties). */
export async function requireStaffSession() {
  const session = await getServerSession(authOptions)
  const role = session?.user?.role
  if (!session || (role !== 'ADMIN' && role !== 'RECRUITER')) {
    throw new Error('Niet geautoriseerd')
  }
  // Een verwijderd account houdt tot het verloopt een geldige sessie; blokkeer het hier.
  const exists = await prisma.user.findUnique({ where: { id: session.user.id }, select: { id: true } })
  if (!exists) throw new Error('Niet geautoriseerd')
  return session
}
