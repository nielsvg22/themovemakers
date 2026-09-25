'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export function LoginForm() {
  const searchParams = useSearchParams()
  // Alleen interne paden toestaan, zodat de login niet als open redirect te misbruiken is.
  const requested = searchParams.get('callbackUrl') ?? ''
  const callbackUrl = requested.startsWith('/') && !requested.startsWith('//') ? requested : '/admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(searchParams.get('error') ? 'Ongeldige inloggegevens. Probeer opnieuw.' : '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await signIn('credentials', { email, password, redirect: false, callbackUrl })
      if (result?.error) {
        setError('Ongeldige e-mail of wachtwoord')
      } else {
        // Volledige paginalading: een client-side navigatie hergebruikt de eerder
        // onthouden redirect van /admin naar /login, waardoor je op het inlogscherm bleef.
        window.location.assign(callbackUrl)
      }
    } catch {
      setError('Er is een fout opgetreden. Probeer opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid" style={{ gap: 14 }}>
      {error && <div className="badge b-red" role="alert" style={{ padding: '10px 12px', borderRadius: 10, fontSize: 13 }}>{error}</div>}
      <div className="field">
        <label htmlFor="email">E-mailadres</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="jouw@email.nl" autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="password">Wachtwoord</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <input id="password" style={{ flex: 1, minWidth: 0 }} type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          <button type="button" className="btn ghost" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Verberg' : 'Toon'}</button>
        </div>
      </div>
      <button type="submit" className="btn primary" disabled={loading}>{loading ? 'Bezig…' : 'Inloggen'}</button>
    </form>
  )
}
