'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'
import { Building2, Users, Shield, Key, Globe, Bell, ChevronRight, Edit, Save, Loader2 } from 'lucide-react'

export function AdminInstellingen() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Instellingen</h1>
        <p className="text-muted mt-1">Accounts, gebruikers, branding en integraties.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Organisatie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-soft rounded-lg">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime to-[#e9ffc0] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-navy" />
              </div>
              <div>
                <p className="font-bold">The Move Maker</p>
                <p className="text-sm text-muted">Recruitment voor bouw, civiel & techniek</p>
              </div>
            </div>
            <Input label="Bedrijfsnaam" value="The Move Maker" onChange={() => {}} />
            <Input label="Website" value="https://themovemaker.nl" onChange={() => {}} />
            <Input label="E-mail" value="info@themovemaker.nl" onChange={() => {}} />
            <Input label="Telefoon" value="055 - 000 00 00" onChange={() => {}} />
            <Input label="Adres" value="Apeldoorn, Nederland" onChange={() => {}} />
            <Input label="KvK nummer" value="12345678" onChange={() => {}} />
            <Input label="BTW nummer" value="NL123456789B01" onChange={() => {}} />
            <Button className="w-full">Opslaan</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Gebruikers & rollen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              {[
                { name: 'Niels van Gortel', email: 'niels@themovemaker.nl', role: 'Administrator', status: 'Actief', avatar: 'N' },
                { name: 'Mark de Jong', email: 'mark@themovemaker.nl', role: 'Recruiter', status: 'Actief', avatar: 'M' },
                { name: 'Lisa Bakker', email: 'lisa@themovemaker.nl', role: 'Recruiter', status: 'Actief', avatar: 'L' },
                { name: 'Thomas Jansen', email: 'thomas@themovemaker.nl', role: 'Marketeer', status: 'Actief', avatar: 'T' },
              ].map((user) => (
                <div key={user.email} className="flex items-center justify-between p-3 border border-line rounded-xl hover:bg-soft transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={user.role === 'Administrator' ? 'purple' : user.role === 'Recruiter' ? 'info' : 'success'} className="text-xs">
                      {user.role}
                    </Badge>
                    <Badge variant={user.status === 'Actief' ? 'success' : 'gray'} className="text-xs">
                      {user.status}
                    </Badge>
                    <Button variant="ghost" size="sm" className="p-1.5">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">＋ Gebruiker uitnodigen</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Integraties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'LinkedIn', icon: 'in', status: 'connected', description: 'ATS / Job Posting connector' },
              { name: 'Indeed', icon: 'i', status: 'connected', description: 'Job Sync API connector' },
              { name: 'Nationale Vacaturebank', icon: 'N', status: 'disconnected', description: 'API/feed configuratie nodig' },
              { name: 'Jobbird', icon: 'J', status: 'disconnected', description: 'API/feed configuratie nodig' },
              { name: 'Google for Jobs', icon: 'G', status: 'active', description: 'Via structured data' },
            ].map((integration) => (
              <div key={integration.name} className="flex items-center justify-between p-3 border border-line rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-soft flex items-center justify-center font-black">
                    {integration.icon}
                  </div>
                  <div>
                    <p className="font-medium">{integration.name}</p>
                    <p className="text-sm text-muted">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={integration.status === 'connected' || integration.status === 'active' ? 'success' : 'gray'}>
                    {integration.status === 'connected' ? 'Verbonden' : integration.status === 'active' ? 'Actief' : 'Niet gekoppeld'}
                  </Badge>
                  <Button variant="ghost" size="sm" className="p-1.5" disabled={integration.status === 'disconnected'}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <a href="/admin/publicaties">Alle koppelingen beheren →</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border-2 border-line rounded-xl cursor-pointer hover:border-lime/50 transition-colors">
                <input type="radio" name="theme" defaultChecked className="w-4 h-4 text-lime" />
                <div className="flex-1">
                  <p className="font-medium">Standaard The Move Maker</p>
                  <p className="text-sm text-muted">Donkerblauw & Lime groen</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 border-2 border-line rounded-xl cursor-pointer hover:border-lime/50 transition-colors">
                <input type="radio" name="theme" className="w-4 h-4 text-lime" />
                <div className="flex-1">
                  <p className="font-medium">Aangepast thema</p>
                  <p className="text-sm text-muted">Eigen kleuren & logo</p>
                </div>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Primaire kleur" value="#d6ff55" onChange={() => {}} />
              <Input label="Secundaire kleur" value="#071b2a" onChange={() => {}} />
            </div>
            <Input label="Logo URL" value="/logo.svg" onChange={() => {}} />
            <Input label="Favicon URL" value="/favicon.ico" onChange={() => {}} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificaties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: 'Nieuwe sollicitatie', description: 'E-mail bij nieuwe sollicitatie', enabled: true },
              { title: 'Dagelijkse samenvatting', description: 'Dagelijks om 08:00 uur', enabled: true },
              { title: 'Wekelijkse rapportage', description: 'Elke maandag ochtend', enabled: false },
              { title: 'Vacature verloopt', description: '3 dagen voor verloopdatum', enabled: true },
              { title: 'Kandidaat update', description: 'Wanneer status verandert', enabled: false },
            ].map((notification) => (
              <label key={notification.title} className="flex items-center justify-between p-3 border border-line rounded-xl cursor-pointer">
                <div>
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-muted">{notification.description}</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={notification.enabled}
                  className="w-5 h-5 text-lime border-line rounded focus:ring-lime"
                />
              </label>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}