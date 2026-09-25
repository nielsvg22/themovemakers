'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Search } from '@/components/ui/Search'
import { cn, formatRelativeTime } from '@/lib/utils'
import { TrendingUp, Users, Briefcase, CheckCircle, Clock, BarChart3, PieChart, Activity, ArrowRight, ExternalLink } from 'lucide-react'

const kpiData = [
  { label: 'Actieve vacatures', value: '28', trend: '+12%', trendLabel: 't.o.v. vorige maand', icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { label: 'Nieuwe sollicitaties', value: '67', trend: '+28%', trendLabel: '', icon: Users, color: 'text-green-600', bgColor: 'bg-green-100' },
  { label: 'Kandidaten in procedure', value: '24', trend: '+9%', trendLabel: '', icon: User, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  { label: 'Plaatsingen', value: '6', trend: '+50%', trendLabel: '', icon: CheckCircle, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  { label: 'Openstaande taken', value: '12', trend: '-25%', trendLabel: '', icon: Clock, color: 'text-red-600', bgColor: 'bg-red-100', negative: true },
]

const recentApplications = [
  { candidate: 'Sophie de Vries', role: 'Werkvoorbereider', vacancy: 'Uitvoerder Bouw', status: 'NIEUW', source: 'LinkedIn', time: '2 minuten geleden' },
  { candidate: 'Mark Jansen', role: 'Projectleider', vacancy: 'Projectleider Techniek', status: 'SCREENING', source: 'Indeed', time: '1 uur geleden' },
  { candidate: 'Lisa Molenaar', role: 'Calculator', vacancy: 'Calculator Civiel', status: 'GESPREK', source: 'Website', time: '3 uur geleden' },
  { candidate: 'Thomas Bakker', role: 'Engineer', vacancy: 'Engineer Werktuigbouw', status: 'VOORGESTELD', source: 'LinkedIn', time: '5 uur geleden' },
  { candidate: 'Eva van Dijk', role: 'Uitvoerder', vacancy: 'Uitvoerder Bouw', status: 'GEPLAATST', source: 'Website', time: '1 dag geleden' },
]

const attentionVacancies = [
  { title: 'Werkvoorbereider Bouw', company: 'Heijmans', badge: 'Weinig sollicitaties', badgeVariant: 'danger' },
  { title: 'Projectleider Civiel', company: 'VolkerWessels', badge: 'Bijna verlopen', badgeVariant: 'warning' },
  { title: 'Timmerman', company: 'Strukton', badge: 'Concept', badgeVariant: 'gray' },
]

const activities = [
  { icon: User, text: 'Lisa heeft kandidaat toegevoegd', time: '2 minuten geleden', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { icon: CheckCircle, text: 'Vacature gepubliceerd', time: '1 uur geleden', color: 'text-green-600', bgColor: 'bg-green-100' },
  { icon: Activity, text: 'Mark heeft notitie toegevoegd', time: '2 uur geleden', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  { icon: Users, text: 'Nieuwe sollicitatie ontvangen', time: '3 uur geleden', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { icon: Briefcase, text: 'Bedrijf Heijmans bijgewerkt', time: '5 uur geleden', color: 'text-gray-600', bgColor: 'bg-gray-100' },
]

const publications = [
  { name: 'Eigen website', icon: '🌐', status: 'Gepubliceerd', statusVariant: 'success', detail: 'Vandaag 10:42' },
  { name: 'Google for Jobs', icon: 'G', status: 'Actief', statusVariant: 'success', detail: 'Structured data' },
  { name: 'LinkedIn', icon: 'in', status: 'Gepubliceerd', statusVariant: 'success', detail: 'Vandaag 10:45' },
  { name: 'Indeed', icon: 'i', status: 'Gepubliceerd', statusVariant: 'success', detail: 'Vandaag 10:46' },
  { name: 'Nationale Vacaturebank', icon: 'N', status: 'Niet gekoppeld', statusVariant: 'gray', detail: 'Koppeling instellen' },
  { name: 'Jobbird', icon: 'J', status: 'Niet gekoppeld', statusVariant: 'gray', detail: 'Koppeling instellen' },
  { name: 'Monsterboard', icon: 'M', status: 'Niet gekoppeld', statusVariant: 'gray', detail: 'Koppeling instellen' },
  { name: 'Werkzoeken.nl', icon: 'W', status: 'Niet gekoppeld', statusVariant: 'gray', detail: 'Koppeling instellen' },
  { name: 'Jooble', icon: 'J', status: 'Niet gekoppeld', statusVariant: 'gray', detail: 'Koppeling instellen' },
]

const sectorPerformance = [
  { name: 'Bouw', value: 90, count: 12 },
  { name: 'Civiel', value: 70, count: 8 },
  { name: 'Techniek', value: 60, count: 7 },
  { name: 'Engineering', value: 45, count: 5 },
  { name: 'Installatie', value: 35, count: 4 },
]

export function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('Deze maand')

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-muted mt-1">Welkom terug. Hier is een overzicht van je recruitmentactiviteiten.</p>
        </div>
        <Select
          value={timeRange}
          onChange={setTimeRange}
          options={[
            { value: 'Deze week', label: 'Deze week' },
            { value: 'Deze maand', label: 'Deze maand' },
            { value: 'Dit kwartaal', label: 'Dit kwartaal' },
          ]}
          className="w-48"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.label} className="relative">
            <CardHeader className="pb-3">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', kpi.bgColor)}>
                <kpi.icon className={cn('w-5 h-5', kpi.color)} />
              </div>
              <CardTitle className="text-sm font-bold text-muted mt-3">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-ink">{kpi.value}</div>
              <div className={cn('text-xs font-medium mt-1', kpi.negative ? 'text-red-600' : 'text-green-600')}>
                {kpi.trend} {kpi.trendLabel}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.45fr_1fr_1fr] gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Sollicitaties per week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-center gap-3 px-2">
              {[
                { week: 'W32', value: 35 },
                { week: 'W33', value: 45 },
                { week: 'W34', value: 50 },
                { week: 'W35', value: 63 },
                { week: 'W36', value: 77 },
                { week: 'W37', value: 58 },
                { week: 'W38', value: 88 },
                { week: 'W39', value: 47 },
              ].map((bar) => (
                <div key={bar.week} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-lime to-[#e9ffc0] rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${bar.value}%`, minHeight: '20px' }}
                  />
                  <span className="text-xs text-muted mt-2">{bar.week}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bronnen van kandidaten</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-40 h-40 mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="#e5eaed"
                  strokeWidth="16"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="#d6ff55"
                  strokeWidth="16"
                  strokeDasharray="439.6"
                  strokeDashoffset="439.6 * 0.68"
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="#2e6af3"
                  strokeWidth="16"
                  strokeDasharray="439.6"
                  strokeDashoffset="439.6 * 0.32"
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-ink font-black text-2xl">
                67<br /><span className="text-xs font-normal">totaal</span>
              </div>
            </div>
            <div className="w-full space-y-2 text-sm">
              {[
                { label: 'Eigen website', value: '32%', color: 'bg-lime' },
                { label: 'LinkedIn', value: '26%', color: 'bg-blue-500' },
                { label: 'Indeed', value: '18%', color: 'bg-purple-500' },
                { label: 'Nationale Vacaturebank', value: '10%', color: 'bg-orange-500' },
                { label: 'Overig', value: '14%', color: 'bg-gray-400' },
              ].map((source) => (
                <div key={source.label} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded ${source.color}`} />
                    {source.label}
                  </span>
                  <span className="font-bold">{source.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vacature performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sectorPerformance.map((sector) => (
                <div key={sector.name} className="grid grid-cols-[100px_1fr_30px] gap-3 items-center">
                  <span className="text-sm font-medium">{sector.name}</span>
                  <div className="h-2 bg-line rounded-full overflow-hidden">
                    <div
                      className="h-full bg-lime rounded-full transition-all duration-1000"
                      style={{ width: `${sector.value}%` }}
                    />
                  </div>
                  <span className="font-bold text-sm text-right">{sector.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_1fr_.8fr] gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recente sollicitaties</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <a href="/admin/sollicitaties">Bekijk alle →</a>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kandidaat</TableHead>
                  <TableHead>Vacature</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentApplications.map((app) => (
                  <TableRow key={app.candidate}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                          {app.candidate.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{app.candidate}</p>
                          <p className="text-xs text-muted">{app.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{app.vacancy}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(app.status)}>{app.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Vacatures die aandacht nodig hebben</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <a href="/admin/vacatures">Bekijk alle →</a>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vacature</TableHead>
                  <TableHead>Actie</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attentionVacancies.map((vacancy) => (
                  <TableRow key={vacancy.title}>
                    <TableCell>
                      <p className="font-medium">{vacancy.title}</p>
                      <p className="text-xs text-muted">{vacancy.company}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={vacancy.badgeVariant as any}>{vacancy.badge}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recente activiteit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.text} className="flex gap-3">
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', activity.bgColor)}>
                    <activity.icon className={cn('w-4 h-4', activity.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Publicatiekanalen</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <a href="/admin/publicaties">Instellingen →</a>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-3">
            {publications.map((pub) => (
              <div key={pub.name} className="bg-white border border-line rounded-xl p-4 space-y-2 min-h-[130px] flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-soft flex items-center justify-center font-black text-sm">{pub.icon}</span>
                  <span className="font-extrabold text-sm">{pub.name}</span>
                </div>
                <span className="text-xs text-muted">{pub.detail}</span>
                <Badge variant={pub.statusVariant as any} className="mt-auto">{pub.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getStatusVariant(status: string) {
  const variants: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'gray'> = {
    NIEUW: 'info',
    SCREENING: 'warning',
    CONTACT: 'warning',
    GESPREK: 'purple',
    VOORGESTELD: 'info',
    GESPREK_OPDRACHTGEVER: 'purple',
    AANBOD: 'success',
    GEPLAATST: 'success',
    AFGEWEZEN: 'danger',
  }
  return variants[status] || 'gray'
}

import { useState } from 'react'