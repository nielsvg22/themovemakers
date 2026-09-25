'use client'

import Link from 'next/link'
import { useOptimistic, useState, useTransition } from 'react'
import type { ApplicationStatus } from '@prisma/client'
import { updateApplicationStatus } from '@/app/admin/actions'
import { pipelineColumns, sourceLabel } from '@/lib/admin/labels'

export interface PipelineCard {
  id: string
  candidateId: string
  name: string
  vacancy: string
  source: string | null
  status: ApplicationStatus
}

const badge: Record<string, string> = { cv_check: 'b-purple', kennismaking: 'b-blue', sollicitatie: 'b-green', open_sollicitatie: 'b-yellow' }

export function PipelineBoard({ cards }: { cards: PipelineCard[] }) {
  const [dragging, setDragging] = useState<string | null>(null)
  const [, start] = useTransition()
  const [optimistic, move] = useOptimistic(cards, (state, { id, status }: { id: string; status: ApplicationStatus }) =>
    state.map((c) => (c.id === id ? { ...c, status } : c))
  )

  const drop = (status: ApplicationStatus) => {
    const id = dragging
    setDragging(null)
    if (!id) return
    start(async () => {
      move({ id, status })
      await updateApplicationStatus(id, status)
    })
  }

  return (
    <div className="kanban">
      {pipelineColumns.map((col) => {
        const items = optimistic.filter((c) => col.includes.includes(c.status))
        return (
          <div key={col.title} className="column" onDragOver={(e) => e.preventDefault()} onDrop={() => drop(col.status)}>
            <h4>{col.title} · {items.length}</h4>
            {items.map((c) => (
              <div key={c.id} className="candidate" draggable onDragStart={() => setDragging(c.id)} onDragEnd={() => setDragging(null)}>
                <Link href={`/admin/kandidaten/${c.candidateId}`} style={{ textDecoration: 'none' }}><b>{c.name}</b></Link>
                <small>{c.vacancy}</small>
                <span className={`badge ${badge[c.source ?? ''] ?? 'b-gray'}`}>{c.source ? (sourceLabel[c.source] ?? c.source) : 'Onbekend'}</span>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
