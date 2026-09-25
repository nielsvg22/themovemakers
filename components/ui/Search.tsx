'use client'

import { cn } from '@/lib/utils'
import { Search as SearchIcon, X } from 'lucide-react'

interface SearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  onClear?: () => void
}

export function Search({ value, onChange, placeholder = 'Zoeken...', className, onClear }: SearchProps) {
  return (
    <div className={cn('relative', className)}>
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full pl-11 pr-10 py-2.5 border border-line rounded-lg bg-white text-ink placeholder:text-muted',
          'focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent',
          'transition-colors'
        )}
        aria-label={placeholder}
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-soft transition-colors"
          aria-label="Zoekterm wissen"
        >
          <X className="w-4 h-4 text-muted" />
        </button>
      )}
    </div>
  )
}