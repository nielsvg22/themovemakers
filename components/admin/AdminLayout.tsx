'use client'

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import type { JobBoardChannel } from '@prisma/client'
import { AdminUIContext, type PublishTarget } from './AdminUI'
import { publishToChannels } from '@/app/admin/actions'

const navigation = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Vacatures', href: '/admin/vacatures' },
  { name: 'Sollicitaties', href: '/admin/sollicitaties' },
  { name: 'Kandidaten', href: '/admin/kandidaten' },
  { name: 'Bedrijven', href: '/admin/bedrijven' },
  { name: 'Talentpool', href: '/admin/talentpool' },
  { name: 'Publicaties', href: '/admin/publicaties' },
  { name: 'Agenda', href: '/admin/agenda' },
  { name: 'Taken', href: '/admin/taken' },
  { name: 'Templates', href: '/admin/templates' },
  { name: 'Verzonden mails', href: '/admin/emails' },
  { name: 'Rapportages', href: '/admin/rapportages' },
  { name: 'Websitebeheer', href: '/admin/website' },
  { name: 'Instellingen', href: '/admin/instellingen' },
]

const boards: { key: JobBoardChannel; name: string; note: string; connected: boolean }[] = [
  { key: 'EIGEN_WEBSITE', name: 'Eigen website', note: 'Direct publiceren', connected: true },
  { key: 'GOOGLE_FOR_JOBS', name: 'Google for Jobs', note: 'Automatisch via structured data', connected: true },
  { key: 'LINKEDIN', name: 'LinkedIn', note: 'Testmodus (API-koppeling nodig)', connected: true },
  { key: 'INDEED', name: 'Indeed', note: 'Testmodus (API-koppeling nodig)', connected: true },
  { key: 'WERKZOEKEN_NL', name: 'Werkzoeken.nl', note: 'Automatisch via jobfeed', connected: true },
  { key: 'JOBBIRD', name: 'Jobbird', note: 'Automatisch via jobfeed', connected: true },
  { key: 'NATIONALE_VACATUREBANK', name: 'Nationale Vacaturebank', note: 'Automatisch via jobfeed', connected: true },
  { key: 'TOPVACATUREBANK', name: 'TopVacaturebank', note: 'Automatisch via jobfeed', connected: true },
  { key: 'JOBER', name: 'Jober', note: 'Automatisch via jobfeed', connected: true },
  { key: 'JOBSONLINE', name: 'Jobsonline', note: 'Automatisch via jobfeed', connected: true },
  { key: 'TWENTY4WERK', name: '24werk', note: 'Automatisch via jobfeed', connected: true },
  { key: 'NUBANEN', name: 'NuBanen', note: 'Automatisch via jobfeed', connected: true },
  { key: 'JOOF', name: 'Joof', note: 'Automatisch via jobfeed', connected: true },
]

const newActions = [
  { label: 'Nieuwe vacature', href: '/admin/vacatures/nieuw' },
  { label: 'Nieuwe kandidaat', href: '/admin/kandidaten/nieuw' },
  { label: 'Nieuw bedrijf', href: '/admin/bedrijven#nieuw' },
  { label: 'Nieuwe taak', href: '/admin/taken#nieuw' },
  { label: 'Kennismaking plannen', href: '/admin/kandidaten?status=TE_BEOORDELEN' },
]

interface AdminLayoutProps {
  children: ReactNode
  user: { name: string; role: string }
  counts: { toReview: number; openMessages: number; openTasks: number }
}

export function AdminLayout({ children, user, counts }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [publishTarget, setPublishTarget] = useState<PublishTarget | null>(null)
  const [publishing, setPublishing] = useState(false)
  const publishOpen = publishTarget !== null
  const setPublishOpen = (open: boolean) => !open && setPublishTarget(null)
  const [newOpen, setNewOpen] = useState(false)
  const [selected, setSelected] = useState(() => boards.map((b) => b.connected))
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const toast = useCallback((message: string) => {
    setToastMessage(message)
    setToastVisible(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToastVisible(false), 2400)
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  const isActive = (href: string) => (href === '/admin' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`))
  const selectedCount = selected.filter(Boolean).length

  const publish = async () => {
    if (!publishTarget) return
    setPublishing(true)
    try {
      const channels = boards.filter((b, i) => selected[i] && b.connected).map((b) => b.key)
      const results = await publishToChannels(publishTarget.id, channels)
      const ok = results.filter((r) => r.success).length
      toast(`${publishTarget.title}: ${ok} van ${results.length} kanalen gepubliceerd${ok < results.length ? ' (zie Publicaties)' : ''}.`)
      setPublishTarget(null)
      router.refresh()
    } catch {
      toast('Publiceren mislukt. Probeer het opnieuw.')
    } finally {
      setPublishing(false)
    }
  }

  return (
    <AdminUIContext.Provider value={{ openPublish: setPublishTarget, openNew: () => setNewOpen(true), toast }}>
      <div className="tmm-ats">
        <div className="app">
          <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
            <Link href="/admin" className="logo" onClick={() => setSidebarOpen(false)}>THE<br />MOVE <span className="lime">/</span><br />MAKER</Link>
            <nav className="nav" aria-label="Admin menu">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className={isActive(item.href) ? 'active' : undefined} aria-current={isActive(item.href) ? 'page' : undefined} onClick={() => setSidebarOpen(false)}>
                  <span className="dot" />{item.name}
                  {item.href === '/admin/kandidaten' && counts.toReview > 0 && <span className="nav-count">{counts.toReview}</span>}
                  {item.href === '/admin/taken' && counts.openTasks > 0 && <span className="nav-count">{counts.openTasks}</span>}
                </Link>
              ))}
            </nav>
            <div className="sidebar-bottom">
              <div className="user">
                <div className="avatar" />
                <div style={{ minWidth: 0, flex: 1 }}><b>{user.name}</b><small>{user.role}</small></div>
                <button className="logout" onClick={() => signOut({ callbackUrl: '/login' })} title="Uitloggen" aria-label="Uitloggen">⏻</button>
              </div>
            </div>
          </aside>
          <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />

          <main className="main">
            <div className="topbar">
              <button className="btn ghost mobile-menu" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Menu">☰</button>
              <form className="search" action="/admin/zoeken" role="search">
                <input name="q" placeholder="Zoek naar vacatures, kandidaten, bedrijven..." aria-label="Zoeken" />
              </form>
              <div className="top-actions">
                <button className="btn primary" onClick={() => setNewOpen(true)}>＋ Nieuw</button>
                <Link href="/admin/meldingen" className="btn ghost top-icon" aria-label={`Meldingen (${counts.toReview} te beoordelen)`}>
                  🔔{counts.toReview > 0 && <span className="top-badge">{counts.toReview}</span>}
                </Link>
                <Link href="/admin/berichten" className="btn ghost top-icon" aria-label={`Berichten (${counts.openMessages} open)`}>
                  💬{counts.openMessages > 0 && <span className="top-badge">{counts.openMessages}</span>}
                </Link>
              </div>
            </div>
            <div className="content">{children}</div>
          </main>
        </div>

        <div className={`modal${publishOpen ? ' open' : ''}`} onClick={(e) => e.target === e.currentTarget && setPublishOpen(false)}>
          <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="publish-title">
            <div className="modal-head">
              <div>
                <h2 id="publish-title">Publiceer vacature</h2>
                <p style={{ margin: '4px 0 0', color: 'var(--muted)' }}>{publishTarget?.title}: kies op welke kanalen je deze vacature wilt plaatsen.</p>
              </div>
              <button className="close" onClick={() => setPublishOpen(false)} aria-label="Sluiten">×</button>
            </div>
            <div className="board-select">
              {boards.map((b, i) => (
                <label key={b.name} className="board">
                  <input
                    type="checkbox"
                    checked={selected[i]}
                    disabled={!b.connected}
                    onChange={() => setSelected(selected.map((v, j) => (j === i ? !v : v)))}
                  />
                  <div><b>{b.name}</b><br /><small>{b.note}</small></div>
                </label>
              ))}
            </div>
            <div className="form-grid" style={{ marginTop: 18 }}>
              <div className="field"><label>Publicatiemoment</label><select><option>Nu publiceren</option><option>Inplannen</option></select></div>
              <div className="field"><label>Sollicitaties ontvangen via</label><select><option>The Move Maker formulier</option><option>Extern jobboard</option></select></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 9, marginTop: 20 }}>
              <button className="btn ghost" onClick={() => setPublishOpen(false)}>Annuleren</button>
              <button className="btn primary" onClick={publish} disabled={!selectedCount || publishing}>{publishing ? 'Bezig…' : `Publiceer op ${selectedCount} kanalen`}</button>
            </div>
          </div>
        </div>

        <div className={`modal${newOpen ? ' open' : ''}`} onClick={(e) => e.target === e.currentTarget && setNewOpen(false)}>
          <div className="modal-box" style={{ maxWidth: 520 }} role="dialog" aria-modal="true" aria-labelledby="new-title">
            <div className="modal-head"><h2 id="new-title">Nieuwe actie</h2><button className="close" onClick={() => setNewOpen(false)} aria-label="Sluiten">×</button></div>
            <div className="grid">
              {newActions.map((a) => (
                <button key={a.label} className="btn ghost" onClick={() => { setNewOpen(false); router.push(a.href) }}>＋ {a.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* afwijking: het design gebruikt alert(); hier een toast in dezelfde stijl als de website */}
        <div className={`ats-toast${toastVisible ? ' show' : ''}`} role="status" aria-live="polite">{toastMessage}</div>
      </div>
    </AdminUIContext.Provider>
  )
}
