'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Search } from '@/components/ui/Search'
import { Select } from '@/components/ui/Select'
import { cn, getStatusVariant } from '@/lib/utils'
import { Plus, Search as SearchIcon, Filter, MoreVertical, Mail, Phone, Calendar, User, ChevronRight } from 'lucide-react'

const columns = [
  { id: 'NIEUW', label: 'Nieuw', count: 8, color: 'info' },
  { id: 'SCREENING', label: 'Screening', count: 5, color: 'warning' },
  { id: 'CONTACT', label: 'Contact', count: 3, color: 'warning' },
  { id: 'GESPREK', label: 'Gesprek', count: 4, color: 'purple' },
  { id: 'VOORGESTELD', label: 'Voorgesteld', count: 3, color: 'info' },
  { id: 'GESPREK_OPDRACHTGEVER', label: 'Gesprek opdrachtgever', count: 2, color: 'purple' },
  { id: 'AANBOD', label: 'Aanbod', count: 1, color: 'success' },
  { id: 'GEPLAATST', label: 'Plaatsing', count: 2, color: 'success' },
  { id: 'AFGEWEZEN', label: 'Afgewezen', count: 4, color: 'danger' },
]

const candidatesByColumn = {
  NIEUW: [
    { id: '1', name: 'Sophie de Vries', vacancy: 'Uitvoerder Bouw', source: 'LinkedIn', matched: true },
    { id: '2', name: 'David de Jong', vacancy: 'Werkvoorbereider Civiel', source: 'Website', matched: false },
    { id: '3', name: 'Anna Bakker', vacancy: 'Projectleider Techniek', source: 'Indeed', matched: true },
  ],
  SCREENING: [
    { id: '4', name: 'Mark Jansen', vacancy: 'Projectleider Techniek', source: 'Indeed', matched: true },
    { id: '5', name: 'Lisa Molenaar', vacancy: 'Calculator Civiel', source: 'Website', matched: true },
  ],
  CONTACT: [
    { id: '6', name: 'Thomas Bakker', vacancy: 'Engineer Werktuigbouw', source: 'LinkedIn', matched: true },
  ],
  GESPREK: [
    { id: '7', name: 'Eva van Dijk', vacancy: 'Uitvoerder Bouw', source: 'Website', matched: true },
    { id: '8', name: 'Jan Smit', vacancy: 'BIM Modelleur', source: 'Indeed', matched: false },
  ],
  VOORGESTELD: [
    { id: '9', name: 'Maria Visser', vacancy: 'Calculator Bouw', source: 'Website', matched: true },
    { id: '10', name: 'Peter de Boer', vacancy: 'Site Manager', source: 'LinkedIn', matched: true },
  ],
  GESPREK_OPDRACHTGEVER: [
    { id: '11', name: 'Sanne Willems', vacancy: 'Werkvoorbereider Bouw', source: 'LinkedIn', matched: true },
  ],
  AANBOD: [
    { id: '12', name: 'Kevin Mulder', vacancy: 'Projectleider Civiel', source: 'Website', matched: true },
  ],
  GEPLAATST: [
    { id: '13', name: 'Robin Jansen', vacancy: 'Uitvoerder Bouw', source: 'Website', matched: true },
    { id: '14', name: 'Femke de Vries', vacancy: 'Engineer Werktuigbouw', source: 'LinkedIn', matched: true },
  ],
  AFGEWEZEN: [
    { id: '15', name: 'Tim Bakker', vacancy: 'Timmerman', source: 'Indeed', matched: false },
    { id: '16', name: 'Laura Smit', vacancy: 'Calculator Civiel', source: 'Website', matched: false },
  ],
}

export function AdminSollicitaties() {
  const [search, setSearch] = useState('')
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, candidateId: string, columnId: string) => {
    setDraggedId(candidateId)
    setDraggedFromColumn(columnId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (columnId: string) => {
    if (draggedId && draggedFromColumn && draggedFromColumn !== columnId) {
      // In a real app, this would call an API to update the application status
      alert(`Kandidaat verplaatst van ${draggedFromColumn} naar ${columnId}`)
      setDraggedId(null)
      setDraggedFromColumn(null)
    }
  }

  const handleDragEnd = () => {
    setDraggedId(null)
    setDraggedFromColumn(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Sollicitaties</h1>
          <p className="text-muted mt-1">Beheer kandidaten door de volledige recruitmentpipeline.</p>
        </div>
        <div className="flex gap-3">
          <Search value={search} onChange={setSearch} placeholder="Zoek kandidaat..." className="w-64" />
          <Button asChild>
            <a href="/admin/sollicitaties/nieuw">＋ Nieuw</a>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 overflow-x-auto pb-4" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(260px, 1fr))` }}>
        {columns.map((column) => (
          <Card key={column.id} className="min-w-[260px] flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{column.label}</CardTitle>
                <Badge variant={column.color as any}>{column.count}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div
                className="p-3 space-y-3 min-h-[400px]"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(column.id)}
                onDragEnd={handleDragEnd}
              >
                {(candidatesByColumn[column.id as keyof typeof candidatesByColumn] || []).map((candidate) => (
                  <div
                    key={candidate.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, candidate.id, column.id)}
                    className={cn(
                      'bg-white border border-line rounded-xl p-3 cursor-grab active:cursor-grabbing transition-shadow',
                      'hover:shadow-md hover:border-lime/50'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{candidate.name}</p>
                        <p className="text-xs text-muted truncate">{candidate.vacancy}</p>
                        <Badge variant="gray" className="mt-1 text-[10px]">{candidate.source}</Badge>
                      </div>
                      <button className="p-1 rounded hover:bg-soft text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {(!candidatesByColumn[column.id as keyof typeof candidatesByColumn] || candidatesByColumn[column.id as keyof typeof candidatesByColumn].length === 0) && (
                  <div className="p-3 text-center text-muted text-sm border-2 border-dashed border-line rounded-xl h-20 flex items-center justify-center">
                    Sleep kandidaat hier
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}