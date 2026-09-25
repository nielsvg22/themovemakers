'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Search, Bell, MessageSquare, Plus, Menu, ChevronDown, LogOut, User, Settings } from 'lucide-react'

export function AdminTopbar() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNewMenu, setShowNewMenu] = useState(false)

  const newActions = [
    { label: 'Nieuwe vacature', href: '/admin/vacatures/nieuw', icon: '📋' },
    { label: 'Nieuwe kandidaat', href: '/admin/kandidaten/nieuw', icon: '👤' },
    { label: 'Nieuw bedrijf', href: '/admin/bedrijven/nieuw', icon: '🏢' },
    { label: 'Nieuwe taak', href: '/admin/taken/nieuw', icon: '✅' },
    { label: 'Gesprek plannen', href: '/admin/agenda/nieuw', icon: '📅' },
  ]

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-line flex items-center gap-4 px-4 md:px-8">
      <button
        className="md:hidden p-2 rounded-lg border border-line hover:bg-soft"
        onClick={() => document.querySelector('aside')?.classList.add('translate-x-0')}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="hidden md:block flex-1 max-w-2xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" aria-hidden="true" />
        <input
          type="search"
          placeholder="Zoek naar vacatures, kandidaten, bedrijven..."
          className="w-full pl-10 pr-4 py-2 border border-line bg-[#f5f8fb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent"
          aria-label="Globale zoekopdracht"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button className="p-2 rounded-lg border border-line hover:bg-soft transition-colors" aria-label="Notificaties">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-lg border border-line hover:bg-soft transition-colors" aria-label="Berichten">
          <MessageSquare className="w-5 h-5" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNewMenu(!showNewMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-lime text-navy font-extrabold rounded-lg hover:bg-lime-2 transition-colors"
            aria-expanded={showNewMenu}
            aria-haspopup="true"
            aria-label="Nieuwe actie"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Nieuw</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showNewMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-line rounded-xl shadow-lg overflow-hidden z-50">
              {newActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-soft transition-colors"
                  onClick={() => setShowNewMenu(false)}
                >
                  <span>{action.icon}</span>
                  {action.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-soft transition-colors"
            aria-expanded={showUserMenu}
            aria-haspopup="true"
            aria-label="Gebruikersmenu"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d6a16f] to-[#5c321e] flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <ChevronDown className="w-4 h-4 text-muted" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-line rounded-xl shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-line">
                <p className="font-semibold text-sm">Niels van Gortel</p>
                <p className="text-xs text-muted">Administrator</p>
              </div>
              <Link href="/admin/instellingen" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-soft" onClick={() => setShowUserMenu(false)}>
                <Settings className="w-4 h-4" />
                Instellingen
              </Link>
              <Link href="/admin/website" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-soft" onClick={() => setShowUserMenu(false)}>
                <User className="w-4 h-4" />
                Publieke site bekijken
              </Link>
              <hr className="my-1 border-line" />
              <button className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 w-full" onClick={() => setShowUserMenu(false)}>
                <LogOut className="w-4 h-4" />
                Uitloggen
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}