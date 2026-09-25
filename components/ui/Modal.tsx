'use client'

import { Fragment, ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './Button'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showClose?: boolean
}

export function Modal({ open, onClose, title, description, children, size = 'lg', showClose = true }: ModalProps) {
  if (!open) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-[90vw]',
  }

  return (
    <Fragment>
      <div
        className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          className={cn(
            'w-full bg-white rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,.25)] overflow-hidden',
            sizes[size]
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between p-6 border-b border-line">
            <div>
              <h2 id="modal-title" className="text-2xl font-extrabold text-ink">
                {title}
              </h2>
              {description && (
                <p className="mt-1 text-sm text-muted">{description}</p>
              )}
            </div>
            {showClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-soft text-muted hover:bg-line hover:text-ink transition-colors"
                aria-label="Sluiten"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </Fragment>
  )
}