import { Metadata } from 'next'
import { PublicLayout } from '@/components/public/PublicLayout'
import { ContactPage } from './_components/ContactPage'

export const metadata: Metadata = {
  title: 'Contact | The Move Maker',
  description: 'Heb je een vraag over onze vacatures, recruitment diensten of recruitment marketing? Neem contact op met The Move Maker. We helpen je graag verder.',
}

export default function ContactRoute() {
  return (
    <PublicLayout>
      <ContactPage />
    </PublicLayout>
  )
}
