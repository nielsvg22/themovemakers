import { Metadata } from 'next'
import { PublicLayout } from '@/components/public/PublicLayout'
import { OpenSollicitatiePage } from './_components/OpenSollicitatiePage'

export const metadata: Metadata = {
  title: 'Open sollicitatie | Laat je gegevens achter',
  description: 'Staat jouw ideale vacature er nog niet tussen? Laat je gegevens achter en we nemen contact met je op zodra we iets passends hebben in bouw, civiel of techniek.',
}

export default function OpenSollicitatiePage() {
  return (
    <PublicLayout>
      <OpenSollicitatiePage />
    </PublicLayout>
  )
}