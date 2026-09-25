import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/site.css'
import '../styles/ats.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'The Move Maker | Recruitment voor bouw, civiel & techniek',
    template: '%s | The Move Maker',
  },
  description: 'Wij verbinden vakspecialisten en bedrijven in de bouw, civiel, techniek en meer. Met de juiste mensen maken we samen Nederland sterker.',
  keywords: ['recruitment', 'bouw', 'civiel', 'techniek', 'engineering', 'vacatures', 'werk', 'carrière'],
  authors: [{ name: 'The Move Maker' }],
  creator: 'The Move Maker',
  publisher: 'The Move Maker',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://themovemaker.nl',
    siteName: 'The Move Maker',
    title: 'The Move Maker | Recruitment voor bouw, civiel & techniek',
    description: 'Wij verbinden vakspecialisten en bedrijven in de bouw, civiel, techniek en meer.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Move Maker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Move Maker',
    description: 'Recruitment voor bouw, civiel & techniek',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}