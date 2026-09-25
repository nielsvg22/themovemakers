'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'
import { Mail, Lock, Eye, EyeOff, Building2 } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin'
  const error = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFormError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        setFormError('Ongeldige e-mail of wachtwoord')
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      setFormError('Er is een fout opgetreden. Probeer opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7fa] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-lime flex items-center justify-center text-navy font-black text-2xl skew-x-[-7deg]">
              M
            </div>
            <div className="text-left">
              <div className="font-black leading-[0.9] text-2xl tracking-tight text-navy">
                THE<br />
                MOVE <span className="text-lime">/</span><br />
                MAKER
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-ink">Admin inloggen</h1>
          <p className="text-muted mt-2">Voer je gegevens in om toegang te krijgen tot de ATS</p>
        </div>

        <div className="bg-white border border-line rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              Ongeldige inloggegevens. Probeer opnieuw.
            </div>
          )}

          {formError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="E-mailadres"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={<Mail className="w-5 h-5" />}
              placeholder="jouw@email.nl"
              autoComplete="email"
            />

            <div className="relative">
              <Input
                label="Wachtwoord"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                icon={<Lock className="w-5 h-5" />}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-muted hover:text-ink"
                aria-label={showPassword ? 'Verberg wachtwoord' : 'Toon wachtwoord'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Inloggen
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-line">
            <p className="text-sm text-muted text-center">
              Ontwikkelmodus: gebruik een bestaand admin account
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}