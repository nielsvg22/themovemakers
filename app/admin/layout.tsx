import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminRootLayout({ children }: { children: ReactNode }) {
  const [session, toReview, openMessages, openTasks] = await Promise.all([
    getServerSession(authOptions),
    prisma.candidate.count({ where: { profileStatus: { in: ['NIEUW_PROFIEL', 'TE_BEOORDELEN'] } } }).catch(() => 0),
    prisma.lead.count({ where: { status: 'NEW' } }).catch(() => 0),
    prisma.task.count({ where: { status: { in: ['OPEN', 'IN_VOORTGANG'] } } }).catch(() => 0),
  ])
  // Verwijderd account met nog geldige sessie: uitloggen.
  if (session?.user?.id && !(await prisma.user.findUnique({ where: { id: session.user.id }, select: { id: true } }).catch(() => ({ id: '' })))) {
    redirect('/api/auth/signout?callbackUrl=/login')
  }
  return (
    <AdminLayout
      user={{ name: session?.user?.name ?? session?.user?.email ?? 'Gebruiker', role: session?.user?.role === 'ADMIN' ? 'Administrator' : 'Recruiter' }}
      counts={{ toReview, openMessages, openTasks }}
    >
      {children}
    </AdminLayout>
  )
}
