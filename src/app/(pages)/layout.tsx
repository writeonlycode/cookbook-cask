import Header from '../(components)/shared/Header'
import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Cookbook Cask',
  description:
    'Discover and share a treasure trove of mouthwatering recipes at Cookbook Cask – your go-to destination for culinary inspiration!',
}
