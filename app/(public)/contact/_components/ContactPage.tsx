'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { PageHero } from '@/components/public/PageHero'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Heb je een vraag? Wij helpen je graag. Vul het formulier in of neem direct contact op via telefoon of e-mail."
        eyebrow="Neem contact op"
      />

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="bg-white border border-line rounded-2xl p-6">
                <h3 className="font-extrabold text-xl mb-6">Contactgegevens</h3>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, title: 'Bezoekadres', lines: ['The Move Maker', 'Apeldoorn', 'Nederland'] },
                    { icon: Phone, title: 'Telefoon', lines: ['055 - 000 00 00', 'Ma - Vr: 09:00 - 17:00'] },
                    { icon: Mail, title: 'E-mail', lines: ['info@themovemaker.nl', 'We reageren binnen 24 uur'] },
                    { icon: Clock, title: 'Openingstijden', lines: ['Maandag - Vrijdag', '09:00 - 17:00'] },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-soft flex items-center justify-center text-lime flex-shrink-0">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold">{item.title}</h4>
                        <div className="text-sm text-muted space-y-0.5">
                          {item.lines.map((line, i) => <p key={i}>{line}</p>)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-navy text-white rounded-2xl p-6">
                <h3 className="font-extrabold text-xl mb-3">Direct contact?</h3>
                <p className="text-[#c7d6dd] mb-4">Bel ons direct of stuur een app. We helpen je graag persoonlijk verder.</p>
                <div className="flex gap-3 flex-wrap">
                  <Button asChild>
                    <a href="tel:0550000000">📞 Bel nu: 055 - 000 00 00</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="mailto:info@themovemaker.nl">✉️ E-mail ons</a>
                  </Button>
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="bg-white border border-line rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-extrabold text-xl mb-2">Bericht verstuurd!</h3>
                  <p className="text-muted">Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.</p>
                  <Button onClick={() => setSubmitted(false)} className="mt-6">Nieuw bericht</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-line rounded-2xl p-6 space-y-5">
                  <h3 className="font-extrabold text-xl mb-2">Stuur ons een bericht</h3>
                  <p className="text-muted mb-6">Vul het formulier in en we nemen contact met je op.</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Voornaam *"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Achternaam *"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="E-mailadres *"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Telefoonnummer"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <Select
                    label="Onderwerp *"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    options={[
                      { value: 'vacature', label: 'Vraag over een vacature' },
                      { value: 'recruitment', label: 'Recruitment diensten' },
                      { value: 'marketing', label: 'Recruitment marketing' },
                      { value: 'scan', label: 'Gratis recruitmentscan' },
                      { value: 'overig', label: 'Overig' },
                    ]}
                    placeholder="Kies een onderwerp"
                  />

                  <Textarea
                    label="Bericht *"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Vertel ons hoe we je kunnen helpen..."
                  />

                  <Button type="submit" className="w-full">
                    <Send className="w-5 h-5 mr-2" />
                    Verstuur bericht
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}