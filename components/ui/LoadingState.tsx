'use client'

import { cn } from '@/lib/utils'

interface LoadingStateProps {
  variant?: 'spinner' | 'skeleton' | 'card'
  count?: number
  className?: string
}

export function LoadingState({ variant = 'spinner', count = 1, className }: LoadingStateProps) {
  if (variant === 'spinner') {
    return (
      <div className={cn('flex items-center justify-center py-12', className)}>
        <div className="w-8 h-8 border-3 border-lime border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (variant === 'skeleton') {
    return (
      <div className={cn('space-y-4', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="animate-pulse space-y-3">
            <div className="h-4 bg-line rounded w-3/4" />
            <div className="h-4 bg-line rounded w-1/2" />
            <div className="h-4 bg-line rounded w-1/3" />
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={cn('grid gap-4', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-video bg-line rounded-xl mb-4" />
            <div className="h-6 bg-line rounded w-3/4 mb-2" />
            <div className="h-4 bg-line rounded w-1/2 mb-2" />
            <div className="h-4 bg-line rounded w-1/3" />
          </div>
        ))}
      </div>
    )
  }

  return null
}