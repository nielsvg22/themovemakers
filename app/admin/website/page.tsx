import Link from 'next/link'

const sections = [
  { name: 'Homepage', text: 'Hero, sectoren, werkgeverscontent.', href: '/' },
  { name: 'Vakgebieden', text: 'Bouw, Civiel, Techniek, Engineering.', href: '/vacatures/bouw' },
  { name: 'Cases & testimonials', text: 'Resultaten en klantverhalen.', href: '/voor-werkgevers' },
]

export default function WebsitebeheerPage() {
  return (
    <>
      <div className="page-head">
        <div><h1>Websitebeheer</h1><p>Beheer content van de publieke website.</p></div>
      </div>
      <div className="grid connector-grid">
        {sections.map((s) => (
          <div key={s.name} className="card connector"><h3>{s.name}</h3><p>{s.text}</p><Link href={s.href} className="btn ghost">Bewerken</Link></div>
        ))}
      </div>
    </>
  )
}
