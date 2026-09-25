// Vaste beelden en helpers voor de publieke website (vacatures zelf komen uit de database).

export interface Job {
  id?: string
  slug: string
  title: string
  company: string
  city: string
  salary: string
  hours: string
  type: string
  sector: string
  img: string
}

const unsplash = (id: string, w = 500) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

/** Bouw heeft een eigen sectorpagina; de overige vakgebieden openen de gefilterde vacaturelijst. */
export function sectorHref(sector: string) {
  return sector === 'Bouw' ? '/vacatures/bouw' : `/vacatures?sector=${encodeURIComponent(sector)}`
}

export const homeSectors = [
  { name: 'Bouw', img: unsplash('1504307651254-35680f356dfd', 700) },
  { name: 'Civiel', img: unsplash('1508450859948-4e04fabaa4ea', 700) },
  { name: 'Techniek', img: unsplash('1581092160562-40aa08e78837', 700) },
  { name: 'Engineering', img: unsplash('1581094794329-c8112a89af12', 700) },
  { name: 'Installatietechniek', img: unsplash('1504917595217-d4dc5ebe6122', 700) },
  { name: 'Projectmanagement', img: unsplash('1504917595217-d4dc5ebe6122', 700) },
]

export const images = {
  hero: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85',
  team: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=85',
  bouwHero: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=85',
  jobDetail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80',
  recruiter: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  ctaJob: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=85',
  ctaStaff: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=85',
}

export const caseImages = {
  bouw: unsplash('1504307651254-35680f356dfd', 800),
  civiel: unsplash('1508450859948-4e04fabaa4ea', 800),
  techniek: unsplash('1581092160562-40aa08e78837', 800),
}
