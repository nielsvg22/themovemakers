'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { cn } from '@/lib/utils'
import { Plus, ChevronRight, Flag, User, Briefcase, Building2, Calendar, MoreVertical } from 'lucide-react'

const tasks = [
  { id: '1', title: 'Kandidaat bellen', linkedTo: 'Sophie de Vries', type: 'KANDIDAAT', deadline: 'Vandaag', priority: 'HOOG', status: 'OPEN' },
  { id: '2', title: 'Feedback opvragen', linkedTo: 'Heijmans', type: 'BEDRIJF', deadline: 'Morgen', priority: 'NORMAAL', status: 'OPEN' },
  { id: '3', title: 'CV doorsturen', linkedTo: 'Mark Jansen', type: 'KANDIDAAT', deadline: 'Overmorgen', priority: 'HOOG', status: 'IN_VOORTGANG' },
  { id: '4', title: 'Vacaturetekst nakijken', linkedTo: 'Projectleider Techniek', type: 'VACATURE', deadline: 'Deze week', priority: 'NORMAAL', status: 'OPEN' },
  { id: '5', title: 'Contract voorbereiden', linkedTo: 'Kevin Mulder', type: 'KANDIDAAT', deadline: 'Volgende week', priority: 'LAAG', status: 'OPEN' },
  { id: '6', title: 'Intake gesprek plannen', linkedTo: 'VolkerWessels', type: 'BEDRIJF', deadline: 'Vandaag', priority: 'HOOG', status: 'VOLTOOID' },
]

export function AdminTaken() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Taken</h1>
          <p className="text-muted mt-1">Volg acties op voor kandidaten, vacatures en klanten.</p>
        </div>
        <Button asChild>
          <a href="/admin/taken/nieuw">＋ Taak</a>
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Taak</TableHead>
              <TableHead>Gekoppeld aan</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Prioriteit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-30"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <p className="font-medium">{task.title}</p>
                </TableCell>
                <TableCell>{task.linkedTo}</TableCell>
                <TableCell>
                  <Badge variant="gray" className="text-xs">{task.type}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="w-3.5 h-3.5 text-muted" />
                    {task.deadline}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={task.priority === 'HOOG' ? 'danger' : task.priority === 'NORMAAL' ? 'warning' : 'gray'}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={task.status === 'VOLTOOID' ? 'success' : task.status === 'IN_VOORTGANG' ? 'info' : 'gray'}>
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="p-1.5">
                    <ChevronRight className="w-4 h-4" />
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