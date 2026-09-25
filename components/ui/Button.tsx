'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, fullWidth, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-extrabold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-lime text-navy hover:bg-lime-2 active:scale-[0.98] focus:ring-lime',
      secondary: 'bg-white border border-line text-navy hover:bg-soft focus:ring-navy',
      outline: 'bg-transparent border-2 border-navy text-navy hover:bg-navy hover:text-white focus:ring-navy',
      ghost: 'bg-transparent text-navy hover:bg-soft focus:ring-navy',
      dark: 'bg-navy text-white hover:bg-navy-2 focus:ring-navy',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    }

    const sizes = {
      sm: 'px-3 py-2 text-sm rounded-md',
      md: 'px-5 py-3 text-base rounded-lg',
      lg: 'px-6 py-4 text-lg rounded-xl',
      xl: 'px-8 py-5 text-xl rounded-xl',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'