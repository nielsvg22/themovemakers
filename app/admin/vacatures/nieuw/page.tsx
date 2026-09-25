'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { cn, getStatusVariant } from '@/lib/utils'
import { Save, Eye, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const companies = [
  { id: '1', name: 'BAM' },
  { id: '2', name: 'Heijmans' },
  { id: '3', name: 'VolkerWessels' },
  { id: '4', name: 'SPIE' },
  { id: '5', name: 'Strukton' },
  { id: '6', name: 'Boskalis' },
  { id: '7', name: 'Unica' },
  { id: '8', name: 'TenneT' },
  { id: '9', name: 'BAM Infra' },
  { id: '10', name: 'Vink Bouw' },
]

const sectors = [
  { id: 'bouw', name: 'Bouw' },
  { id: 'civiel', name: 'Civiel' },
  { id: 'techniek', name: 'Techniek' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'installatietechniek', name: 'Installatietechniek' },
  { id: 'werkvoorbereiding', name: 'Werkvoorbereiding' },
  { id: 'projectmanagement', name: 'Projectmanagement' },
]

const recruiters = [
  { id: '1', name: 'Mark de Jong', sector: 'Bouw & Civiel' },
  { id: '2', name: 'Lisa Bakker', sector: 'Techniek' },
  { id: '3', name: 'Thomas Jansen', sector: 'Engineering' },
]

export function VacatureEditor() {
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [status, setStatus] = useState<'CONCEPT' | 'ACTIEF'>('CONCEPT')

  const formData = {
    title: 'Uitvoerder Bouw',
    companyId: '1',
    location: 'Utrecht',
    sectorId: 'bouw',
    recruiterId: '1',
    hours: '32 - 40',
    contractType: 'VAST',
    salaryMin: 4000,
    salaryMax: 5500,
    intro: 'Als Uitvoerder Bouw zorg jij dat projecten veilig, efficiënt en volgens planning worden gerealiseerd.',
    description: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
    companyInfo: '',
    applicationProcess: '',
  }

  const handleSave = () => {
    alert('Vacature opgeslagen als concept')
  }

  const handlePublish = () => {
    setShowPublishModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Nieuwe vacature</h1>
          <p className="text-muted mt-1">Maak een vacature aan en publiceer deze daarna naar de gewenste kanalen.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basisinformatie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Functietitel *"
                  value={formData.title}
                  onChange={() => {}}
                  required
                />
                <Select
                  label="Bedrijf *"
                  value={formData.companyId}
                  onChange={() => {}}
                  options={companies.map(c => ({ value: c.id, label: c.name }))}
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Locatie *"
                  value={formData.location}
                  onChange={() => {}}
                  required
                />
                <Select
                  label="Vakgebied *"
                  value={formData.sectorId}
                  onChange={() => {}}
                  options={sectors.map(s => ({ value: s.id, label: s.name }))}
                  required
                />
              </div>
              <Select
                label="Recruiter"
                value={formData.recruiterId}
                onChange={() => {}}
                options={[{ value: '', label: 'Geen recruiter' }, ...recruiters.map(r => ({ value: r.id, label: `${r.name} (${r.sector})` }))]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dienstverband & salaris</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <Input
                  label="Uren per week *"
                  value={formData.hours}
                  onChange={() => {}}
                />
                <Select
                  label="Dienstverband *"
                  value={formData.contractType}
                  onChange={() => {}}
                  options={[
                    { value: 'VAST', label: 'Vast' },
                    { value: 'TIJDELIJK', label: 'Tijdelijk' },
                    { value: 'DETACHERING', label: 'Detachering' },
                    { value: 'FREELANCE', label: 'Freelance' },
                    { value: 'STAGE', label: 'Stage' },
                  ]}
                />
                <Input
                  label="Salaris vanaf *"
                  type="number"
                  value={formData.salaryMin}
                  onChange={() => {}}
                />
                <Input
                  label="Salaris tot *"
                  type="number"
                  value={formData.salaryMax}
                  onChange={() => {}}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Select
                  label="Salarisperiode"
                  value="maand"
                  onChange={() => {}}
                  options={[
                    { value: 'maand', label: 'Per maand' },
                    { value: 'jaar', label: 'Per jaar' },
                    { value: 'uur', label: 'Per uur' },
                  ]}
                />
                <Input
                  label="Salaris toelichting"
                  value=""
                  onChange={() => {}}
                  placeholder="Bijv. inclusief vakantiegeld"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vacaturetekst</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Textarea
                label="Intro *"
                value={formData.intro}
                onChange={() => {}}
                required
                rows={3}
              />
              <Textarea
                label="Over de functie *"
                value={formData.description}
                onChange={() => {}}
                required
                rows={5}
              />
              <Textarea
                label="Wat ga je doen? *"
                value={formData.responsibilities}
                onChange={() => {}}
                required
                rows={5}
              />
              <Textarea
                label="Wat breng je mee? *"
                value={formData.requirements}
                onChange={() => {}}
                required
                rows={5}
              />
              <Textarea
                label="Wat bieden wij? *"
                value={formData.benefits}
                onChange={() => {}}
                required
                rows={4}
              />
              <Textarea
                label="Over het bedrijf"
                value={formData.companyInfo}
                onChange={() => {}}
                rows={4}
              />
              <Textarea
                label="Sollicitatieproces"
                value={formData.applicationProcess}
                onChange={() => {}}
                rows={3}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO instellingen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Slug"
                value="uitvoerder-bouw-utrecht"
                onChange={() => {}}
                placeholder="Auto-gegenereerd uit titel"
              />
              <Input
                label="Meta title"
                value=""
                onChange={() => {}}
                placeholder="Optioneel: overschrijft standaard titel"
              />
              <Textarea
                label="Meta description"
                value=""
                onChange={() => {}}
                rows={3}
                placeholder="Max 160 karakters voor zoekresultaten"
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky lg:top-24 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status & publicatie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                label="Status"
                value={status}
                onChange={setStatus}
                options={[
                  { value: 'CONCEPT', label: 'Concept' },
                  { value: 'ACTIEF', label: 'Actief' },
                ]}
              />

              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => alert('Preview opent in nieuw tabblad')}>
                  <Eye className="w-4 h-4" />
                  Preview vacature
                </Button>
                <Button variant="secondary" className="w-full justify-start gap-2" onClick={handleSave}>
                  <Save className="w-4 h-4" />
                  Opslaan als concept
                </Button>
                <Button className="w-full justify-start gap-2" onClick={handlePublish}>
                  <ChevronRight className="w-4 h-4" />
                  Opslaan & publiceren
                </Button>
              </div>

              <div className="p-3 bg-soft rounded-lg text-sm">
                <p className="font-medium text-ink mb-1">Controlelijst voor publicatie:</p>
                <ul className="space-y-1 text-xs text-muted">
                  {[
                    { label: 'Functietitel ingevuld', done: true },
                    { label: 'Bedrijf geselecteerd', done: true },
                    { label: 'Locatie ingevuld', done: true },
                    { label: 'Vakgebied geselecteerd', done: true },
                    { label: 'Alle teksten ingevuld', done: true },
                    { label: 'Salaris ingevuld', done: true },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center gap-2">
                      <span className={cn('w-4 h-4 rounded flex items-center justify-center text-xs', item.done ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400')}>
                        {item.done ? '✓' : '○'}
                      </span>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal open={showPublishModal} onClose={() => setShowPublishModal(false)} title="Publiceer vacature" size="lg">
        <PublicationModal onClose={() => setShowPublishModal(false)} />
      </Modal>
    </div>
  )
}

function PublicationModal({ onClose }: { onClose: () => void }) {
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