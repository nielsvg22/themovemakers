'use client'

import { ReactNode } from 'react'
import { AdminSidebar } from './AdminSidebar'
import { AdminTopbar } from './AdminTopbar'
import { cn } from '@/lib/utils'

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f4f7fa]">
      <AdminSidebar />
      <div className="md:pl-64 flex flex-col min-h-screen">
        <AdminTopbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8" role="main">
          <div className="max-w-[1600px] mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}