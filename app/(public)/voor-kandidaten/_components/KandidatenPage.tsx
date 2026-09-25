'use client'

import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/public/PageHero'
import { ArrowRight, Search, Bell, User, Mail, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function KandidatenPage() {
  return (
    <>
      <PageHero
        title="Jouw volgende carrièrestap begint hier"
        subtitle="Of je nu actief op zoek bent of gewoon wilt weten wat er speelt: wij staan voor je klaar. Persoonlijk, eerlijk en met een netwerk in bouw, civiel en techniek."
        eyebrow="Voor kandidaten"
      />

      <section className="py-20" aria-labelledby="kandidaten-title">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white border border-line rounded-2xl p-8">
              <h3 className="font-extrabold text-xl mb-4 flex items-center gap-2">
                <Search className="w-6 h-6 text-lime" />
                Vacatures zoeken
              </h3>
              <p className="text-muted mb-6">Filter op vakgebied, locatie, salaris, uren en meer. Vind direct wat bij je past.</p>
              <Button asChild>
                <Link href="/vacatures">Bekijk alle vacatures →</Link>
              </Button>
            </div>
            <div className="bg-white border border-line rounded-2xl p-8">
              <h3 className="font-extrabold text-xl mb-4 flex items-center gap-2">
                <Bell className="w-6 h-6 text-lime" />
                Vacature alerts
              </h3>
              <p className="text-muted mb-6">Ontvang automatisch de nieuwste vacatures in je vakgebied en regio. Gratis en elk moment aanpasbaar.</p>
              <Button variant="outline" asChild>
                <Link href="/vacatures">Stel alert in →</Link>
              </Button>
            </div>
          </div>

          <div className="bg-navy text-white rounded-3xl p-8 md:p-12" aria-labelledby="open-title">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 id="open-title" className="font-black tracking-tight text-3xl md:text-4xl mb-4">
                  Niets passends gevonden?
                </h2>
                <p className="text-[#c7d6dd] text-lg mb-8">
                  Doe een open sollicitatie. We matchen jouw profiel met onze huidige en toekomstige vacatures en nemen contact op als er een match is.
                </p>
                <Button size="lg" variant="primary" asChild>
                  <Link href="/open-sollicitatie">
                    Open sollicitatie →
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=85"
                  alt="Kandidaat in gesprek"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <section className="mt-20" aria-labelledby="support-title">
            <h3 id="support-title" className="font-black tracking-tight text-3xl md:text-4xl text-center mb-10">
              Hoe we je ondersteunen
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: User, title: 'Persoonlijk contact', description: 'Geen anonieme systemen. Je hebt een vaste recruiter die je begeleidt.' },
                { icon: Mail, title: 'CV & LinkedIn check', description: 'We helpen je profiel scherp te maken voor maximale zichtbaarheid.' },
                { icon: ChevronRight, title: 'Snelle matching', description: 'Door ons netwerk in bouw, civiel & techniek matchen we snel en gericht.' },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-line rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#eff5f1] flex items-center justify-center mx-auto mb-4 text-lime">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold mb-2">{item.title}</h4>
                  <p className="text-muted text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  )
}