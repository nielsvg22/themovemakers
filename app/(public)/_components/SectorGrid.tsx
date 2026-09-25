import Link from 'next/link'
import { homeSectors, sectorHref } from '@/lib/data/site'
import { getSiteImages } from '@/lib/data/site-images'

export async function SectorGrid({ counts }: { counts: Record<string, number> }) {
  const { sectors } = await getSiteImages()
  return (
    <>
      <div className="section-head">
        <div>
          <div className="eyebrow">Vind sneller wat bij je past</div>
          <h2>Direct naar jouw vakgebied</h2>
          <p>Ontdek vacatures in jouw specialisme. Klik en bekijk direct alle mogelijkheden.</p>
        </div>
      </div>
      <div className="sector-grid">
        {homeSectors.map((s) => (
          <Link key={s.name} href={sectorHref(s.name)} className="sector-card">
            <img src={sectors[s.name] ?? s.img} alt="" />
            <div className="content">
              <h3>{s.name}</h3>
              <div className="count">{counts[s.name] ?? 0} {counts[s.name] === 1 ? 'vacature' : 'vacatures'}</div>
              <div className="arrow">→</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
