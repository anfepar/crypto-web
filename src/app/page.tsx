'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { getCryptoCurrenciesById, useGetCryptocurrenciesByPageQuery } from "./lib/cryptoCurrenciesApi"
import { CryptoCurrency } from "./lib/types/CryptoCurrency"
import { getTotalPages } from "./lib/utils/pagination"
import { appendParamsSearchParams } from './lib/utils/location'
import CryptoCurrenciesTableSkeleton from './ui/CryptoCurrenciesTable/CryptoCurrenciesTableSkeleton'
import CryptoCurrenciesTable from "./ui/CryptoCurrenciesTable/CryptoCurrenciesTable"
import Pagination from "./ui/Pagination/Pagination"
import SearchBar from "./ui/SearchBar/SearchBar"
import SearchBarSkeleton from './ui/SearchBar/SearchBarSkeleton'

export default function Page() {
  const searchParams = useSearchParams()
  const pageParam = searchParams.get('page')
  const filterParam = searchParams.get('filter')
  const router = useRouter()
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
      } else {
        setCryptoCurrencies(filteredItems)
      }
    } else {
      setCryptoCurrencies(fetchedCryptoCurrencies)
    }
  }, [data, filterParam])


  const handleChangePage = (newPage: number) => {
    const redirectUrl = appendParamsSearchParams(location.search, { page: newPage.toString() })
    router.push(`/?${redirectUrl}`)
  }

  return (
    <main>
      <section className="container mx-auto max-w-screen-md">
        {!isLoading && !error &&
          <>
            <SearchBar
              cryptoCurrencies={cryptoCurrencies}
              currentPage={currentPage}
              totalPages={getTotalPages(data?.info.coins_num as number)}
              filterIsActive={filterParam !== null}
            />
            <CryptoCurrenciesTable cryptoCurrencies={cryptoCurrencies} />
            <Pagination totalCoins={data?.info.coins_num as number} currentPage={currentPage} onPageClick={handleChangePage} />
          </>
        }
        {isLoading &&
          <>
            <SearchBarSkeleton />
            <CryptoCurrenciesTableSkeleton />
          </>
        }
        {error &&
          <p className='text-center text-xl my-8'>
            An error has occurred. Try again later.
          </p>
        }
      </section>
    </main>
  )
}
