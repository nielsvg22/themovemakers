import 'server-only'
import { prisma } from '@/lib/db/prisma'
import { homeSectors, images, caseImages } from './site'

const KEY = 'site.images'

export type SiteImages = {
  sectors: Record<string, string>
  images: Record<keyof typeof images, string>
  caseImages: Record<keyof typeof caseImages, string>
}

function defaults(): SiteImages {
  return {
    sectors: Object.fromEntries(homeSectors.map((s) => [s.name, s.img])),
    images: { ...images },
    caseImages: { ...caseImages },
  }
}

/** Afbeeldingen van de publieke site: standaardwaarden uit de code, overschreven met wat in de admin is opgeslagen. */
export async function getSiteImages(): Promise<SiteImages> {
  const base = defaults()
  const row = await prisma.appSetting.findUnique({ where: { key: KEY } })
  if (!row) return base
  try {
    const overrides = JSON.parse(row.value) as Partial<SiteImages>
    return {
      sectors: { ...base.sectors, ...overrides.sectors },
      images: { ...base.images, ...overrides.images },
      caseImages: { ...base.caseImages, ...overrides.caseImages },
    }
  } catch {
    return base
  }
}

export async function saveSiteImages(data: SiteImages) {
  await prisma.appSetting.upsert({ where: { key: KEY }, update: { value: JSON.stringify(data) }, create: { key: KEY, value: JSON.stringify(data) } })
}
