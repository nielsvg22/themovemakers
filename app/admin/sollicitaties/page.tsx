'use client'

import { useState } from 'react'

interface Candidate {
  name: string
  vacancy: string
  source: string
  badge: string
}

const initialColumns: { title: string; total: number; candidates: Candidate[] }[] = [
  { title: 'Nieuw', total: 8, candidates: [
    { name: 'Sophie de Vries', vacancy: 'Uitvoerder Bouw', source: 'LinkedIn', badge: 'b-blue' },
    { name: 'David de Jong', vacancy: 'Werkvoorbereider Civiel', source: 'Website', badge: 'b-blue' },
  ] },
  { title: 'Screening', total: 5, candidates: [{ name: 'Mark Jansen', vacancy: 'Projectleider Techniek', source: 'Indeed', badge: 'b-yellow' }] },
  { title: 'Gesprek', total: 4, candidates: [{ name: 'Lisa Molenaar', vacancy: 'Calculator Civiel', source: 'Website', badge: 'b-purple' }] },
  { title: 'Voorgesteld', total: 3, candidates: [{ name: 'Thomas Bakker', vacancy: 'Engineer', source: 'LinkedIn', badge: 'b-green' }] },
  { title: 'Plaatsing', total: 2, candidates: [{ name: 'Eva van Dijk', vacancy: 'Uitvoerder Bouw', source: 'Geplaatst', badge: 'b-green' }] },
]

export default function SollicitatiesPage() {
  const [columns, setColumns] = useState(initialColumns)
  const [dragging, setDragging] = useState<{ col: number; index: number } | null>(null)

  // Kaarten zijn te verslepen tussen kolommen; het totaal per kolom schuift mee.
  const drop = (target: number) => {
    if (!dragging || dragging.col === target) return
    const card = columns[dragging.col].candidates[dragging.index]
    setColumns(
      columns.map((c, i) => {
        if (i === dragging.col) return { ...c, total: c.total - 1, candidates: c.candidates.filter((_, j) => j !== dragging.index) }
        if (i === target) return { ...c, total: c.total + 1, candidates: [...c.candidates, card] }
        return c
      })
    )
    setDragging(null)
  }

  return (
    <>
      <div className="page-head">
        <div><h1>Sollicitaties</h1><p>Beheer kandidaten door de volledige recruitmentpipeline.</p></div>
      </div>
      <div className="kanban">
        {columns.map((col, ci) => (
          <div key={col.title} className="column" onDragOver={(e) => e.preventDefault()} onDrop={() => drop(ci)}>
            <h4>{col.title} · {col.total}</h4>
            {col.candidates.map((c, i) => (
              <div key={c.name} className="candidate" draggable onDragStart={() => setDragging({ col: ci, index: i })} onDragEnd={() => setDragging(null)}>
                <b>{c.name}</b><small>{c.vacancy}</small><span className={`badge ${c.badge}`}>{c.source}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
