import type { Metadata } from 'next'
import './ui/globals.css'
import { Provider } from 'react-redux'
import store from './store/store'


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
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
