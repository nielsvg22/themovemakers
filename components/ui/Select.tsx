'use client'

import { SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  fullWidth?: boolean
  options: { value: string; label: string }[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, fullWidth, options, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')
    
    return (
      <div className={cn('w-full', fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={selectId} className="block text-xs font-extrabold text-ink mb-1.5">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full border rounded-lg bg-white text-ink transition-colors appearance-none',
            'px-4 py-3 text-base',
            'focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent',
            'disabled:bg-soft disabled:cursor-not-allowed',
            error && 'border-red-300 focus:ring-red-500',
            !error && 'border-line hover:border-navy/50',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${selectId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${selectId}-hint`} className="mt-1.5 text-sm text-muted">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'