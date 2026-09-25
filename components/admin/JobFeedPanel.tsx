'use client'

import { useState, useTransition } from 'react'
import { testJobFeed, type FeedTestResult } from '@/app/admin/manage-actions'
import { feedBoards } from '@/lib/admin/feed-boards'
import { useAdminUI } from './AdminUI'

interface Props {
  feedUrl: string
  boardFeedUrl: (channel: string) => string
}

/**
 * Deze jobboards bieden geen publieke push-API voor losse werkgevers; ze halen vacatures
 * zelf op uit een aangemelde XML-feed (meestal ná handmatige goedkeuring, enkele
 * werkdagen). Elk board krijgt zijn eigen feed-URL (met zijn kanaal erin): alleen zo
 * bepaalt het vinkje bij dat board in de "Publiceer"-modal ook echt of een vacature
 * bij dát specifieke board verschijnt of verdwijnt.
 */
export function JobFeedPanel({ feedUrl, boardFeedUrl }: Props) {
  const { toast } = useAdminUI()
  const [result, setResult] = useState<FeedTestResult | null>(null)
  const [testing, start] = useTransition()
  const [boardResult, setBoardResult] = useState<Record<string, FeedTestResult>>({})
  const [testingBoard, setTestingBoard] = useState<string | null>(null)
  const [boardTesting, startBoard] = useTransition()

  const copy = async (url: string, label: string) => {
    try {
      await navigator.clipboard.writeText(url)
      toast(`${label} gekopieerd`)
    } catch {
      toast('Kopiëren mislukt, selecteer de URL handmatig')
    }
  }

  const testBoard = (key: string) => {
    setTestingBoard(key)
    startBoard(async () => {
      const r = await testJobFeed(key)
      setBoardResult((prev) => ({ ...prev, [key]: r }))
    })
  }

  return (
    <div className="card panel" style={{ marginBottom: 16 }}>
      <div className="page-head" style={{ marginBottom: 10 }}>
        <div>
          <h3 style={{ margin: 0 }}>Automatisch aanleveren via jobfeed</h3>
          <p style={{ margin: '4px 0 0' }}>
            Deze boards werken niet met een directe API per vacature, maar halen vacatures zelf op uit een feed-URL. Meld bij
            elk board hieronder <b>zijn eigen URL</b> aan (niet de algemene testfeed) — alleen dan bepaalt het vinkje bij dat
            board in de &ldquo;Publiceer&rdquo;-knop op een vacature ook echt of hij daar wel of niet verschijnt.
          </p>
        </div>
      </div>
      <div className="form-grid" style={{ marginBottom: 10 }}>
        <div className="field" style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="feed-url">Algemene testfeed (alle actieve vacatures, ongeacht publicatiestatus)</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input id="feed-url" readOnly value={feedUrl} onFocus={(e) => e.currentTarget.select()} style={{ flex: 1 }} />
            <button type="button" className="btn ghost" onClick={() => copy(feedUrl, 'Testfeed-URL')}>Kopiëren</button>
            <button type="button" className="btn soft" disabled={testing} onClick={() => start(async () => setResult(await testJobFeed()))}>
              {testing ? 'Testen…' : 'Test feed'}
            </button>
          </div>
          <small style={{ color: 'var(--muted)' }}>Handig om te controleren of onze kant geldige XML aanlevert. Meld deze URL niet bij een board aan — gebruik daarvoor de URL per board hieronder.</small>
        </div>
      </div>
      {result && <p style={{ margin: '0 0 12px', fontSize: 13, color: result.ok ? 'var(--green)' : 'var(--red)' }}>{result.message}</p>}
      <div className="grid connector-grid">
        {feedBoards.map((b) => {
          const recommended = 'recommended' in b && b.recommended
          const url = boardFeedUrl(b.key)
          const r = boardResult[b.key]
          return (
            <div key={b.key} className="card connector" style={recommended ? { borderColor: 'var(--lime)', borderWidth: 2 } : undefined}>
              <div className="connector-head">
                <div><h3>{b.name}</h3><p>{b.how}</p></div>
                <span className={`badge ${recommended ? 'b-green' : 'b-blue'}`}>{recommended ? 'Aanbevolen om te testen' : 'Via feed'}</span>
              </div>
              {'note' in b && b.note && <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--muted)' }}>{recommended ? '✓' : '⚠'} {b.note}</p>}
              <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                <input readOnly value={url} onFocus={(e) => e.currentTarget.select()} style={{ flex: 1, fontSize: 12 }} />
                <button type="button" className="btn ghost" onClick={() => copy(url, `Feed-URL voor ${b.name}`)}>Kopiëren</button>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                {'href' in b && b.href && (
                  <a className="btn ghost" href={b.href} target="_blank" rel="noopener noreferrer">Aanmeldpagina openen</a>
                )}
                <button type="button" className="btn soft" disabled={boardTesting && testingBoard === b.key} onClick={() => testBoard(b.key)}>
                  {boardTesting && testingBoard === b.key ? 'Testen…' : 'Test dit board'}
                </button>
              </div>
              {r && <p style={{ margin: '8px 0 0', fontSize: 12, color: r.ok ? 'var(--green)' : 'var(--red)' }}>{r.message}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
