'use client'

import { cn } from '@/lib/utils'

interface TableProps {
  children: React.ReactNode
  className?: string
  striped?: boolean
  hover?: boolean
}

export function Table({ children, className, striped, hover }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={cn('w-full border-collapse', className)}>
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <thead>
      <tr className={cn('border-b border-line', className)}>{children}</tr>
    </thead>
  )
}

export function TableBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <tbody className={cn(className)}>{children}</tbody>
}

export function TableRow({
  children,
  className,
  clickable,
  selected,
}: {
  children: React.ReactNode
  className?: string
  clickable?: boolean
  selected?: boolean
}) {
  return (
    <tr
      className={cn(
        'border-b border-line last:border-0 transition-colors',
        clickable && 'cursor-pointer hover:bg-soft',
        selected && 'bg-lime/10',
        className
      )}
    >
      {children}
    </tr>
  )
}

export function TableHead({ children, className, width }: { children: React.ReactNode; className?: string; width?: string }) {
  return (
    <th
      className={cn(
        'text-left px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-muted border-b border-line',
        className
      )}
      style={width ? { width } : undefined}
    >
      {children}
    </th>
  )
}

export function TableCell({ children, className, width }: { children: React.ReactNode; className?: string; width?: string }) {
  return (
    <td
      className={cn('px-4 py-3 text-sm text-ink', className)}
      style={width ? { width } : undefined}
    >
      {children}
    </td>
  )
}