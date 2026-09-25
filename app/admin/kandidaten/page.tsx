'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Search } from '@/components/ui/Search'
import { Select } from '@/components/ui/Select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { cn, getStatusVariant } from '@/lib/utils'
import { Plus, Search as SearchIcon, Filter, MoreVertical, Mail, Phone, MapPin, Briefcase, ChevronRight } from 'lucide-react'

const candidates = [
  { id: '1', name: 'Sophie de Vries', role: 'Werkvoorbereider', region: 'Utrecht', source: 'LinkedIn', status: 'NIEUW', email: 'sophie@email.nl', phone: '06-12345678', skills: ['Bouw', 'Projectmanagement', 'VCA'], availability: 'Direct', salary: '€4.000 - €5.000' },
  { id: '2', name: 'Mark Jansen', role: 'Projectleider', region: 'Eindhoven', source: 'Indeed', status: 'SCREENING', email: 'mark@email.nl', phone: '06-87654321', skills: ['Techniek', 'Werktuigbouw', 'CAD'], availability: '1 maand', salary: '€5.000 - €6.500' },
  { id: '3', name: 'Lisa Molenaar', role: 'Calculator', region: 'Rotterdam', source: 'Website', status: 'GESPREK', email: 'lisa@email.nl', phone: '06-11223344', skills: ['Civiel', 'Infra', 'AutoCAD'], availability: '2 weken', salary: '€4.500 - €5.500' },
  { id: '4', name: 'Thomas Bakker', role: 'Engineer', region: 'Arnhem', source: 'LinkedIn', status: 'VOORGESTELD', email: 'thomas@email.nl', phone: '06-44332211', skills: ['Werktuigbouw', 'SolidWorks', 'Projectmanagement'], availability: 'Direct', salary: '€4.800 - €6.000' },
  { id: '5', name: 'Eva van Dijk', role: 'Uitvoerder', region: 'Utrecht', source: 'Website', status: 'GEPLAATST', email: 'eva@email.nl', phone: '06-55667788', skills: ['Bouw', 'VCA', 'Leidinggevend'], availability: 'N/A', salary: '€4.200 - €5.200' },
]

export function AdminKandidaten() {
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'table' | 'cards'>('table')

  const filteredCandidates = candidates.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase()) ||
    c.region.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Kandidaten</h1>
          <p className="text-muted mt-1">Centraliseer kandidaten, talent en historie.</p>
        </div>
        <div className="flex gap-3">
          <Search value={search} onChange={setSearch} placeholder="Zoek kandidaat..." className="w-64" />
          <Button variant="ghost" size="sm">
            <Plus className="w-4 h-4 mr-2" /> Nieuw
          </Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        {view === 'table' ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kandidaat</TableHead>
                <TableHead>Functie</TableHead>
                <TableHead>Regio</TableHead>
                <TableHead>Bron</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-40">Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-xs text-muted">{candidate.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{candidate.role}</TableCell>
                  <TableCell>{candidate.region}</TableCell>
                  <TableCell><Badge variant="gray">{candidate.source}</Badge></TableCell>
                  <TableCell><Badge variant={getStatusVariant(candidate.status)}>{candidate.status}</Badge></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="p-1.5" title="Bekijken">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1.5" title="Bewerken">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filteredCandidates.map((candidate) => (
              <div key={candidate.id} className="bg-white border border-line rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold">{candidate.name}</p>
                    <p className="text-sm text-muted">{candidate.role}</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-muted mb-3">
                  <p className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {candidate.region}</p>
                  <p className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {candidate.email}</p>
                  <p className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {candidate.phone}</p>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="gray" className="text-xs">{skill}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-line">
                  <Badge variant={getStatusVariant(candidate.status)}>{candidate.status}</Badge>
                  <Button variant="ghost" size="sm">Bekijken</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}