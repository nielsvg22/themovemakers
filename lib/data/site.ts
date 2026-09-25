// Voorbeelddata voor de publieke website, gelijk aan The-Move-Maker-feedback-design.html.

export interface Job {
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

export const jobs: Job[] = [
  { slug: 'uitvoerder-bouw-utrecht', title: 'Uitvoerder Bouw', company: 'BAM', city: 'Utrecht', salary: '€ 4.000 - € 5.500', hours: '32 - 40 uur', type: 'Vast', sector: 'Bouw', img: unsplash('1504307651254-35680f356dfd') },
  { slug: 'werkvoorbereider-bouw-rotterdam', title: 'Werkvoorbereider Bouw', company: 'Heijmans', city: 'Rotterdam', salary: '€ 3.500 - € 5.000', hours: '32 - 40 uur', type: 'Vast', sector: 'Bouw', img: unsplash('1541888946425-d81bb19240f5') },
  { slug: 'projectleider-bouw-eindhoven', title: 'Projectleider Bouw', company: 'VolkerWessels', city: 'Eindhoven', salary: '€ 5.000 - € 7.000', hours: '32 - 40 uur', type: 'Vast', sector: 'Bouw', img: unsplash('1513467655676-561b7d489a88') },
  { slug: 'timmerman-amsterdam', title: 'Timmerman', company: 'Strukton', city: 'Amsterdam', salary: '€ 2.800 - € 3.800', hours: '32 - 40 uur', type: 'Vast', sector: 'Bouw', img: unsplash('1503387762-592deb58ef4e') },
  { slug: 'projectcoordinator-civiel-gouda', title: 'Projectcoördinator Civiel', company: 'Boskalis', city: 'Gouda', salary: '€ 4.200 - € 5.700', hours: '36 - 40 uur', type: 'Vast', sector: 'Civiel', img: unsplash('1508450859948-4e04fabaa4ea') },
  { slug: 'engineer-werktuigbouw-arnhem', title: 'Engineer Werktuigbouw', company: 'SPIE', city: 'Arnhem', salary: '€ 3.800 - € 5.200', hours: '32 - 40 uur', type: 'Vast', sector: 'Engineering', img: unsplash('1581092160562-40aa08e78837') },
  { slug: 'monteur-installatietechniek-apeldoorn', title: 'Monteur Installatietechniek', company: 'Unica', city: 'Apeldoorn', salary: '€ 3.000 - € 4.100', hours: '32 - 40 uur', type: 'Vast', sector: 'Installatietechniek', img: unsplash('1581094794329-c8112a89af12') },
  { slug: 'technisch-projectmanager-arnhem', title: 'Technisch Projectmanager', company: 'TenneT', city: 'Arnhem', salary: '€ 5.400 - € 7.200', hours: '36 - 40 uur', type: 'Vast', sector: 'Projectmanagement', img: unsplash('1497366811353-6870744d04b2') },
]

export function findJob(slug: string): Job {
  return jobs.find((j) => j.slug === slug) ?? jobs[0]
}

export const jobCategories = [
  { name: 'Alle vacatures', filter: 'Alle', count: 38 },
  { name: 'Bouw', filter: 'Bouw', count: 12 },
  { name: 'Civiel', filter: 'Civiel', count: 8 },
  { name: 'Techniek', filter: 'Techniek', count: 7 },
  { name: 'Engineering', filter: 'Engineering', count: 5 },
  { name: 'Installatietechniek', filter: 'Installatietechniek', count: 4 },
  { name: 'Werkvoorbereiding', filter: 'Werkvoorbereiding', count: 3 },
  { name: 'Projectmanagement', filter: 'Projectmanagement', count: 2 },
]

/** Bouw heeft een eigen sectorpagina; de overige vakgebieden openen de gefilterde vacaturelijst. */
export function sectorHref(sector: string) {
  return sector === 'Bouw' ? '/vacatures/bouw' : `/vacatures?sector=${encodeURIComponent(sector)}`
}

export const homeSectors = [
  { name: 'Bouw', count: 12, img: unsplash('1504307651254-35680f356dfd', 700) },
  { name: 'Civiel', count: 8, img: unsplash('1508450859948-4e04fabaa4ea', 700) },
  { name: 'Techniek', count: 14, img: unsplash('1581092160562-40aa08e78837', 700) },
  { name: 'Engineering', count: 6, img: unsplash('1581094794329-c8112a89af12', 700) },
  { name: 'Installatietechniek', count: 9, img: unsplash('1504917595217-d4dc5ebe6122', 700) },
  { name: 'Projectmanagement', count: 5, img: unsplash('1504917595217-d4dc5ebe6122', 700) },
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
