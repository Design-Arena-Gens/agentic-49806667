import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Astrology App - Your Cosmic Guide',
  description: 'Discover your horoscope, zodiac compatibility, and birth chart insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
