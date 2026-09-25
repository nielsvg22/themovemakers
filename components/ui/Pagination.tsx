'use client'

import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  showPageNumbers?: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showPageNumbers = true,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = showPageNumbers ? getPageNumbers(currentPage, totalPages) : []

  return (
    <nav className={cn('flex items-center gap-2', className)} aria-label="Paginatie">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'p-2 rounded-lg border border-line bg-white text-ink hover:bg-soft disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
          'flex items-center justify-center'
        )}
        aria-label="Vorige pagina"
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {showPageNumbers && (
        <div className="flex items-center gap-1" role="navigation" aria-label="Paginanummers">
          {pages.map((page, index) => {
            if (page === '...') {
              return <span key={`ellipsis-${index}`} className="px-2 text-muted">...</span>
            }
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(
                  'w-10 h-10 rounded-lg font-extrabold text-sm transition-colors',
                  page === currentPage
                    ? 'bg-lime text-navy'
                    : 'text-ink hover:bg-soft'
                )}
                aria-label={`Pagina ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )
          })}
        </div>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'p-2 rounded-lg border border-line bg-white text-ink hover:bg-soft disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
          'flex items-center justify-center'
        )}
        aria-label="Volgende pagina"
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  )
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  const delta = 1
  const range: (number | '...')[] = []
  const rangeStart = Math.max(2, current - delta)
  const rangeEnd = Math.min(total - 1, current + delta)

  range.push(1)
  if (rangeStart > 2) range.push('...')
  for (let i = rangeStart; i <= rangeEnd; i++) range.push(i)
  if (rangeEnd < total - 1) range.push('...')
  if (total > 1) range.push(total)

  return range
}