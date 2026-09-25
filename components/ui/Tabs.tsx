'use client'

import { cn } from '@/lib/utils'

interface TabsProps {
  tabs: { id: string; label: string }[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
  variant?: 'default' | 'underline'
}

export function Tabs({ tabs, activeTab, onChange, className, variant = 'underline' }: TabsProps) {
  return (
    <div className={cn('border-b border-line', className)} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          id={`${tab.id}-trigger`}
          onClick={() => onChange(tab.id)}
          className={cn(
            'px-4 py-3 text-sm font-extrabold whitespace-nowrap transition-colors',
            variant === 'underline'
              ? activeTab === tab.id
                ? 'border-b-3 border-lime text-ink'
                : 'text-muted hover:text-ink'
              : activeTab === tab.id
              ? 'bg-lime text-navy rounded-t-lg'
              : 'text-muted hover:bg-soft',
            className
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

interface TabPanelProps {
  id: string
  activeTab: string
  children: React.ReactNode
  className?: string
}

export function TabPanel({ id, activeTab, children, className }: TabPanelProps) {
  if (activeTab !== id) return null
  return <div id={`${id}-panel`} role="tabpanel" className={cn('mt-6', className)}>{children}</div>
}