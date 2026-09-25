import { Metadata } from 'next'
import { PublicLayout } from '@/components/public/PublicLayout'
import { RecruitmentScanPage } from './_components/RecruitmentScanPage'

export const metadata: Metadata = {
  title: 'Gratis recruitmentscan | The Move Maker',
  description: 'Laat gratis je vacature scannen. We kijken naar doelgroep, bereik en aanpak. Geen verplichtingen, wel concreet advies.',
}

export default function RecruitmentScanPage() {
  return (
    <PublicLayout>
      <RecruitmentScanPage />
    </PublicLayout>
  )
}