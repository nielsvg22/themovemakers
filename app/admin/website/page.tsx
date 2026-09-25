'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import { Home, Briefcase, Users, Star, FileText, Search, ChevronRight, Edit, Globe } from 'lucide-react'

const pages = [
  { id: 'home', name: 'Homepage', icon: Home, sections: ['Hero', 'Sectoren', 'Werkgeverscontent', 'Cases', 'Team'], status: 'live' },
  { id: 'vacatures', name: 'Vacatureoverzicht', icon: Briefcase, sections: ['Filters', 'Sidebar', 'Job cards', 'SEO'], status: 'live' },
  { id: 'vacature-detail', name: 'Vacature detail', icon: FileText, sections: ['Tabs', 'Sidebar', 'Solliciteren', 'Structured data'], status: 'live' },
  { id: 'sectors', name: 'Vakgebied pagina\'s', icon: Briefcase, sections: ['Bouw', 'Civiel', 'Techniek', 'Engineering', 'Installatietechniek', 'Projectmanagement'], status: 'live' },
  { id: 'werkgevers', name: 'Voor werkgevers', icon: Users, sections: ['Hero', 'Diensten', 'Aanpak', 'Cases', 'Recruitment marketing'], status: 'live' },
  { id: 'kandidaten', name: 'Voor kandidaten', icon: User, sections: ['Hero', 'Vacatures zoeken', 'Alerts', 'Open sollicitatie'], status: 'live' },
  { id: 'cases', name: 'Cases & testimonials', icon: Star, sections: ['Cases overzicht', 'Testimonials', 'Stats'], status: 'live' },
  { id: 'contact', name: 'Contact', icon: Mail, sections: ['Formulier', 'Contactgegevens', 'Recruitmentscan'], status: 'live' },
  { id: 'seo', name: 'SEO instellingen', icon: Search, sections: ['Meta tags', 'Sitemap', 'Robots.txt', 'Structured data'], status: 'draft' },
]

export function AdminWebsite() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Websitebeheer</h1>
          <p className="text-muted mt-1">Beheer content van de publieke website.</p>
        </div>
        <Button asChild>
          <a href="/admin/website/nieuwe-pagina" target="_blank">
            <Globe className="w-4 h-4 mr-2" /> Publieke site bekijken
          </a>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page) => (
          <Card key={page.id} className="hover:shadow-card-hover transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-soft flex items-center justify-center">
                  <page.icon className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <CardTitle>{page.name}</CardTitle>
                  <Badge variant={page.status === 'live' ? 'success' : 'warning'} className="text-xs">
                    {page.status === 'live' ? 'Live' : 'Concept'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-1">
                {page.sections.map((section) => (
                  <Badge key={section} variant="gray" className="text-xs">{section}</Badge>
                ))}
              </div>
              <div className="flex gap-2 pt-2 border-t border-line">
                <Button variant="ghost" size="sm" className="flex-1 justify-center gap-1" asChild>
                  <a href={`/admin/website/${page.id}/bewerken`}>
                    <Edit className="w-4 h-4" /> Bewerken
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 justify-center gap-1" asChild>
                  <a href={`/${page.id === 'home' ? '' : page.id}`} target="_blank">
                    <Globe className="w-4 h-4" /> Bekijken
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}