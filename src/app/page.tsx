'use client'
export const dynamic = 'force-dynamic'
import { useState } from "react"
import { useGetCryptocurrenciesByPageQuery } from "./lib/cryptoCurrenciesApi"
import { CryptoCurrency } from "./lib/types/CryptoCurrency"
import CryptoCurrenciesTable from "./components/CryptoCurrenciesTable/CryptoCurrenciesTable"
import Pagination from "./components/Pagination/Pagination"

export default function Home() {
  const [page, setPage] = useState(0)
  const { data, error, isLoading } = useGetCryptocurrenciesByPageQuery(page)
  const cryptocurrencies: CryptoCurrency[] = data?.data || [];
  return (
    <main>
      <section>
        <CryptoCurrenciesTable cryptoCurrencies={cryptocurrencies} />
        <Pagination totalPages={data?.info.coins_num as number} currentPage={page} onPageClick={() => { }} />
      </section>
    </main>
  )
}
