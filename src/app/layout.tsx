import type { Metadata } from 'next'
import { ReduxProvider } from './ui/ReduxProvider/ReduxProvider'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './ui/globals.css'
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
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
