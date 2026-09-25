'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Search } from '@/components/ui/Search'
import { cn } from '@/lib/utils'
import { Plus, Search as SearchIcon, Building2, Users, Mail, Phone, MapPin, ChevronRight, TrendingUp } from 'lucide-react'

const companies = [
  { id: '1', name: 'BAM', logo: null, vacancies: 6, candidates: 18, status: 'ACTIEF', contact: 'Jan de Vries', email: 'jan@bam.nl', phone: '030-1234567', address: 'Utrecht' },
  { id: '2', name: 'Heijmans', logo: null, vacancies: 4, candidates: 12, status: 'ACTIEF', contact: 'Marie Bakker', email: 'marie@heijmans.nl', phone: '010-7654321', address: 'Rotterdam' },
  { id: '3', name: 'VolkerWessels', logo: null, vacancies: 3, candidates: 9, status: 'OPVOLGEN', contact: 'Peter Jansen', email: 'peter@volkerwessels.nl', phone: '020-1122334', address: 'Amsterdam' },
  { id: '4', name: 'SPIE', logo: null, vacancies: 5, candidates: 15, status: 'ACTIEF', contact: 'Lisa de Boer', email: 'lisa@spie.nl', phone: '026-4433221', address: 'Arnhem' },
  { id: '5', name: 'Strukton', logo: null, vacancies: 2, candidates: 6, status: 'NIEUW', contact: 'Mark Visser', email: 'mark@strukton.nl', phone: '030-5566778', address: 'Utrecht' },
]

export function AdminBedrijven() {
  const [search, setSearch] = useState('')

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Bedrijven</h1>
          <p className="text-muted mt-1">CRM-overzicht van opdrachtgevers en contactpersonen.</p>
        </div>
        <Button asChild>
          <a href="/admin/bedrijven/nieuw">＋ Bedrijf</a>
        </Button>
      </div>

      <div className="flex gap-3 mb-4">
        <Search value={search} onChange={setSearch} placeholder="Zoek bedrijf..." className="w-64" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-card-hover transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-soft flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <CardTitle className="text-xl">{company.name}</CardTitle>
                  <p className="text-sm text-muted">{company.address}</p>
                </div>
              </div>
              <Badge variant={company.status === 'ACTIEF' ? 'success' : company.status === 'OPVOLGEN' ? 'warning' : 'info'}>
                {company.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1 text-muted"><Users className="w-4 h-4" /> {company.vacancies} vacatures</div>
                <div className="flex items-center gap-1 text-muted"><User className="w-4 h-4" /> {company.candidates} kandidaten</div>
              </div>
              <div className="pt-3 border-t border-line space-y-2">
                <p className="font-medium">{company.contact}</p>
                <p className="text-sm text-muted flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {company.email}</p>
                <p className="text-sm text-muted flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {company.phone}</p>
              </div>
              <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <a href={`/admin/bedrijven/${company.id}`}>Bekijken details →</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { User } from 'lucide-react'