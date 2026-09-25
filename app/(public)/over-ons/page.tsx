import { Metadata } from 'next'
import { PublicLayout } from '@/components/public/PublicLayout'
import { OverOnsPage } from './_components/OverOnsPage'

export const metadata: Metadata = {
  title: 'Over ons | The Move Maker',
  description: 'The Move Maker is de recruitment partner voor bouw, civiel en techniek. Onze missie: de juiste mensen bij de juiste plek. Persoonlijk, zichtbaar en gericht op duurzame matches.',
}

export default function OverOnsPage() {
  return (
    <PublicLayout>
      <OverOnsPage />
    </PublicLayout>
  )
}