import { Metadata } from 'next'
import { LegalPage } from '@/components/public/LegalPage'

export const metadata: Metadata = { title: 'Algemene voorwaarden' }

export default function VoorwaardenPage() {
  return (
    <LegalPage title="Algemene voorwaarden" intro="De voorwaarden voor opdrachtgevers van The Move Maker.">
      <h3>Toepasselijkheid</h3>
      <p>Deze voorwaarden gelden voor alle opdrachten voor werving &amp; selectie en recruitment marketing die The Move Maker uitvoert.</p>
      <h3>Opvragen</h3>
      <p>De volledige algemene voorwaarden sturen we je graag toe bij een offerte of op aanvraag.</p>
    </LegalPage>
  )
}
