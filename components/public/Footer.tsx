import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#051521] text-[#c6d4db]" role="contentinfo">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6" aria-label="The Move Maker - Home">
              <div className="w-10 h-10 rounded-lg bg-lime flex items-center justify-center text-navy font-black text-lg skew-x-[-7deg]">
                M
              </div>
              <div className="font-black leading-[0.82] text-white text-[18px] tracking-tight">
                THE<br />
                <span className="text-lime">MOVE</span><br />
                MAKER
              </div>
            </Link>
            <p className="text-sm max-w-xs">
              Recruitment voor bouw, civiel en techniek. Persoonlijk, zichtbaar en gericht op duurzame matches.
            </p>
          </div>

          <nav aria-label="Voor kandidaten">
            <h4 className="text-white font-extrabold mb-4">Voor kandidaten</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/vacatures" className="hover:text-lime transition-colors">Vacatures</Link></li>
              <li><Link href="/vacatures/bouw" className="hover:text-lime transition-colors">Bouw</Link></li>
              <li><Link href="/vacatures/civiel" className="hover:text-lime transition-colors">Civiel</Link></li>
              <li><Link href="/vacatures/techniek" className="hover:text-lime transition-colors">Techniek</Link></li>
              <li><Link href="/open-sollicitatie" className="hover:text-lime transition-colors">Open sollicitatie</Link></li>
            </ul>
          </nav>

          <nav aria-label="Voor werkgevers">
            <h4 className="text-white font-extrabold mb-4">Voor werkgevers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/voor-werkgevers" className="hover:text-lime transition-colors">Recruitment</Link></li>
              <li><Link href="/recruitment-marketing" className="hover:text-lime transition-colors">Recruitment marketing</Link></li>
              <li><Link href="/recruitment-marketing#employer-branding" className="hover:text-lime transition-colors">Employer branding</Link></li>
              <li><Link href="/recruitment-marketing#vacaturemarketing" className="hover:text-lime transition-colors">Vacaturemarketing</Link></li>
              <li><Link href="/gratis-recruitmentscan" className="hover:text-lime transition-colors">Gratis recruitmentscan</Link></li>
            </ul>
          </nav>

          <address className="not-italic">
            <h4 className="text-white font-extrabold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Apeldoorn</li>
              <li><a href="tel:0550000000" className="hover:text-lime transition-colors">055 - 000 00 00</a></li>
              <li><a href="mailto:info@themovemaker.nl" className="hover:text-lime transition-colors">info@themovemaker.nl</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-lime transition-colors">LinkedIn</a></li>
            </ul>
          </address>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#81939d]">© 2026 The Move Maker</p>
          <div className="flex gap-6 text-sm text-[#81939d]">
            <Link href="/privacy" className="hover:text-lime transition-colors">Privacy</Link>
            <Link href="/cookies" className="hover:text-lime transition-colors">Cookies</Link>
            <Link href="/algemene-voorwaarden" className="hover:text-lime transition-colors">Algemene voorwaarden</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}