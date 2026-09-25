'use client'

import { ReactNode, CSSProperties } from 'react'
import { useSiteUI } from './SiteUI'

interface ActionButtonProps {
  className?: string
  style?: CSSProperties
  children: ReactNode
  /** Opent een van de formulier-modals uit het design. */
  open?: 'application' | 'scan'
  /** Toont een toastmelding. */
  toast?: string
}

export function ActionButton({ className = 'btn btn-primary', style, children, open, toast }: ActionButtonProps) {
  const ui = useSiteUI()
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => {
        if (open) ui.openModal(open)
        if (toast) ui.toast(toast)
      }}
    >
      {children}
    </button>
  )
}
