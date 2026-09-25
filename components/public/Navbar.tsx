'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Brand } from './Brand'

const navigation = [
  { name: 'Vacatures', href: '/vacatures' },
  { name: 'Voor kandidaten', href: '/voor-kandidaten' },
  { name: 'Voor werkgevers', href: '/voor-werkgevers' },
  { name: 'Over ons', href: '/over-ons' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <div className="nav-wrap">
      <div className="container">
        <nav aria-label="Hoofdnavigatie">
          <Brand />
          <div className="nav-links">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={isActive(item.href) ? 'active' : undefined}>
                {item.name}
              </Link>
            ))}
          </div>
          <div className="nav-actions">
            <Link href="/vacatures" className="icon-btn" aria-label="Zoek vacatures" style={{ display: 'grid', placeItems: 'center' }}>⌕</Link>
            <Link href="/voor-werkgevers" className="btn btn-primary btn-sm">Neem contact op →</Link>
            <button
              className="icon-btn mobile-menu"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-panel"
              aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            >
              {open ? '×' : '☰'}
            </button>
          </div>
        </nav>
        <div id="mobile-panel" className={`mobile-panel${open ? ' open' : ''}`}>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(item.href) ? 'active' : undefined} onClick={() => setOpen(false)}>
              {item.name}
            </Link>
          ))}
          <Link href="/voor-werkgevers" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>Neem contact op →</Link>
        </div>
      </div>
    </div>
  )
}
