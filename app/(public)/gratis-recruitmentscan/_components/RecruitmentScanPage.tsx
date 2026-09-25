'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { PageHero } from '@/components/public/PageHero'
import { Building2, User, Mail, Phone, Briefcase, MapPin, AlertTriangle, CheckCircle } from 'lucide-react'

export function RecruitmentScanPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    location: '',
    challenge: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ companyName: '', firstName: '', lastName: '', email: '', phone: '', role: '', location: '', challenge: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <PageHero
        title="Gratis recruitmentscan"
        subtitle="Vertel ons welke vacature lastig in te vullen is. We kijken vrijblijvend naar doelgroep, bereik en aanpak. Geen verplichtingen, wel concreet advies."
        eyebrow="Voor werkgevers"
      />

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-2xl">
          {submitted ? (
            <div className="bg-white border border-line rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-extrabold text-xl mb-2">Aanvraag verstuurd!</h3>
              <p className="text-muted mb-6">Bedankt voor je aanvraag. We nemen binnen 1 werkdag contact met je op voor een gratis intake gesprek.</p>
              <Button onClick={() => setSubmitted(false)}>Nieuwe aanvraag</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-line rounded-2xl p-8 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Bedrijfsnaam *"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  icon={<Building2 className="w-5 h-5" />}
                />
                <Input
                  label="Jouw naam *"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Voornaam"
                  icon={<User className="w-5 h-5" />}
                />
              </div>

              <Input
                label="Achternaam *"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                icon={<User className="w-5 h-5" />}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="E-mailadres *"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  icon={<Mail className="w-5 h-5" />}
                />
                <Input
                  label="Telefoonnummer"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  icon={<Phone className="w-5 h-5" />}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Functietitel *"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  placeholder="Bijv. Uitvoerder Bouw"
                  icon={<Briefcase className="w-5 h-5" />}
                />
                <Input
                  label="Locatie"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Bijv. Utrecht"
                  icon={<MapPin className="w-5 h-5" />}
                />
              </div>

              <div className="relative">
                <Textarea
                  label="Waar loopt u tegenaan? *"
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Bijv. Weinig reacties, verkeerde kandidaten, te lang duurt, geen zichtbaarheid..."
                />
                <AlertTriangle className="absolute bottom-4 right-4 w-5 h-5 text-lime" />
              </div>

              <div className="bg-[#efffd0] border border-[#dcf8a9] rounded-xl p-4 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-lime flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-navy">Gratis & zonder verplichting</p>
                  <p className="text-sm text-[#566872]">De scan is volledig vrijblijvend. Je ontvangt concreet advies over doelgroep, bereik en aanpak.</p>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Verstuur recruitmentscan →
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}