'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Select } from '@/components/ui/Select'
import { cn } from '@/lib/utils'
import { TrendingUp, Users, Briefcase, CheckCircle, Clock, BarChart3, Target, DollarSign } from 'lucide-react'

const metrics = [
  { label: 'Sollicitaties', value: '187', trend: '+12%', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { label: 'Gesprekken', value: '54', trend: '+8%', icon: MessageSquare, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  { label: 'Plaatsingen', value: '18', trend: '+25%', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
  { label: 'Gem. time-to-hire', value: '21 d', trend: '-3 dagen', icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-100' },
]

const channelData = [
  { channel: 'Eigen website', applications: 62, interviews: 22, placements: 8, conversion: '12.9%' },
  { channel: 'LinkedIn', applications: 48, interviews: 18, placements: 6, conversion: '12.5%' },
  { channel: 'Indeed', applications: 35, interviews: 10, placements: 3, conversion: '8.6%' },
  { channel: 'Nationale Vacaturebank', applications: 22, interviews: 4, placements: 1, conversion: '4.5%' },
  { channel: 'Jobbird', applications: 12, interviews: 0, placements: 0, conversion: '0%' },
  { channel: 'Overig', applications: 8, interviews: 0, placements: 0, conversion: '0%' },
]

const conversionRates = [
  { label: 'Website → sollicitatie', value: '6,8%' },
  { label: 'Sollicitatie → gesprek', value: '28,9%' },
  { label: 'Gesprek → plaatsing', value: '33,3%' },
]

export function AdminRapportages() {
  const [timeRange, setTimeRange] = useState('Deze maand')

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Rapportages</h1>
          <p className="text-muted mt-1">Meet bereik, sollicitaties, conversie en plaatsingen per kanaal.</p>
        </div>
        <Select
          value={timeRange}
          onChange={setTimeRange}
          options={[
            { value: 'Deze week', label: 'Deze week' },
            { value: 'Deze maand', label: 'Deze maand' },
            { value: 'Dit kwartaal', label: 'Dit kwartaal' },
            { value: 'Dit jaar', label: 'Dit jaar' },
          ]}
          className="w-48"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-3">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', metric.bgColor)}>
                <metric.icon className={cn('w-5 h-5', metric.color)} />
              </div>
              <CardTitle className="text-sm font-bold text-muted mt-3">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-ink">{metric.value}</div>
              <div className="text-xs font-medium text-green-600 mt-1">{metric.trend}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sollicitaties per kanaal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-center gap-3 px-2">
              {channelData.map((data) => (
                <div key={data.channel} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-lime to-[#e9ffc0] rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${Math.max((data.applications / 62) * 100, 10)}%`, minHeight: '20px' }}
                  />
                  <span className="text-xs text-muted mt-2 text-center">{data.channel}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted border-b border-line">
                    <th className="pb-2">Kanaal</th>
                    <th className="pb-2 text-right">Sollicitaties</th>
                    <th className="pb-2 text-right">Gesprekken</th>
                    <th className="pb-2 text-right">Plaatsingen</th>
                    <th className="pb-2 text-right">Conversie</th>
                  </tr>
                </thead>
                <tbody>
                  {channelData.map((data) => (
                    <tr key={data.channel} className="border-b border-line">
                      <td className="py-3 font-medium">{data.channel}</td>
                      <td className="py-3 text-right">{data.applications}</td>
                      <td className="py-3 text-right">{data.interviews}</td>
                      <td className="py-3 text-right font-bold text-green-600">{data.placements}</td>
                      <td className="py-3 text-right">{data.conversion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {conversionRates.map((rate) => (
              <div key={rate.label} className="flex items-center justify-between p-3 bg-soft rounded-lg">
                <span className="text-sm">{rate.label}</span>
                <span className="font-bold text-lg text-lime">{rate.value}</span>
              </div>
            ))}
            <div className="pt-4 border-t border-line">
              <p className="text-sm font-medium mb-2">Beste bron deze maand</p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold">LinkedIn</p>
                  <p className="text-xs text-muted">Meeste plaatsingen</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Sector performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'Bouw', apps: 52, placed: 6 },
              { name: 'Civiel', apps: 38, placed: 4 },
              { name: 'Techniek', apps: 45, placed: 5 },
              { name: 'Engineering', apps: 28, placed: 2 },
              { name: 'Installatie', apps: 15, placed: 1 },
            ].map((sector) => (
              <div key={sector.name} className="flex items-center justify-between">
                <span className="font-medium">{sector.name}</span>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted">{sector.apps} sollicitaties</span>
                  <span className="font-bold text-green-600">{sector.placed} geplaatst</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recruiter performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'Mark de Jong', apps: 45, placed: 6, avgDays: 18 },
              { name: 'Lisa Bakker', apps: 38, placed: 5, avgDays: 22 },
              { name: 'Thomas Jansen', apps: 32, placed: 4, avgDays: 25 },
            ].map((recruiter) => (
              <div key={recruiter.name} className="p-3 bg-soft rounded-lg">
                <p className="font-medium">{recruiter.name}</p>
                <div className="flex gap-4 text-xs text-muted mt-1">
                  <span>{recruiter.apps} sollicitaties</span>
                  <span>{recruiter.placed} geplaatst</span>
                  <span>{recruiter.avgDays} gem. dagen</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jobboard performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'LinkedIn', cost: '€ 2.450', apps: 48, cpa: '€ 51' },
              { name: 'Indeed', cost: '€ 1.800', apps: 35, cpa: '€ 51' },
              { name: 'Nationale Vacaturebank', cost: '€ 1.200', apps: 22, cpa: '€ 55' },
              { name: 'Jobbird', cost: '€ 800', apps: 12, cpa: '€ 67' },
            ].map((board) => (
              <div key={board.name} className="p-3 bg-soft rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium">{board.name}</span>
                  <span className="font-bold text-green-600">{board.cpa}</span>
                </div>
                <div className="text-xs text-muted mt-1">
                  Kosten: {board.cost} • {board.apps} sollicitaties
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { MessageSquare } from 'lucide-react'