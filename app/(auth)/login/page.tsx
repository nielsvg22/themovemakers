import { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = {
  title: 'Admin inloggen',
  robots: 'noindex, nofollow',
}

export default function LoginPage() {
  return (
    <div className="tmm-ats">
      <div className="login-wrap">
        <div className="card login-card">
          <div className="logo" style={{ color: 'var(--navy)', padding: '0 0 18px' }}>THE<br />MOVE <span className="lime" style={{ color: '#9bcc1f' }}>/</span><br />MAKER</div>
          <div className="page-head" style={{ marginBottom: 14 }}>
            <div><h1>Inloggen</h1><p>Log in om de ATS te openen.</p></div>
          </div>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
