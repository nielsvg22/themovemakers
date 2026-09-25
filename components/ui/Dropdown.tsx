'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface DropdownProps {
  trigger: React.ReactNode
  items: { label: string; onClick: () => void; icon?: React.ReactNode; danger?: boolean }[]
  align?: 'left' | 'right'
}

export function Dropdown({ trigger, items, align = 'right' }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div
          className={cn(
            'absolute z-50 mt-2 min-w-[180px] bg-white border border-line rounded-xl shadow-lg overflow-hidden',
            align === 'right' ? 'right-0' : 'left-0'
          )}
          role="menu"
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick()
                setOpen(false)
              }}
              className={cn(
                'w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 transition-colors',
                item.danger ? 'text-red-600 hover:bg-red-50' : 'text-ink hover:bg-soft'
              )}
              role="menuitem"
            >
              {item.icon && <span className="w-5 h-5 flex-shrink-0">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}