'use client'

import { cn } from '@/lib/utils'
import { Button } from './Button'

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'outline'
  }
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center text-center py-16 px-4', className)}>
      <div className="w-16 h-16 rounded-2xl bg-soft flex items-center justify-center text-muted mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-extrabold text-ink mb-2">{title}</h3>
      {description && <p className="text-muted max-w-sm mb-6">{description}</p>}
      {action && (
        <Button variant={action.variant || 'primary'} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}