import { Metadata } from 'next'
import { LegalPage } from '@/components/public/LegalPage'

export const metadata: Metadata = { title: 'Privacyverklaring' }

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacyverklaring" intro="Hoe The Move Maker omgaat met jouw persoonsgegevens.">
      <h3>Welke gegevens we verwerken</h3>
      <p>Als je solliciteert, een open sollicitatie doet of een recruitmentscan aanvraagt, verwerken we de gegevens die je invult: onder andere je naam, e-mailadres, telefoonnummer, cv en motivatie.</p>
      <h3>Waarvoor we ze gebruiken</h3>
      <ul>
        <li>Om je te koppelen aan passende vacatures en contact met je op te nemen.</li>
        <li>Om je sollicitatie, met jouw toestemming, voor te stellen aan een opdrachtgever.</li>
        <li>Om werkgevers te adviseren over hun vacature na een aanvraag.</li>
      </ul>
      <h3>Bewaartermijn en jouw rechten</h3>
      <p>We bewaren gegevens niet langer dan nodig. Je kunt altijd vragen om inzage, correctie of verwijdering van je gegevens.</p>
    </LegalPage>
  )
}
