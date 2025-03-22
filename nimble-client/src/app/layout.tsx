import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import DashboardWrapper from './dashboardWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nimble',
  description: 'Organize seus projetos de forma simples e eficiente',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <DashboardWrapper>{children}</DashboardWrapper>{' '}
      </body>
    </html>
  )
}
