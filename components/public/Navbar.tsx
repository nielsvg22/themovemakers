'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X, Search, User } from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Vacatures', href: '/vacatures' },
  { name: 'Voor kandidaten', href: '/voor-kandidaten' },
  { name: 'Voor werkgevers', href: '/voor-werkgevers' },
  { name: 'Over ons', href: '/over-ons' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      <nav className="relative bg-navy/96 backdrop-blur-md border-b border-white/10" role="navigation" aria-label="Hoofnavigatie">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3" aria-label="The Move Maker - Home">
              <div className="w-10 h-10 rounded-lg bg-lime flex items-center justify-center text-navy font-black text-lg skew-x-[-7deg]">
                M
              </div>
              <div className="font-black leading-[0.82] text-white text-[18px] tracking-tight">
                THE<br />
                <span className="text-lime">MOVE</span><br />
                MAKER
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-10">
              <div className="flex items-center gap-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'text-sm font-bold transition-opacity',
                      pathname === item.href ? 'text-lime opacity-100' : 'text-white/80 hover:text-white'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors" aria-label="Zoeken">
                  <Search className="w-5 h-5" />
                </button>
                <Link
                  href="/voor-werkgevers"
                  className="px-4 py-2 bg-lime text-navy font-extrabold rounded-lg text-sm hover:bg-lime-2 transition-colors hidden sm:inline-flex"
                >
                  Neem contact op →
                </Link>
              </div>
            </div>

            <button
              className="md:hidden p-2 rounded-lg text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Sluiten menu' : 'Openen menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-navy border-t border-white/10 px-4 py-6">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-4 py-3 rounded-lg text-lg font-bold',
                    pathname === item.href ? 'bg-lime text-navy' : 'text-white/80 hover:text-white hover:bg-white/5'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/voor-werkgevers"
                className="px-4 py-3 bg-lime text-navy font-extrabold rounded-lg text-center mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Neem contact op →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}