'use client'

import Link from 'next/link'
import { Brand } from './Brand'
import { useSiteUI } from './SiteUI'
import { sectorHref } from '@/lib/data/site'

export function Footer() {
  const { openModal } = useSiteUI()

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Brand />
            <p style={{ marginTop: 16, maxWidth: 340, fontSize: 13 }}>
              Recruitment voor bouw, civiel en techniek. Persoonlijk, zichtbaar en gericht op duurzame matches.
            </p>
          </div>
          <div>
            <h4>Voor kandidaten</h4>
            <Link href="/vacatures">Vacatures</Link>
            <Link href={sectorHref('Bouw')}>Bouw</Link>
            <Link href={sectorHref('Civiel')}>Civiel</Link>
            <Link href={sectorHref('Techniek')}>Techniek</Link>
            <Link href="/cv-check">Laat je cv checken</Link>
            <a href="/open-sollicitatie" onClick={(e) => { e.preventDefault(); openModal('application') }}>Open sollicitatie</a>
          </div>
          <div>
            <h4>Voor werkgevers</h4>
            <Link href="/voor-werkgevers">Recruitment</Link>
            <Link href="/voor-werkgevers">Werving &amp; selectie</Link>
            <Link href="/recruitment-marketing">Recruitment marketing</Link>
            <a href="/gratis-recruitmentscan" onClick={(e) => { e.preventDefault(); openModal('scan') }}>Recruitmentscan</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a>Apeldoorn</a>
            <a href="tel:0550000000">055 - 000 00 00</a>
            <a href="mailto:info@themovemaker.nl">info@themovemaker.nl</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="copyright">
          <span>© 2026 The Move Maker</span>
          <span>
            <Link href="/privacy">Privacy</Link> · <Link href="/cookies">Cookies</Link> · <Link href="/algemene-voorwaarden">Algemene voorwaarden</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
