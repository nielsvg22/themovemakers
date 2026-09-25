import type { Metadata } from 'next'
import { Suspense } from 'react'
import { GateForm } from './GateForm'

export const metadata: Metadata = {
  title: 'Website',
  robots: 'noindex, nofollow',
}

export default async function SiteGatePage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams
  return (
    <div className="tmm-ats">
      <div className="login-wrap">
        <div className="card login-card">
          <div className="logo" style={{ color: 'var(--navy)', padding: '0 0 18px' }}>THE<br />MOVE <span className="lime" style={{ color: '#9bcc1f' }}>/</span><br />MAKER</div>
          <div className="page-head" style={{ marginBottom: 14 }}>
            <div><h1>Nog niet live</h1><p>Deze website is in ontwikkeling. Heb je het wachtwoord?</p></div>
          </div>
          <Suspense>
            <GateForm next={next ?? '/'} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
