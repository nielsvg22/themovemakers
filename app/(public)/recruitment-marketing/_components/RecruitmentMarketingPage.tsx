'use client'

import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/public/PageHero'
import { ArrowRight, Target, Megaphone, Users, TrendingUp, Building2, Search } from 'lucide-react'

const flowSteps = [
  { icon: Target, label: 'Doelgroepanalyse' },
  { icon: Search, label: 'Vacaturetekst' },
  { icon: Megaphone, label: 'Campagne' },
  { icon: Users, label: 'Bereik' },
  { icon: TrendingUp, label: 'Kandidaten' },
  { icon: Building2, label: 'Plaatsing' },
]

const services = [
  { icon: Target, title: 'Doelgroepanalyse', description: 'We analyseren wie je ideaale kandidaat is, wat ze drijft en waar ze te vinden zijn.' },
  { icon: Search, title: 'Vacatureteksten', description: 'Vacatures die scoren: SEO-geoptimaliseerd, aantrekkelijk en conversion-gericht.' },
  { icon: Megaphone, title: 'Recruitment campagnes', description: 'Multi-channel campagnes op LinkedIn, Indeed, Google, sociale media en niche jobboards.' },
  { icon: Users, title: 'Social recruitment', description: 'Actieve werving via LinkedIn, Facebook, Instagram en niche community\'s.' },
  { icon: Building2, title: 'Employer branding', description: 'Maak zichtbaar waarom talent voor jou kiest. Employer Value Proposition tot video content.' },
  { icon: TrendingUp, title: 'Candidate funnels', description: 'Gedreven funnels die kandidaten van bewustzijn tot sollicitatie leiden.' },
]

export function RecruitmentMarketingPage() {
  return (
    <>
      <PageHero
        title="Recruitment Marketing"
        subtitle="Van vacaturetekst tot campagne, bereik en sollicitatie. Wij zorgen dat het juiste talent jouw bedrijf vindt."
        eyebrow="Voor werkgevers"
      />

      <section className="py-20 bg-navy text-white" aria-labelledby="flow-title">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-gradient-to-r from-[#f0ffd0] to-[#d8ff78] p-8 md:p-12 text-navy">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-lime/80 mb-3">Recruitment marketing</p>
                <h2 id="flow-title" className="font-black tracking-tight text-3xl md:text-4xl mb-4">
                  Van <span className="text-lime">bereik</span> naar sollicitatie.
                </h2>
                <p className="text-[#566872] text-lg mb-8 max-w-xl">
                  We combineren doelgroepkennis, vacaturecontent en campagnes om precies de juiste mensen te bereiken.
                </p>
                <Button size="sm" variant="primary" asChild>
                  <a href="/gratis-recruitmentscan">Start met een recruitmentscan →</a>
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {flowSteps.map((step, index) => (
                  <div key={index} className="text-center flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full border-2 border-lime/40 text-lime flex items-center justify-center mb-2">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium">{step.label}</span>
                    {index < flowSteps.length - 1 && (
                      <span className="text-lime text-xl -mt-2">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" aria-labelledby="services-title">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <h2 id="services-title" className="font-black tracking-tight text-3xl md:text-4xl mb-4">
              Wat we voor je doen
            </h2>
            <p className="text-muted text-lg">
              Van strategie tot uitvoering. Onze recruitment marketing specialisten regelen de volledige keten.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <article key={service.title} className="bg-white border border-line rounded-2xl p-6 hover:shadow-card-hover transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#eff5f1] flex items-center justify-center text-2xl mb-4">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg mb-2">{service.title}</h3>
                <p className="text-muted text-sm">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f7f8f8]" aria-labelledby="cases-title">
        <div className="container mx-auto px-4">
          <h2 id="cases-title" className="font-black tracking-tight text-3xl md:text-4xl mb-10 text-center">
            Cases die laten zien wat werkt
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Uitvoerder Bouw', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', stats: ['4 kandidaten', '18 dagen', '1 plaatsing'] },
              { title: 'Werkvoorbereider Civiel', image: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=800&q=80', stats: ['6 kandidaten', '14 dagen', '1 plaatsing'] },
              { title: 'Projectleider Techniek', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80', stats: ['5 kandidaten', '21 dagen', '1 plaatsing'] },
            ].map((caseStudy) => (
              <article key={caseStudy.title} className="bg-white border border-line rounded-2xl overflow-hidden">
                <div className="aspect-video relative">
                  <img src={caseStudy.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-extrabold text-xl mb-4">{caseStudy.title}</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {caseStudy.stats.map((stat, i) => (
                      <div key={i} className="p-3 bg-soft rounded-lg text-center">
                        <p className="font-black text-ink">{stat}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}