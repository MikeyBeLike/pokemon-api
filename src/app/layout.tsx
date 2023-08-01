import { PageHeader } from '@/components/page-header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pokemon List',
  description: 'A simple tool to display, search for, filter against & sort by different attributes of Pokemon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header>
            <PageHeader />
          </header>
          {children}
        </Providers>
      </body>
    </html>
  )
}
