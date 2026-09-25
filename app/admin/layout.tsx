'use client'

import { AdminLayout } from '@/components/admin/AdminLayout'
import { ReactNode } from 'react'

export default function AdminLayoutWrapper({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>
}