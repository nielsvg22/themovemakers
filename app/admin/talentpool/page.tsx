'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Search } from '@/components/ui/Search'
import { Select } from '@/components/ui/Select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { cn } from '@/lib/utils'
import { Search as SearchIcon, Filter, User, MapPin, Clock, Briefcase, ChevronRight } from 'lucide-react'

const talentPool = [
  { id: '1', name: 'Jeroen Kok', profile: 'Uitvoerder', skills: ['Bouw', 'BIM', 'Lean', 'VCA'], region: 'Utrecht', availability: 'Direct', salary: '€4.500 - €5.500', experience: '8 jaar', match: 95 },
  { id: '2', name: 'Anne Visser', profile: 'Werkvoorbereider', skills: ['Infra', 'AutoCAD', 'REVIT'], region: 'Rotterdam', availability: '2 weken', salary: '€4.000 - €5.000', experience: '5 jaar', match: 88 },
  { id: '3', name: 'Tom de Boer', profile: 'Projectleider', skills: ['Techniek', 'Projectmanagement', 'Prince2'], region: 'Eindhoven', availability: '1 maand', salary: '€5.500 - €7.000', experience: '10 jaar', match: 92 },
  { id: '4', name: 'Sarah Jansen', profile: 'Calculator', skills: ['Civiel', 'Infra', 'Excel', 'Bluebeam'], region: 'Amsterdam', availability: 'Direct', salary: '€4.200 - €5.200', experience: '4 jaar', match: 85 },
  { id: '5', name: 'Mike Bakker', profile: 'Engineer', skills: ['Werktuigbouw', 'SolidWorks', 'FEM'], region: 'Arnhem', availability: '3 weken', salary: '€4.800 - €6.200', experience: '6 jaar', match: 90 },
]

export function AdminTalentpool() {
  const [search, setSearch] = useState('')
  const [regionFilter, setRegionFilter] = useState('Alle regio\'s')
  const [availabilityFilter, setAvailabilityFilter] = useState('Beschikbaar')

  const filteredTalent = talentPool.filter(t =>
    (t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.profile.toLowerCase().includes(search.toLowerCase()) ||
      t.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))) &&
    (regionFilter === 'Alle regio\'s' || t.region === regionFilter) &&
    (availabilityFilter === 'Beschikbaar' || t.availability === availabilityFilter)
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Talentpool</h1>
          <p className="text-muted mt-1">Vind geschikte kandidaten op skills, regio, ervaring en beschikbaarheid.</p>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <Search value={search} onChange={setSearch} placeholder="Zoek skills of functie..." className="flex-1" />
          <Select
            value={regionFilter}
            onChange={setRegionFilter}
            options={[
              { value: 'Alle regio\'s', label: 'Alle regio\'s' },
              { value: 'Utrecht', label: 'Utrecht' },
              { value: 'Rotterdam', label: 'Rotterdam' },
              { value: 'Eindhoven', label: 'Eindhoven' },
              { value: 'Amsterdam', label: 'Amsterdam' },
              { value: 'Arnhem', label: 'Arnhem' },
            ]}
            className="w-48"
          />
          <Select
            value={availabilityFilter}
            onChange={setAvailabilityFilter}
            options={[
              { value: 'Beschikbaar', label: 'Beschikbaar' },
              { value: 'Direct', label: 'Direct' },
              { value: '1 maand', label: 'Binnen 1 maand' },
              { value: '2 weken', label: 'Binnen 2 weken' },
            ]}
            className="w-48"
          />
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Naam</TableHead>
              <TableHead>Profiel</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Regio</TableHead>
              <TableHead>Beschikbaar</TableHead>
              <TableHead>Salaris</TableHead>
              <TableHead>Match</TableHead>
              <TableHead className="w-30"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTalent.map((talent) => (
              <TableRow key={talent.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold">
                      {talent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{talent.name}</p>
                      <p className="text-xs text-muted">{talent.profile} • {talent.experience}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell><Badge variant="info">{talent.profile}</Badge></TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {talent.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="gray" className="text-xs">{skill}</Badge>
                    ))}
                    {talent.skills.length > 3 && <Badge variant="gray" className="text-xs">+{talent.skills.length - 3}</Badge>}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm"><MapPin className="w-3.5 h-3.5 text-muted" /> {talent.region}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm"><Clock className="w-3.5 h-3.5 text-muted" /> {talent.availability}</div>
                </TableCell>
                <TableCell className="font-medium">{talent.salary}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-line rounded-full overflow-hidden">
                      <div className="h-full bg-lime rounded-full" style={{ width: `${talent.match}%` }} />
                    </div>
                    <span className="text-sm font-bold text-lime">{talent.match}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`/admin/kandidaten/${talent.id}`}>Bekijken</a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

import { useState } from 'react'
import { User } from 'lucide-react'