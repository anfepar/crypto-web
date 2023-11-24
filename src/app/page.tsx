'use client'
export const dynamic = 'force-dynamic'
import { useSearchParams } from 'next/navigation'
import { getCryptoCurrenciesById, useGetCryptocurrenciesByPageQuery } from "./lib/cryptoCurrenciesApi"
import { CryptoCurrency } from "./lib/types/CryptoCurrency"
import { getTotalPages } from "./lib/utils/pagination"
import CryptoCurrenciesTable from "./components/CryptoCurrenciesTable/CryptoCurrenciesTable"
import Pagination from "./components/Pagination/Pagination"
import SearchBar from "./components/SearchBar/SearchBar"
import { appendParamsSearchParams } from './lib/utils/location'
import { useEffect, useMemo, useState } from 'react'

export default function Home() {
  const searchParams = useSearchParams()
  const pageParam = searchParams.get('page')
  const filterParam = searchParams.get('filter')
  const currentPage = pageParam ? parseInt(pageParam) : 1
  const { data, error, isLoading } = useGetCryptocurrenciesByPageQuery(currentPage)
  const [cryptoCurrencies, setCryptoCurrencies] = useState<CryptoCurrency[]>([])

  useEffect(() => {
    const fetchedCryptoCurrencies = data?.data || []

    const getFilteredCryptoCurrency = async (id: string) => {
      const cryptoCurrency = await getCryptoCurrenciesById(id)
      setCryptoCurrencies(cryptoCurrency)
    }

    if (filterParam) {
      const filteredItems = fetchedCryptoCurrencies.filter((cryptoCurrency) => cryptoCurrency.id === filterParam)
      if (filteredItems.length === 0) {
        getFilteredCryptoCurrency(filterParam)
      }
    } else {
      setCryptoCurrencies(fetchedCryptoCurrencies)
    }
  }, [data, filterParam])


  const handleChangePage = (newPage: number) => {
    location.search = appendParamsSearchParams(location.search, { page: newPage.toString() })
  }

  return (
    <main>
      <section>
        <SearchBar cryptoCurrencies={cryptoCurrencies} currentPage={currentPage} totalPages={getTotalPages(data?.info.coins_num as number)} />
        <CryptoCurrenciesTable cryptoCurrencies={cryptoCurrencies} />
        <Pagination totalCoins={data?.info.coins_num as number} currentPage={currentPage} onPageClick={handleChangePage} />
      </section>
    </main>
  )
}
