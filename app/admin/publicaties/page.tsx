'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { cn } from '@/lib/utils'
import { Plus, ExternalLink, Settings, CheckCircle, AlertCircle, Clock, Wifi, WifiOff, ChevronRight } from 'lucide-react'

const connectors = [
  { id: 'website', name: 'Eigen website', description: 'Publiceer direct op themovemaker.nl', status: 'connected', icon: '🌐', lastSync: '2 min geleden' },
  { id: 'google', name: 'Google for Jobs', description: 'Via JobPosting structured data', status: 'active', icon: 'G', lastSync: '1 uur geleden' },
  { id: 'linkedin', name: 'LinkedIn', description: 'ATS / Job Posting connector', status: 'connected', icon: 'in', lastSync: '5 min geleden' },
  { id: 'indeed', name: 'Indeed', description: 'Job Sync API connector', status: 'connected', icon: 'i', lastSync: '3 min geleden' },
  { id: 'nv', name: 'Nationale Vacaturebank', description: 'API/feed configuratie nog nodig', status: 'not_connected', icon: 'N', lastSync: null },
  { id: 'jobbird', name: 'Jobbird', description: 'API/feed configuratie nog nodig', status: 'not_connected', icon: 'J', lastSync: null },
  { id: 'monster', name: 'Monsterboard', description: 'API/feed configuratie nog nodig', status: 'not_connected', icon: 'M', lastSync: null },
  { id: 'werkzoeken', name: 'Werkzoeken.nl', description: 'API/feed configuratie nog nodig', status: 'not_connected', icon: 'W', lastSync: null },
  { id: 'jooble', name: 'Jooble', description: 'API/feed configuratie nog nodig', status: 'not_connected', icon: 'J', lastSync: null },
]

const publications = [
  { id: '1', vacancy: 'Uitvoerder Bouw', channel: 'LinkedIn', status: 'LIVE', externalId: 'LI-982182', publishedAt: 'Vandaag 10:45', lastSync: '2 min geleden' },
  { id: '2', vacancy: 'Uitvoerder Bouw', channel: 'Indeed', status: 'LIVE', externalId: 'IND-37821', publishedAt: 'Vandaag 10:46', lastSync: '3 min geleden' },
  { id: '3', vacancy: 'Projectleider Techniek', channel: 'Google for Jobs', status: 'ELIGIBLE', externalId: '—', publishedAt: 'Automatisch', lastSync: '1 uur geleden' },
  { id: '4', vacancy: 'Werkvoorbereider Civiel', channel: 'Eigen website', status: 'LIVE', externalId: 'TMM-1245', publishedAt: 'Gisteren 14:22', lastSync: '2 uur geleden' },
  { id: '5', vacancy: 'Calculator Bouw', channel: 'Eigen website', status: 'CONCEPT', externalId: '—', publishedAt: '—', lastSync: '—' },
]

const statusVariants: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'gray'> = {
  LIVE: 'success',
  ELIGIBLE: 'info',
  CONCEPT: 'gray',
  IN_WACHTRIJ: 'warning',
  FOUD: 'danger',
  VERLOPEN: 'gray',
  INGETROKKEN: 'gray',
}

export function AdminPublicaties() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Publicaties & koppelingen</h1>
          <p className="text-muted mt-1">Beheer jobboards, feeds, API-koppelingen en publicatiestatussen.</p>
        </div>
        <Button asChild>
          <a href="/admin/publicaties/nieuw">Nieuwe publicatie</a>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {connectors.map((connector) => (
          <Card key={connector.id}>
            <CardHeader className="flex flex-row items-start justify-between pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-soft flex items-center justify-center font-black text-lg">
                  {connector.icon}
                </div>
                <div>
                  <CardTitle>{connector.name}</CardTitle>
                  <p className="text-sm text-muted">{connector.description}</p>
                </div>
              </div>
              <Badge variant={connector.status === 'connected' || connector.status === 'active' ? 'success' : 'gray'}>
                {connector.status === 'connected' ? 'Verbonden' : connector.status === 'active' ? 'Actief' : 'Niet gekoppeld'}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Laatste sync</span>
                <span className="font-medium">
                  {connector.lastSync ? (
                    <>
                      <CheckCircle className="w-4 h-4 inline text-green-600 mr-1" /> {connector.lastSync}
                    </>
                  ) : (
                    <span className="text-muted">Nog nooit</span>
                  )}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="flex-1" disabled={connector.status === 'not_connected'}>
                  {connector.status === 'not_connected' ? 'Koppeling instellen' : 'Instellingen'}
                </Button>
                {(connector.status === 'connected' || connector.status === 'active') && (
                  <Button variant="ghost" size="sm" className="px-3">
                    Test
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <CardHeader className="px-6 py-4">
          <CardTitle>Recente publicaties</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vacature</TableHead>
                <TableHead>Kanaal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Extern ID</TableHead>
                <TableHead>Publicatiedatum</TableHead>
                <TableHead>Laatste sync</TableHead>
                <TableHead className="w-30"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publications.map((pub) => (
                <TableRow key={pub.id}>
                  <TableCell>
                    <p className="font-medium">{pub.vacancy}</p>
                  </TableCell>
                  <TableCell>{pub.channel}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariants[pub.status] || 'gray'}>{pub.status}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{pub.externalId}</TableCell>
                  <TableCell>{pub.publishedAt}</TableCell>
                  <TableCell>{pub.lastSync}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="p-1.5" title="Details">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}