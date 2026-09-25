import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { SiteUIProvider } from './SiteUI'

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="tmm-site">
      <SiteUIProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SiteUIProvider>
    </div>
  )
}
