import Link from 'next/link'
import { getSiteImages } from '@/lib/data/site-images'
import { SiteImagesForm } from '@/components/admin/SiteImagesForm'

export const dynamic = 'force-dynamic'

const imageLabels: Record<string, string> = {
  hero: 'Hero-afbeelding homepage',
  team: "Teamfoto (Over ons / Voor werkgevers)",
  bouwHero: 'Header-afbeelding Bouw-pagina',
  jobDetail: 'Standaardfoto vacature (als de vacature zelf geen foto heeft)',
  recruiter: 'Foto recruiter (Bouw-pagina)',
  ctaJob: 'Foto blok "Ik zoek baan"',
  ctaStaff: 'Foto blok "Ik zoek personeel"',
}

const caseLabels: Record<string, string> = {
  bouw: 'Case: Bouw',
  civiel: 'Case: Civiel',
  techniek: 'Case: Techniek',
}

const sections = [
  { name: 'Vakgebieden', text: 'Bouw, Civiel, Techniek, Engineering.', href: '/vacatures/bouw' },
  { name: 'Cases & testimonials', text: 'Resultaten en klantverhalen.', href: '/voor-werkgevers' },
]

export default async function WebsitebeheerPage() {
  const site = await getSiteImages()
  const groups = [
    { title: 'Sectorfoto’s (op de homepage)', fields: Object.entries(site.sectors).map(([name, value]) => ({ key: `sector.${name}`, label: name, value })) },
    { title: 'Homepage & overige pagina’s', fields: Object.entries(site.images).map(([key, value]) => ({ key: `image.${key}`, label: imageLabels[key] ?? key, value })) },
    { title: 'Resultaten / cases', fields: Object.entries(site.caseImages).map(([key, value]) => ({ key: `case.${key}`, label: caseLabels[key] ?? key, value })) },
  ]

  return (
    <>
      <div className="page-head">
        <div><h1>Websitebeheer</h1><p>Beheer de afbeeldingen van de publieke website. Vacaturefoto&apos;s bewerk je per vacature.</p></div>
      </div>
      <div className="card panel" style={{ marginBottom: 16 }}>
        <SiteImagesForm groups={groups} />
      </div>
      <div className="grid connector-grid">
        {sections.map((s) => (
          <div key={s.name} className="card connector"><h3>{s.name}</h3><p>{s.text}</p><Link href={s.href} className="btn ghost">Bekijk op de site</Link></div>
        ))}
      </div>
    </>
  )
}
