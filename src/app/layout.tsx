import type { Metadata } from 'next'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './ui/globals.css'
import Header from './ui/Header/Header'
import Footer from './ui/Footer/Footer'
config.autoAddCss = false

export const metadata: Metadata = {
  title: 'Crypto Currencies',
  description: 'Get details about crypto currencies in the market cap',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
