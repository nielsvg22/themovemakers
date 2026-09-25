'use client'

import { Fragment } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'full'
}

export function Drawer({ open, onClose, title, children, size = 'lg' }: DrawerProps) {
  if (!open) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    full: 'max-w-[90vw]',
  }

  return (
    <Fragment>
      <div
        className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={cn(
          'fixed inset-y-0 right-0 bg-white z-50 flex flex-col shadow-[0_30px_80px_rgba(0,0,0,.25)]',
          sizes[size]
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="flex items-center justify-between p-4 border-b border-line">
          <h2 id="drawer-title" className="text-xl font-extrabold text-ink">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-soft text-muted hover:bg-line hover:text-ink transition-colors"
            aria-label="Sluiten"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </aside>
    </Fragment>
  )
}