'use client'

import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { OpenSollicitatieForm, ScanForm } from './CandidateForms'

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
          {modal === 'application' && <OpenSollicitatieForm />}
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
          {modal === 'scan' && <ScanForm rows={5} />}
        </div>
      </div>

      <div className={`toast${toastVisible ? ' show' : ''}`} role="status" aria-live="polite">{toastMessage}</div>
    </SiteUIContext.Provider>
  )
}

