import { Metadata } from 'next'
import { PublicLayout } from '@/components/public/PublicLayout'
import { OverOnsPage } from './_components/OverOnsPage'

export const metadata: Metadata = {
  title: 'Over ons | The Move Maker',
  description: 'The Move Maker is de recruitmentpartner voor bouw, civiel en techniek. Persoonlijk, zichtbaar en gericht op duurzame matches.',
}

export default function OverOnsRoute() {
  return (
    <PublicLayout>
      <OverOnsPage />
    </PublicLayout>
  )
}
