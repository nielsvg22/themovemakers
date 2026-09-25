'use client'

import { useState, useTransition } from 'react'
import { testJobFeed, type FeedTestResult } from '@/app/admin/manage-actions'
import { feedBoards } from '@/lib/admin/feed-boards'
import { useAdminUI } from './AdminUI'

interface Props {
  feedUrl: string
}

/**
 * Deze jobboards bieden geen publieke push-API voor losse werkgevers; ze halen vacatures
 * zelf op uit een aangemelde XML-feed (meestal ná handmatige goedkeuring, enkele
 * werkdagen). Deze paneel toont de gedeelde feed-URL, per board hoe je 'm aanmeldt, en
 * een zelftest die de feed valideert zoals een jobboard dat zou doen.
 */
export function JobFeedPanel({ feedUrl }: Props) {
  const { toast } = useAdminUI()
  const [result, setResult] = useState<FeedTestResult | null>(null)
  const [testing, start] = useTransition()

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(feedUrl)
      toast('Feed-URL gekopieerd')
    } catch {
      toast('Kopiëren mislukt, selecteer de URL handmatig')
    }
  }

  return (
    <div className="card panel" style={{ marginBottom: 16 }}>
      <div className="page-head" style={{ marginBottom: 10 }}>
        <div>
          <h3 style={{ margin: 0 }}>Automatisch aanleveren via jobfeed</h3>
          <p style={{ margin: '4px 0 0' }}>
            Deze boards werken niet met een directe API per vacature, maar halen actieve vacatures zelf op uit onderstaande feed-URL.
            Meld de URL eenmalig aan bij elk board (meestal via het werkgeversportaal); vanaf dan verschijnen nieuwe en bijgewerkte
            vacatures automatisch, zonder verdere handmatige actie.
          </p>
        </div>
      </div>
      <div className="form-grid" style={{ marginBottom: 10 }}>
        <div className="field" style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="feed-url">Feed-URL</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input id="feed-url" readOnly value={feedUrl} onFocus={(e) => e.currentTarget.select()} style={{ flex: 1 }} />
            <button type="button" className="btn ghost" onClick={copy}>Kopiëren</button>
            <button
              type="button"
              className="btn soft"
              disabled={testing}
              onClick={() => start(async () => setResult(await testJobFeed()))}
            >
              {testing ? 'Testen…' : 'Test feed'}
            </button>
          </div>
        </div>
      </div>
      {result && <p style={{ margin: '0 0 12px', fontSize: 13, color: result.ok ? 'var(--green)' : 'var(--red)' }}>{result.message}</p>}
      <div className="grid connector-grid">
        {feedBoards.map((b) => (
          <div key={b.key} className="card connector">
            <div className="connector-head">
              <div><h3>{b.name}</h3><p>{b.how}</p></div>
              <span className="badge b-blue">Via feed</span>
            </div>
            {'note' in b && b.note && <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--muted)' }}>⚠ {b.note}</p>}
            {'href' in b && b.href && (
              <a className="btn ghost" href={b.href} target="_blank" rel="noopener noreferrer">Aanmeldpagina openen</a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
