'use client'
export const dynamic = 'force-dynamic'
import { useState } from "react"
import { useGetCryptocurrenciesByPageQuery } from "./lib/cryptocurrenciesApi"
import { CryptoCurrency } from "./lib/types/Cryptocurrency"
import CryptoCurrenciesTable from "./components/CryptoCurrenciesTable/CryptoCurrenciesTable"

export default function Home() {
  const [page, setPage] = useState(0)
  const { data, error, isLoading } = useGetCryptocurrenciesByPageQuery(page)
  const cryptocurrencies: CryptoCurrency[] = data?.data || [];
  return (
    <main>
      <section>
        <CryptoCurrenciesTable cryptoCurrencies={cryptocurrencies} />
        
      </section>
    </main>
  )
}
