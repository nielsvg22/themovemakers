'use client'

import Link from 'next/link'
import { useState } from 'react'

const initialChannels = [
  { name: '🌐 Eigen website', type: 'Gratis', on: true, badge: 'b-green', status: 'Gepubliceerd', detail: 'Live op de site' },
  { name: 'G Google for Jobs', type: 'Automatisch', on: true, badge: 'b-green', status: 'Actief', detail: 'Structured data' },
  { name: 'in LinkedIn', type: 'Job Post', on: true, badge: 'b-yellow', status: 'Testmodus', detail: 'API-koppeling nodig' },
  { name: 'i Indeed', type: 'Job Sync', on: true, badge: 'b-yellow', status: 'Testmodus', detail: 'API-koppeling nodig' },
  { name: 'N Nationale Vacaturebank', type: 'Connector', on: false, badge: 'b-gray', status: 'Niet gekoppeld', detail: 'Koppeling instellen' },
  { name: 'J Jobbird', type: 'Connector', on: false, badge: 'b-gray', status: 'Niet gekoppeld', detail: 'Koppeling instellen' },
  { name: 'M Monsterboard', type: 'Connector', on: false, badge: 'b-gray', status: 'Niet gekoppeld', detail: 'Koppeling instellen' },
  { name: 'W Werkzoeken.nl', type: 'Connector', on: false, badge: 'b-gray', status: 'Niet gekoppeld', detail: 'Koppeling instellen' },
  { name: 'J Jooble', type: 'Connector', on: false, badge: 'b-gray', status: 'Niet gekoppeld', detail: 'Koppeling instellen' },
]

export function ChannelsPanel() {
  const [channels, setChannels] = useState(initialChannels)
  return (
    <div className="card publish-wrap">
      <div className="page-head">
        <div><h2 style={{ margin: 0 }}>Publicatiekanalen</h2><p>Publiceer vacatures naar geselecteerde vacaturewebsites en kanalen.</p></div>
        <Link href="/admin/publicaties" className="btn ghost">Instellingen</Link>
      </div>
      <div className="channels">
        {channels.map((c, i) => (
          <div key={c.name} className="channel">
            <div className="name">{c.name}</div>
            <small>{c.type}</small>
            <button
              className={`toggle${c.on ? ' on' : ''}`}
              role="switch"
              aria-checked={c.on}
              aria-label={`${c.name} aan/uit`}
              onClick={() => setChannels(channels.map((x, j) => (j === i ? { ...x, on: !x.on } : x)))}
            />
            <span className={`badge ${c.badge}`}>{c.status}</span>
            <small>{c.detail}</small>
          </div>
        ))}
      </div>
    </div>
  )
}
