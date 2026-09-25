'use client'

import { ReactNode, useActionState, useRef, useTransition } from 'react'
import type { FormResult } from '@/app/admin/manage-actions'
import { useAdminUI } from './AdminUI'

interface AdminFormProps {
  action: (prev: FormResult, fd: FormData) => Promise<FormResult>
  children: ReactNode
  submitLabel: string
  id?: string
  /** Formulier leegmaken na succes (standaard aan). */
  reset?: boolean
}

/** Formulier voor een server-actie: toont fouten inline, succes als toast. */
export function AdminForm({ action, children, submitLabel, id, reset = true }: AdminFormProps) {
  const { toast } = useAdminUI()
  const ref = useRef<HTMLFormElement>(null)
  const [state, run, pending] = useActionState(async (prev: FormResult, fd: FormData) => {
    const res = await action(prev, fd)
    if (res?.ok) {
      if (res.message) toast(res.message)
      if (reset) ref.current?.reset()
    }
    return res
  }, null)
  return (
    <form ref={ref} action={run} id={id} className="grid" style={{ gap: 12 }}>
      {children}
      {state && !state.ok && state.message && <p style={{ margin: 0, color: 'var(--red)', fontSize: 13 }}>{state.message}</p>}
      <div><button className="btn primary" type="submit" disabled={pending}>{pending ? 'Bezig…' : submitLabel}</button></div>
    </form>
  )
}

interface ActionButtonProps {
  action: () => Promise<unknown>
  children: ReactNode
  className?: string
  done?: string
  confirm?: string
  title?: string
}

/** Knop die een (gebonden) server-actie uitvoert. */
export function ActionButton({ action, children, className = 'btn ghost', done, confirm, title }: ActionButtonProps) {
  const { toast } = useAdminUI()
  const [pending, start] = useTransition()
  return (
    <button
      type="button"
      className={className}
      disabled={pending}
      title={title}
      onClick={() => {
        if (confirm && !window.confirm(confirm)) return
        start(async () => {
          try {
            await action()
            if (done) toast(done)
          } catch (e) {
            toast(e instanceof Error ? e.message : 'Er ging iets mis.')
          }
        })
      }}
    >
      {children}
    </button>
  )
}
