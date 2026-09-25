'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { requireStaffSession } from '@/lib/auth/session'
import { getSiteImages, saveSiteImages, type SiteImages } from '@/lib/data/site-images'
import type { FormResult } from './manage-actions'

const urlField = z.string().trim().url('Vul een geldige URL in (begint met http:// of https://)').or(z.literal(''))

export async function saveSiteImagesAction(_: FormResult, formData: FormData): Promise<FormResult> {
  await requireStaffSession()
  const current = await getSiteImages()
  const errors: string[] = []

  const resolve = (key: string, fallback: string) => {
    const raw = String(formData.get(key) ?? '').trim()
    if (!raw) return fallback
    const parsed = urlField.safeParse(raw)
    if (!parsed.success) {
      errors.push(key)
      return fallback
    }
    return raw
  }

  const next: SiteImages = {
    sectors: Object.fromEntries(Object.entries(current.sectors).map(([name, url]) => [name, resolve(`sector.${name}`, url)])),
    images: Object.fromEntries(Object.entries(current.images).map(([key, url]) => [key, resolve(`image.${key}`, url)])) as SiteImages['images'],
    caseImages: Object.fromEntries(Object.entries(current.caseImages).map(([key, url]) => [key, resolve(`case.${key}`, url)])) as SiteImages['caseImages'],
  }

  if (errors.length) return { ok: false, message: `Ongeldige URL bij: ${errors.join(', ')}` }

  await saveSiteImages(next)
  revalidatePath('/', 'layout')
  return { ok: true, message: 'Afbeeldingen opgeslagen.' }
}
