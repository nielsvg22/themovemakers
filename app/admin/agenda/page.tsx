'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { Plus, Calendar, Clock, User, Building2, ChevronRight, MoreVertical } from 'lucide-react'

const todayAppointments = [
  { id: '1', time: '10:00', title: 'Gesprek — Jan de Vries', type: 'KANDIDATEN_GESPREK', vacancy: 'Uitvoerder Bouw', location: 'Online (Teams)', duration: 45 },
  { id: '2', time: '11:30', title: 'Klantafspraak — Heijmans', type: 'KLANT_GESPREK', vacancy: 'Nieuwe vacature bespreken', location: 'Rotterdam, kantoor Heijmans', duration: 60 },
  { id: '3', time: '14:00', title: 'Follow-up — Lisa Molenaar', type: 'FOLLOW_UP', vacancy: 'Calculator Civiel', location: 'Telefonisch', duration: 15 },
  { id: '4', time: '15:30', title: 'Introductie — Sophie de Vries', type: 'KANDIDATEN_GESPREK', vacancy: 'Werkvoorbereider Civiel', location: 'Kantoor The Move Maker', duration: 60 },
]

const tomorrowAppointments = [
  { id: '5', time: '09:00', title: 'Klantafspraak — VolkerWessels', type: 'KLANT_GESPREK', vacancy: 'Projectleider Civiel', location: 'Amsterdam', duration: 90 },
  { id: '6', time: '13:00', title: 'Gesprek — Tom de Boer', type: 'KANDIDATEN_GESPREK', vacancy: 'Engineer Werktuigbouw', location: 'Online (Zoom)', duration: 45 },
]

export function AdminAgenda() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Agenda</h1>
          <p className="text-muted mt-1">Gesprekken, klantafspraken en follow-ups.</p>
        </div>
        <Button asChild>
          <a href="/admin/agenda/nieuw">＋ Afspraak</a>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Vandaag</CardTitle>
              <span className="text-sm text-muted">4 afspraken</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayAppointments.map((apt) => (
              <div key={apt.id} className="flex gap-3 p-3 bg-soft rounded-xl hover:bg-white transition-colors border border-line">
                <div className="w-16 text-center flex-shrink-0">
                  <p className="font-bold text-lg text-navy">{apt.time}</p>
                  <p className="text-xs text-muted">{apt.duration} min</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{apt.title}</p>
                  <p className="text-sm text-muted">{apt.vacancy}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {apt.type === 'KLANT_GESPREK' ? 'Klant' : 'Kandidaat'}</span>
                    <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {apt.location}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="p-1.5">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Morgen</CardTitle>
              <span className="text-sm text-muted">2 afspraken</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {tomorrowAppointments.map((apt) => (
              <div key={apt.id} className="flex gap-3 p-3 bg-soft rounded-xl hover:bg-white transition-colors border border-line">
                <div className="w-16 text-center flex-shrink-0">
                  <p className="font-bold text-lg text-navy">{apt.time}</p>
                  <p className="text-xs text-muted">{apt.duration} min</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{apt.title}</p>
                  <p className="text-sm text-muted">{apt.vacancy}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {apt.type === 'KLANT_GESPREK' ? 'Klant' : 'Kandidaat'}</span>
                    <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {apt.location}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="p-1.5">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Snel acties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <a href="/admin/agenda/week">Weekoverzicht →</a>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <a href="/admin/agenda/maand">Maandoverzicht →</a>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <a href="/admin/agenda/sync">Kalender synchroniseren →</a>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2" asChild>
              <a href="/admin/agenda/instellingen">Instellingen →</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}