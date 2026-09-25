'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, fullWidth, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    
    return (
      <div className={cn('w-full', fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={inputId} className="block text-xs font-extrabold text-ink mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full border rounded-lg bg-white text-ink placeholder:text-muted transition-colors',
            'px-4 py-3 text-base',
            'focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent',
            'disabled:bg-soft disabled:cursor-not-allowed',
            error && 'border-red-300 focus:ring-red-500',
            !error && 'border-line hover:border-navy/50',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-muted">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'