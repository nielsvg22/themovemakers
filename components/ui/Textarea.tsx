'use client'

import { TextareaHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  fullWidth?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, fullWidth, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')
    
    return (
      <div className={cn('w-full', fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-extrabold text-ink mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full border rounded-lg bg-white text-ink placeholder:text-muted transition-colors resize-y',
            'px-4 py-3 text-base min-h-[120px]',
            'focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent',
            'disabled:bg-soft disabled:cursor-not-allowed',
            error && 'border-red-300 focus:ring-red-500',
            !error && 'border-line hover:border-navy/50',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${textareaId}-hint`} className="mt-1.5 text-sm text-muted">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'