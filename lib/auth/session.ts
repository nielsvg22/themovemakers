import 'server-only'
import { getServerSession } from 'next-auth'
import { authOptions } from './config'

/** Geeft de ingelogde admin/recruiter terug, of gooit een fout (voor server-acties). */
export async function requireStaffSession() {
  const session = await getServerSession(authOptions)
  const role = session?.user?.role
  if (!session || (role !== 'ADMIN' && role !== 'RECRUITER')) {
    throw new Error('Niet geautoriseerd')
  }
  return session
}
