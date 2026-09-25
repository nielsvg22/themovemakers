import { Metadata } from 'next'
import { PublicLayout } from '@/components/public/PublicLayout'
import { EmployerPage } from './_components/EmployerPage'

export const metadata: Metadata = {
  title: 'Voor werkgevers | Recruitment, werving & selectie',
  description: 'Moeite om de juiste mensen te vinden? Wij helpen organisaties in bouw, civiel en techniek aan de juiste vakspecialisten. Niet alleen door te zoeken, maar door jouw werkgeversverhaal en vacatures zichtbaar te maken.',
}

export default function WerkgeversRoute() {
  return (
    <PublicLayout>
      <EmployerPage />
    </PublicLayout>
  )
}
