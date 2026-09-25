'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { PageHero } from '@/components/public/PageHero'
import { ArrowRight, Mail, Phone, User, MapPin, Briefcase } from 'lucide-react'

export function OpenSollicitatiePage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    sector: '',
    region: '',
    message: '',
  })

  const steps = [
    { number: 1, label: 'Gegevens' },
    { number: 2, label: 'Profiel' },
    { number: 3, label: 'Verzenden' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      alert('Bedankt voor je open sollicitatie! We nemen zo snel mogelijk contact met je op.')
      setStep(1)
      setFormData({ firstName: '', lastName: '', email: '', phone: '', sector: '', region: '', message: '' })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <PageHero
        title="Open sollicitatie"
        subtitle="Staat jouw perfecte vacature er nog niet tussen? Laat je gegevens achter en we zoeken voor jou."
        eyebrow="Voor kandidaten"
      />

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white border border-line rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-8" role="progressbar" aria-label="Sollicitatie stappen">
              {steps.map((s) => (
                <div key={s.number} className={cn('flex items-center gap-2', s.number < steps.length && 'flex-1')}>
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-black',
                    step >= s.number ? 'bg-lime text-navy' : 'bg-soft text-muted'
                  )}>
                    {s.number}
                  </div>
                  <span className={cn('text-xs font-bold hidden sm:block', step >= s.number ? 'text-ink' : 'text-muted')}>
                    {s.label}
                  </span>
                  {s.number < steps.length && (
                    <div className={cn('flex-1 h-1 rounded', step > s.number ? 'bg-lime' : 'bg-line')} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-lg">Je persoonlijke gegevens</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Voornaam *"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      icon={<User className="w-5 h-5" />}
                    />
                    <Input
                      label="Achternaam *"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      icon={<User className="w-5 h-5" />}
                    />
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
                      label="Telefoonnummer *"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      icon={<Phone className="w-5 h-5" />}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-lg">Wat zoek je?</h3>
                  <div className="space-y-4">
                    <Select
                      label="Vakgebied *"
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      required
                      options={[
                        { value: 'bouw', label: 'Bouw' },
                        { value: 'civiel', label: 'Civiel' },
                        { value: 'techniek', label: 'Techniek' },
                        { value: 'engineering', label: 'Engineering' },
                        { value: 'installatietechniek', label: 'Installatietechniek' },
                        { value: 'werkvoorbereiding', label: 'Werkvoorbereiding' },
                        { value: 'projectmanagement', label: 'Projectmanagement' },
                      ]}
                      placeholder="Kies je vakgebied"
                      icon={<Briefcase className="w-5 h-5" />}
                    />
                    <Input
                      label="Regio *"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      required
                      placeholder="Bijv. Utrecht, Randstad, Noord-Nederland"
                      icon={<MapPin className="w-5 h-5" />}
                    />
                    <Textarea
                      label="Vertel kort wat je zoekt *"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Functie, omgeving, ambities, specifieke wensen..."
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-lime flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="w-8 h-8 text-navy" />
                  </div>
                  <h3 className="font-extrabold text-xl">Klaar om te verzenden?</h3>
                  <p className="text-muted">Controleer je gegevens en klik op verzenden. We nemen contact met je op binnen 2 werkdagen.</p>
                  <div className="bg-soft rounded-xl p-4 text-left text-sm space-y-2">
                    <p><strong>Naam:</strong> {formData.firstName} {formData.lastName}</p>
                    <p><strong>E-mail:</strong> {formData.email}</p>
                    <p><strong>Telefoon:</strong> {formData.phone}</p>
                    <p><strong>Vakgebied:</strong> {formData.sector}</p>
                    <p><strong>Regio:</strong> {formData.region}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-line">
                {step > 1 && (
                  <Button type="button" variant="ghost" onClick={() => setStep(step - 1)} className="flex-1">
                    ← Vorige
                  </Button>
                )}
                <Button type="submit" className="flex-1">
                  {step < 3 ? 'Volgende stap →' : 'Verstuur open sollicitatie →'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

import { cn } from '@/lib/utils'