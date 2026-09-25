'use client'

import { createContext, ReactNode, startTransition, useActionState, useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { FormState } from '@/app/actions/public'

type Action = (state: FormState, formData: FormData) => Promise<FormState>

const ErrorsContext = createContext<Record<string, string>>({})

interface ActionFormProps {
  action: Action
  children: ReactNode
  submitLabel?: string
  /** Eigen knoppen (bijv. stappen); vervangt de standaard verstuurknop. */
  actions?: (pending: boolean) => ReactNode
  successTitle: string
  successText: string
  className?: string
  /** Extra (verborgen) velden, bijvoorbeeld de vacature waarop iemand reageert. */
  hidden?: Record<string, string | undefined>
  onSuccess?: () => void
}

export function ActionForm({ action, children, submitLabel, actions, successTitle, successText, className, hidden, onSuccess }: ActionFormProps) {
  const [state, formAction, pending] = useActionState(action, null)
  const called = useRef(false)
  const router = useRouter()

  useEffect(() => {
    if (state?.ok && !called.current) {
      called.current = true
      if (state.redirectTo) router.push(state.redirectTo)
      else onSuccess?.()
    }
  }, [state, onSuccess, router])

  if (state?.ok && state.redirectTo) {
    return <p className="form-intro" role="status">Je sollicitatie is verstuurd…</p>
  }

  if (state?.ok) {
    return (
      <div className="form-success" role="status">
        <div className="form-success-icon">✓</div>
        <div>
          <h3>{successTitle}</h3>
          <p>{successText}</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorsContext.Provider value={state?.errors ?? {}}>
      <form
        className={className}
        onSubmit={(e) => {
          // Via onSubmit i.p.v. action={...}: React leegt het formulier anders ook bij een validatiefout.
          e.preventDefault()
          const data = new FormData(e.currentTarget)
          startTransition(() => formAction(data))
        }}
      >
        {Object.entries(hidden ?? {}).map(([name, value]) => value && <input key={name} type="hidden" name={name} value={value} />)}
        {/* Honeypot tegen spam: onzichtbaar voor bezoekers. */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp-field" />
        {children}
        {state && !state.ok && (
          <p className="form-error" role="alert">
            {state.message ?? 'Controleer de gemarkeerde velden.'}
          </p>
        )}
        {actions ? actions(pending) : (
          <button className="btn btn-primary" style={{ marginTop: 16 }} type="submit" disabled={pending}>
            {pending ? 'Bezig met versturen…' : submitLabel}
          </button>
        )}
      </form>
    </ErrorsContext.Provider>
  )
}

interface FieldProps {
  name: string
  label: string
  required?: boolean
  type?: string
  full?: boolean
  placeholder?: string
  options?: string[]
  textarea?: boolean
  rows?: number
  autoComplete?: string
}

export function Field({ name, label, required, type = 'text', full, placeholder, options, textarea, rows = 4, autoComplete }: FieldProps) {
  const error = useContext(ErrorsContext)[name]
  const id = `f-${name}`
  const common = { id, name, required, className: `form-control${error ? ' has-error' : ''}`, 'aria-invalid': error ? true : undefined }
  return (
    <div className={`field${full ? ' full' : ''}`}>
      <label htmlFor={id}>{label}{required ? ' *' : ''}</label>
      {options ? (
        <select {...common} defaultValue="">
          <option value="" disabled={required}>{required ? 'Maak een keuze' : '—'}</option>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : textarea ? (
        <textarea {...common} rows={rows} placeholder={placeholder} />
      ) : (
        <input {...common} type={type} placeholder={placeholder} autoComplete={autoComplete} />
      )}
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export function CvUpload({ required, full = true }: { required?: boolean; full?: boolean }) {
  const error = useContext(ErrorsContext).cv
  return (
    <div className={`field${full ? ' full' : ''}`}>
      <label htmlFor="f-cv">Cv (pdf of Word, max. 4 MB){required ? ' *' : ''}</label>
      <input
        id="f-cv"
        name="cv"
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        required={required}
        className={`form-control file-control${error ? ' has-error' : ''}`}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export const sectorOptions = ['Bouw', 'Civiel', 'Techniek', 'Engineering', 'Installatietechniek', 'Werkvoorbereiding', 'Projectmanagement', 'Anders']
export const experienceOptions = ['Minder dan 1 jaar', '1-3 jaar', '3-5 jaar', '5-10 jaar', 'Meer dan 10 jaar']
export const availabilityOptions = ['Direct', 'Binnen 1 maand', 'Binnen 3 maanden', 'In overleg']
export const callOptions = ['Doordeweeks in de ochtend', 'Doordeweeks rond de middag', 'Doordeweeks na 16:00', 'Maakt niet uit']
