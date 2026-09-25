import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSalary(min?: number | null, max?: number | null, period: string = 'maand'): string {
  if (!min && !max) return 'Marktconform'
  if (min && max) return `€ ${min.toLocaleString('nl-NL')} - € ${max.toLocaleString('nl-NL')} per ${period}`
  if (min) return `€ ${min.toLocaleString('nl-NL')}+ per ${period}`
  return `Tot € ${max!.toLocaleString('nl-NL')} per ${period}`
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  })
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Zojuist'
  if (diffMins < 60) return `${diffMins} min geleden`
  if (diffHours < 24) return `${diffHours} uur geleden`
  if (diffDays < 7) return `${diffDays} dag${diffDays > 1 ? 'en' : ''} geleden`
  return formatDate(d)
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    CONCEPT: 'bg-gray-100 text-gray-700',
    ACTIEF: 'bg-green-100 text-green-700',
    GEPAUZEERD: 'bg-yellow-100 text-yellow-700',
    INGEVULD: 'bg-blue-100 text-blue-700',
    VERLOPEN: 'bg-red-100 text-red-700',
    NIEUW: 'bg-blue-100 text-blue-700',
    SCREENING: 'bg-yellow-100 text-yellow-700',
    CONTACT: 'bg-orange-100 text-orange-700',
    GESPREK: 'bg-purple-100 text-purple-700',
    VOORGESTELD: 'bg-indigo-100 text-indigo-700',
    GESPREK_OPDRACHTGEVER: 'bg-pink-100 text-pink-700',
    AANBOD: 'bg-emerald-100 text-emerald-700',
    GEPLAATST: 'bg-green-100 text-green-700',
    AFGEWEZEN: 'bg-red-100 text-red-700',
    LIVE: 'bg-green-100 text-green-700',
    IN_WACHTRIJ: 'bg-yellow-100 text-yellow-700',
    FOUD: 'bg-red-100 text-red-700',
    GETEST: 'bg-gray-100 text-gray-700',
    NIEUWE: 'bg-blue-100 text-blue-700',
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

export function getChannelLabel(channel: string): string {
  const labels: Record<string, string> = {
    EIGEN_WEBSITE: 'Eigen website',
    GOOGLE_FOR_JOBS: 'Google for Jobs',
    LINKEDIN: 'LinkedIn',
    INDEED: 'Indeed',
    NATIONALE_VACATUREBANK: 'Nationale Vacaturebank',
    JOBBIRD: 'Jobbird',
    JOOBLE: 'Jooble',
    MONSTERBOARD: 'Monsterboard',
    WERKZOEKEN_NL: 'Werkzoeken.nl',
    TOPVACATUREBANK: 'TopVacaturebank',
    JOBER: 'Jober',
    JOBSONLINE: 'Jobsonline',
    TWENTY4WERK: '24werk',
    NUBANEN: 'NuBanen',
  }
  return labels[channel] || channel
}

export function getChannelIcon(channel: string): string {
  const icons: Record<string, string> = {
    EIGEN_WEBSITE: '🌐',
    GOOGLE_FOR_JOBS: 'G',
    LINKEDIN: 'in',
    INDEED: 'i',
    NATIONALE_VACATUREBANK: 'N',
    JOBBIRD: 'J',
    JOOBLE: 'J',
    MONSTERBOARD: 'M',
    WERKZOEKEN_NL: 'W',
    TOPVACATUREBANK: 'T',
    JOBER: 'J',
    JOBSONLINE: 'J',
    TWENTY4WERK: '24',
    NUBANEN: 'N',
  }
  return icons[channel] || '📋'
}