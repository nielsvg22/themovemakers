'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Search } from '@/components/ui/Search'
import { Select } from '@/components/ui/Select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import { cn, getStatusVariant } from '@/lib/utils'
import { Plus, Search as SearchIcon, Filter, ChevronRight, ExternalLink } from 'lucide-react'

const mockVacancies = [
  { id: '1', title: 'Uitvoerder Bouw', company: 'BAM', sector: 'Bouw', city: 'Utrecht', salary: '€4.000 – €5.500', hours: '32–40 uur', applications: 12, status: 'ACTIEF', publishedAt: '2024-01-15' },
  { id: '2', title: 'Werkvoorbereider Civiel', company: 'Heijmans', sector: 'Civiel', city: 'Rotterdam', salary: '€3.500 – €5.000', hours: '32–40 uur', applications: 8, status: 'ACTIEF', publishedAt: '2024-01-10' },
  { id: '3', title: 'Projectleider Techniek', company: 'SPIE', sector: 'Techniek', city: 'Eindhoven', salary: '€5.000 – €7.000', hours: '36–40 uur', applications: 5, status: 'GEPAUZEERD', publishedAt: '2024-01-05' },
  { id: '4', title: 'Calculator Bouw', company: 'VolkerWessels', sector: 'Bouw', city: 'Amsterdam', salary: '€4.000 – €5.500', hours: '32–40 uur', applications: 3, status: 'CONCEPT', publishedAt: null },
  { id: '5', title: 'BIM Modelleur', company: 'Heijmans', sector: 'Techniek', city: 'Rosmalen', salary: '€3.500 – €4.800', hours: '32–40 uur', applications: 0, status: 'ACTIEF', publishedAt: '2024-01-20' },
  { id: '6', title: 'Site Manager', company: 'VolkerWessels', sector: 'Projectmanagement', city: 'Amsterdam', salary: '€5.000 – €6.500', hours: '36–40 uur', applications: 2, status: 'INGEVULD', publishedAt: '2024-01-08' },
]

const sectors = ['Alle', 'Bouw', 'Civiel', 'Techniek', 'Engineering', 'Installatietechniek', 'Werkvoorbereiding', 'Projectmanagement']
const statuses = ['Alle statussen', 'ACTIEF', 'CONCEPT', 'GEPAUZEERD', 'INGEVULD', 'VERLOPEN']

export function AdminVacatures() {
  const [search, setSearch] = useState('')
  const [sectorFilter, setSectorFilter] = useState('Alle')
  const [statusFilter, setStatusFilter] = useState('Alle statussen')
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [selectedVacancy, setSelectedVacancy] = useState<string | null>(null)

  const filteredVacancies = mockVacancies.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.company.toLowerCase().includes(search.toLowerCase()) ||
      v.city.toLowerCase().includes(search.toLowerCase())
    const matchesSector = sectorFilter === 'Alle' || v.sector === sectorFilter
    const matchesStatus = statusFilter === 'Alle statussen' || v.status === statusFilter
    return matchesSearch && matchesSector && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Vacatures</h1>
          <p className="text-muted mt-1">Beheer vacatures, publicaties en prestaties.</p>
        </div>
        <Button asChild>
          <Link href="/admin/vacatures/nieuw">＋ Nieuwe vacature</Link>
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <Search
            value={search}
            onChange={setSearch}
            placeholder="Zoek vacature..."
            className="flex-1"
          />
          <Select
            value={sectorFilter}
            onChange={setSectorFilter}
            options={sectors.map(s => ({ value: s, label: s }))}
            className="w-48"
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={statuses.map(s => ({ value: s, label: s }))}
            className="w-48"
          />
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vacature</TableHead>
              <TableHead>Bedrijf</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead>Locatie</TableHead>
              <TableHead>Salaris</TableHead>
              <TableHead>Sollicitaties</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-40">Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVacancies.map((vacancy) => (
              <TableRow key={vacancy.id}>
                <TableCell>
                  <p className="font-medium">{vacancy.title}</p>
                  {vacancy.publishedAt && <p className="text-xs text-muted">Gepubliceerd: {new Date(vacancy.publishedAt).toLocaleDateString('nl-NL')}</p>}
                </TableCell>
                <TableCell>{vacancy.company}</TableCell>
                <TableCell>{vacancy.sector}</TableCell>
                <TableCell>{vacancy.city}</TableCell>
                <TableCell>{vacancy.salary}</TableCell>
                <TableCell>{vacancy.applications}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(vacancy.status)}>{vacancy.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/vacatures/${vacancy.id}/bewerken`}>Bewerken</Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/vacatures/${vacancy.title.toLowerCase().replace(/\s+/g, '-')}-${vacancy.city.toLowerCase()}`} target="_blank">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => { setSelectedVacancy(vacancy.id); setShowPublishModal(true) }}>
                      Publicaties
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredVacancies.length === 0 && (
          <div className="p-8 text-center text-muted">Geen vacatures gevonden</div>
        )}
      </Card>

      <Modal open={showPublishModal} onClose={() => setShowPublishModal(false)} title="Publiceer vacature" size="lg">
        <PublicationModal vacancyId={selectedVacancy} onClose={() => setShowPublishModal(false)} />
      </Modal>
    </div>
  )
}

function PublicationModal({ vacancyId, onClose }: { vacancyId: string | null; onClose: () => void }) {
  const channels = [
    { id: 'website', name: 'Eigen website', description: 'Direct publiceren', connected: true, enabled: true },
    { id: 'google', name: 'Google for Jobs', description: 'Automatisch via structured data', connected: true, enabled: true },
    { id: 'linkedin', name: 'LinkedIn', description: 'Verbonden', connected: true, enabled: true },
    { id: 'indeed', name: 'Indeed', description: 'Verbonden', connected: true, enabled: true },
    { id: 'nv', name: 'Nationale Vacaturebank', description: 'Niet gekoppeld', connected: false, enabled: false },
    { id: 'jobbird', name: 'Jobbird', description: 'Niet gekoppeld', connected: false, enabled: false },
  ]

  const [selectedChannels, setSelectedChannels] = useState(channels.filter(c => c.enabled).map(c => c.id))
  const [schedule, setSchedule] = useState<'now' | 'later'>('now')

  const toggleChannel = (id: string) => {
    const channel = channels.find(c => c.id === id)
    if (!channel?.connected) return
    setSelectedChannels(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  const handlePublish = () => {
    alert(`Vacature wordt gepubliceerd op ${selectedChannels.length} kanalen`)
    onClose()
  }

  return (
    <div className="space-y-6">
      <p className="text-muted">Kies op welke kanalen je deze vacature wilt plaatsen.</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {channels.map((channel) => (
          <label key={channel.id} className="flex items-start gap-3 p-4 border border-line rounded-xl cursor-pointer hover:bg-soft transition-colors">
            <input
              type="checkbox"
              checked={selectedChannels.includes(channel.id)}
              onChange={() => toggleChannel(channel.id)}
              disabled={!channel.connected}
              className="mt-1 w-4 h-4 text-lime border-line rounded focus:ring-lime"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm">{channel.name}</p>
              <p className="text-xs text-muted">{channel.description}</p>
              {!channel.connected && <span className="text-xs text-gray-500">Niet beschikbaar</span>}
            </div>
          </label>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-line">
        <Select
          value={schedule}
          onChange={setSchedule}
          options={[
            { value: 'now', label: 'Nu publiceren' },
            { value: 'later', label: 'Inplannen' },
          ]}
          label="Publicatiemoment"
        />
        <Select
          value="form"
          onChange={() => {}}
          options={[
            { value: 'form', label: 'The Move Maker formulier' },
            { value: 'external', label: 'Extern jobboard' },
          ]}
          label="Sollicitaties ontvangen via"
        />
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-line">
        <Button variant="ghost" onClick={onClose}>Annuleren</Button>
        <Button onClick={handlePublish}>Publiceer op {selectedChannels.length} kanalen</Button>
      </div>
    </div>
  )
}

import { useState } from 'react'