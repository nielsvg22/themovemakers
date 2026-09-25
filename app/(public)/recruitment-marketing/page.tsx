import { Metadata } from 'next'
import { PublicLayout } from '@/components/public/PublicLayout'
import { RecruitmentMarketingPage } from './_components/RecruitmentMarketingPage'

export const metadata: Metadata = {
  title: 'Recruitment Marketing | Van vacature tot plaatsing',
  description: 'Wij zorgen dat het juiste talent je bedrijf vindt. Van doelgroepanalyse en vacatureteksten tot campagnes, sociale media en employer branding.',
}

export default function RecruitmentMarketingRoute() {
  return (
    <PublicLayout>
      <RecruitmentMarketingPage />
    </PublicLayout>
  )
}
