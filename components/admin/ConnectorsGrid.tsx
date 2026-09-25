'use client'

import { useAdminUI } from '@/components/admin/AdminUI'

const connectors = [
  { name: 'Eigen website', text: 'Publiceer direct op themovemaker.nl', badge: 'b-green', status: 'Verbonden', actions: ['Instellingen'] },
  { name: 'Google for Jobs', text: 'Via JobPosting structured data', badge: 'b-green', status: 'Actief', actions: ['Controleer markup'] },
  { name: 'LinkedIn', text: 'ATS / Job Posting connector', badge: 'b-green', status: 'Verbonden', actions: ['Instellingen', 'Test'] },
  { name: 'Indeed', text: 'Job Sync API connector', badge: 'b-green', status: 'Verbonden', actions: ['Instellingen', 'Test'] },
]

function actionClass(action: string) {
  if (action === 'Test') return 'btn soft'
  if (action === 'Koppeling instellen') return 'btn primary'
  return 'btn ghost'
}

export function ConnectorsGrid() {
  const { toast } = useAdminUI()
  return (
    <div className="grid connector-grid">
        {connectors.map((c) => (
          <div key={c.name} className="card connector">
            <div className="connector-head">
              <div><h3>{c.name}</h3><p>{c.text}</p></div>
              <span className={`badge ${c.badge}`}>{c.status}</span>
            </div>
            <div className="actions">
              {c.actions.map((a) => <button key={a} className={actionClass(a)} onClick={() => toast(`${c.name}: ${a.toLowerCase()}`)}>{a}</button>)}
            </div>
          </div>
        ))}
      </div>
  )
}
