import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Helpdesk Portal',
    template: '%s | Helpdesk Portal',
  },
  description:
    'Firemní helpdesk a inventární systém pro správu osob, místností, zařízení a tiketů.',
  keywords: ['helpdesk', 'ticketing', 'IT podpora', 'inventář', 'správa zařízení'],
  authors: [{ name: 'Helpdesk Portal Team' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'Helpdesk Portal',
    title: 'Helpdesk Portal',
    description: 'Firemní helpdesk a inventární systém.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
