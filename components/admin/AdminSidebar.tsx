'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X, Search, Bell, MessageSquare, Plus, LogOut, User, ChevronDown } from 'lucide-react'

const adminNavigation = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Vacatures', href: '/admin/vacatures', icon: '📋' },
  { name: 'Sollicitaties', href: '/admin/sollicitaties', icon: '👥' },
  { name: 'Kandidaten', href: '/admin/kandidaten', icon: '👤' },
  { name: 'Bedrijven', href: '/admin/bedrijven', icon: '🏢' },
  { name: 'Talentpool', href: '/admin/talentpool', icon: '🎯' },
  { name: 'Publicaties', href: '/admin/publicaties', icon: '🌐' },
  { name: 'Agenda', href: '/admin/agenda', icon: '📅' },
  { name: 'Taken', href: '/admin/taken', icon: '✅' },
  { name: 'Templates', href: '/admin/templates', icon: '📄' },
  { name: 'Rapportages', href: '/admin/rapportages', icon: '📈' },
  { name: 'Websitebeheer', href: '/admin/website', icon: '🌍' },
  { name: 'Instellingen', href: '/admin/instellingen', icon: '⚙️' },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg border border-line shadow-lg"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>

      <aside
        className={cn(
          'fixed md:static inset-y-0 left-0 z-40 md:z-10 w-64 bg-navy text-white transform transition-transform duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
        aria-label="Admin navigatie"
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-white/10">
            <div className="font-black leading-[0.9] text-[23px] tracking-tight">
              THE<br />
              MOVE <span className="text-lime">/</span><br />
              MAKER
            </div>
          </div>

          <nav className="flex-1 p-3 overflow-y-auto" role="navigation" aria-label="Admin menu">
            <ul className="space-y-1" role="list">
              {adminNavigation.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                        isActive
                          ? 'bg-lime text-navy font-extrabold'
                          : 'text-[#c9d3dd] hover:bg-white/5 hover:text-white'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span aria-hidden="true">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="p-3 border-t border-white/10">
            <div className="flex items-center gap-3 p-3 rounded-lg border border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d6a16f] to-[#5c321e] flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">Niels van Gortel</p>
                <p className="text-xs text-[#95a6b7]">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-navy/60 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}