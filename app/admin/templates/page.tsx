'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { Plus, Mail, MessageSquare, FileText, ChevronRight, Edit, Trash2, Copy } from 'lucide-react'

const templates = [
  { id: '1', name: 'Bevestiging sollicitatie', type: 'E-mail', subject: 'Bevestiging ontvangst sollicitatie - {{vacature}}', usage: 'Automatisch bij nieuwe sollicitatie', isDefault: true },
  { id: '2', name: 'Uitnodiging gesprek', type: 'E-mail', subject: 'Uitnodiging kennismakingsgesprek - {{vacature}}', usage: 'Handmatig verzenden vanuit pipeline', isDefault: true },
  { id: '3', name: 'Afwijzing na gesprek', type: 'E-mail', subject: 'Uw sollicitatie bij {{bedrijf}}', usage: 'Handmatig verzenden vanuit pipeline', isDefault: false },
  { id: '4', name: 'Voorstel kandidaat', type: 'E-mail', subject: 'Kandidaatvoorstel: {{kandidaat}} voor {{vacature}}', usage: 'Handmatig verzenden naar opdrachtgever', isDefault: true },
  { id: '5', name: 'Follow-up na plaatsing', type: 'E-mail', subject: 'Hoe gaat het? - {{kandidaat}} bij {{bedrijf}}', usage: 'Automatisch na 30 dagen', isDefault: false },
  { id: '6', name: 'Vacature gesloten', type: 'E-mail', subject: 'Vacature {{vacature}} is ingevuld', usage: 'Automatisch bij status INGEVULD', isDefault: false },
]

export function AdminTemplates() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Templates</h1>
          <p className="text-muted mt-1">Beheer e-mail- en communicatietemplates.</p>
        </div>
        <Button asChild>
          <a href="/admin/templates/nieuw">＋ Template</a>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-card-hover transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-soft flex items-center justify-center">
                  {template.type === 'E-mail' && <Mail className="w-5 h-5 text-navy" />}
                </div>
                <div>
                  <CardTitle>{template.name}</CardTitle>
                  <Badge variant={template.isDefault ? 'success' : 'gray'} className="text-xs">Standaard</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted">{template.usage}</p>
              <div className="p-3 bg-soft rounded-lg text-sm font-mono truncate">{template.subject}</div>
              <div className="flex gap-2 pt-2 border-t border-line">
                <Button variant="ghost" size="sm" className="flex-1 justify-center gap-1" asChild>
                  <a href={`/admin/templates/${template.id}/bewerken`}>
                    <Edit className="w-4 h-4" /> Bewerken
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 justify-center gap-1">
                  <Copy className="w-4 h-4" /> Kopiëren
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}