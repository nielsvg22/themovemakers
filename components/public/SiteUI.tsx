'use client'

import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'

type ModalName = 'application' | 'scan'

interface SiteUI {
  openModal: (name: ModalName) => void
  toast: (message: string) => void
}

const SiteUIContext = createContext<SiteUI>({ openModal: () => {}, toast: () => {} })

export function useSiteUI() {
  return useContext(SiteUIContext)
}

export function SiteUIProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalName | null>(null)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const toast = useCallback((message: string) => {
    setToastMessage(message)
    setToastVisible(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToastVisible(false), 2200)
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  useEffect(() => {
    if (!modal) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setModal(null)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [modal])

  const close = () => setModal(null)
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    close()
    toast('Bedankt! We nemen snel contact met je op.')
  }

  return (
    <SiteUIContext.Provider value={{ openModal: setModal, toast }}>
      {children}

      <div className={`modal${modal === 'application' ? ' open' : ''}`} onClick={(e) => e.target === e.currentTarget && close()}>
        <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-application-title">
          <div className="modal-head">
            <div>
              <div className="eyebrow">Kandidaat</div>
              <h2 id="modal-application-title" style={{ fontSize: 34 }}>Open sollicitatie</h2>
            </div>
            <button className="modal-close" onClick={close} aria-label="Sluiten">×</button>
          </div>
          <p style={{ color: 'var(--muted)', marginBottom: 18 }}>Staat jouw perfecte vacature er nog niet tussen? Laat je gegevens achter.</p>
          <form onSubmit={submit}>
            <div className="form-grid">
              <div className="field"><label>Voornaam *</label><input className="form-control" required /></div>
              <div className="field"><label>Achternaam *</label><input className="form-control" required /></div>
              <div className="field"><label>E-mailadres *</label><input className="form-control" type="email" required /></div>
              <div className="field"><label>Telefoonnummer</label><input className="form-control" type="tel" /></div>
              <div className="field">
                <label>Vakgebied</label>
                <select className="form-control"><option>Bouw</option><option>Civiel</option><option>Techniek</option><option>Engineering</option></select>
              </div>
              <div className="field"><label>Regio</label><input className="form-control" placeholder="Bijv. Gelderland" /></div>
              <div className="field full"><label>Vertel kort wat je zoekt</label><textarea className="form-control" rows={5} /></div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: 16 }} type="submit">Verstuur open sollicitatie →</button>
          </form>
        </div>
      </div>

      <div className={`modal${modal === 'scan' ? ' open' : ''}`} onClick={(e) => e.target === e.currentTarget && close()}>
        <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-scan-title">
          <div className="modal-head">
            <div>
              <div className="eyebrow">Voor werkgevers</div>
              <h2 id="modal-scan-title" style={{ fontSize: 34 }}>Gratis recruitmentscan</h2>
            </div>
            <button className="modal-close" onClick={close} aria-label="Sluiten">×</button>
          </div>
          <p style={{ color: 'var(--muted)', marginBottom: 18 }}>Vertel ons welke vacature lastig in te vullen is. We kijken vrijblijvend naar doelgroep, bereik en aanpak.</p>
          <form onSubmit={submit}>
            <ScanFields rows={5} />
            <button className="btn btn-primary" style={{ marginTop: 16 }} type="submit">Verstuur recruitmentscan →</button>
          </form>
        </div>
      </div>

      <div className={`toast${toastVisible ? ' show' : ''}`} role="status" aria-live="polite">{toastMessage}</div>
    </SiteUIContext.Provider>
  )
}

/** Velden van de gratis recruitmentscan (modal, vacaturepagina en losse pagina). */
export function ScanFields({ rows = 4 }: { rows?: number }) {
  return (
    <div className="form-grid">
      <div className="field"><label>Bedrijfsnaam *</label><input className="form-control" required /></div>
      <div className="field"><label>Naam *</label><input className="form-control" required /></div>
      <div className="field"><label>E-mailadres *</label><input className="form-control" type="email" required /></div>
      <div className="field"><label>Telefoonnummer</label><input className="form-control" type="tel" /></div>
      <div className="field"><label>Functietitel *</label><input className="form-control" required /></div>
      <div className="field"><label>Locatie</label><input className="form-control" /></div>
      <div className="field full"><label>Waar loopt u tegenaan?</label><textarea className="form-control" rows={rows} /></div>
    </div>
  )
}
