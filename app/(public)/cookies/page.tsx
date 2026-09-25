import { Metadata } from 'next'
import { LegalPage } from '@/components/public/LegalPage'

export const metadata: Metadata = { title: 'Cookies' }

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies" intro="Welke cookies deze website gebruikt.">
      <h3>Functionele cookies</h3>
      <p>We gebruiken alleen cookies die nodig zijn om de website en het inloggen op het beheersysteem te laten werken. Hiervoor is geen toestemming nodig.</p>
      <h3>Analytische en marketingcookies</h3>
      <p>Als we in de toekomst analytische of marketingcookies plaatsen, vragen we daar vooraf toestemming voor.</p>
    </LegalPage>
  )
}
