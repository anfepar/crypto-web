import type { Metadata } from 'next'
import { ReduxProvider } from './providers/ReduxProvider'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import './ui/globals.css'

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
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
