'use client'

import { PageHero } from '@/components/public/PageHero'
import { Button } from '@/components/ui/Button'
import { Users, Target, Heart, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const team = [
  { name: 'Niels van Gortel', role: 'Founder & Recruiter', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { name: 'Mark de Jong', role: 'Recruitmentspecialist Bouw & Civiel', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Lisa Bakker', role: 'Recruitmentspecialist Techniek', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
  { name: 'Thomas Jansen', role: 'Recruitment Marketeer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
]

const values = [
  { icon: Target, title: 'Specialisme', description: 'We kennen de bouw, civiel en techniek sector door en door.' },
  { icon: Heart, title: 'Persoonlijk', description: 'Geen standaardoplossingen, maar maatwerk voor kandidaat en klant.' },
  { icon: Zap, title: 'Snelheid', description: 'Efficiënte processen zonder in te boeten op kwaliteit.' },
  { icon: Users, title: 'Duurzaam', description: 'We zoeken matches die langdurig werken, niet alleen voor nu.' },
]

export function OverOnsPage() {
  return (
    <>
      <PageHero
        title="Over The Move Maker"
        subtitle="Wij zijn de recruitment partner voor bouw, civiel en techniek. Onze missie: de juiste mensen bij de juiste plek. Persoonlijk, zichtbaar en gericht op duurzame matches."
        eyebrow="Wie we zijn"
      />

      <section className="py-20" aria-labelledby="mission-title">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 id="mission-title" className="font-black tracking-tight text-3xl md:text-4xl mb-6">
                Onze missie
              </h2>
              <div className="space-y-4 text-muted text-lg">
                <p>De bouw, civiel en techniek sectoren hebben dringend vakspecialisten nodig. Maar de match tussen talent en organisatie is vaak lastig.</p>
                <p>Wij bruggen die kloof. Niet met standaard vacatures, maar met recrutiment marketing, persoonlijke begeleiding en diepgaande sectorkennis.</p>
                <p>Ons resultaat? Bedrijven die sneller de juiste mensen vinden. En vakmensen die een baan vinden waar ze écht bij passen.</p>
              </div>
            </div>
            <div className="aspect-video rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=85"
                alt="Team The Move Maker"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h2 className="font-black tracking-tight text-3xl md:text-4xl text-center mb-12">
            Wat ons drijft
          </h2>
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {values.map((value) => (
              <div key={value.title} className="bg-white border border-line rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#eff5f1] flex items-center justify-center mx-auto mb-4 text-lime">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold mb-2">{value.title}</h3>
                <p className="text-muted text-sm">{value.description}</p>
              </div>
            ))}
          </div>

          <h2 className="font-black tracking-tight text-3xl md:text-4xl text-center mb-10">
            Ons team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
            {team.map((member) => (
              <div key={member.name} className="bg-white border border-line rounded-2xl overflow-hidden text-center">
                <div className="aspect-square">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h4 className="font-extrabold">{member.name}</h4>
                  <p className="text-sm text-muted">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/contact">Neem contact op →</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}