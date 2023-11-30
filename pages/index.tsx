import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cryptoCurrenciesApi, getCryptoCurrenciesById, getCryptocurrenciesByPage, useGetCryptocurrenciesByPageQuery } from "../lib/cryptoCurrenciesApi"
import { appendParamsSearchParams } from '../lib/utils/location'
import CryptoCurrenciesTableSkeleton from '../components/CryptoCurrenciesTable/CryptoCurrenciesTableSkeleton'
import SearchBarSkeleton from '../components/SearchBar/SearchBarSkeleton'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import { wrapper } from '../lib/store'
import { CryptoCurrency } from '../lib/types/CryptoCurrency'
import SearchBar from '../components/SearchBar/SearchBar'
import CryptoCurrenciesTable from '../components/CryptoCurrenciesTable/CryptoCurrenciesTable'
import Pagination from '../components/Pagination/Pagination'
import { getTotalPages } from '../lib/utils/pagination'

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const name = context.params?.name;
    const pageParam = parseInt(context.query.page as string) || 1;
    const filterParam = context.query.filter || null
    store.dispatch(cryptoCurrenciesApi.endpoints.getCryptocurrenciesByPage.initiate(pageParam))
    await Promise.all(store.dispatch(cryptoCurrenciesApi.util.getRunningQueriesThunk()));

    return {
      props: { currentPage: pageParam, filterParam },
    };
  }
);

interface HomeProps {
  currentPage: number,
  filterParam: string
}

export default function Home({ currentPage, filterParam }: HomeProps) {
  const router = useRouter()
  const { data, error, isLoading } = useGetCryptocurrenciesByPageQuery(currentPage)
  const [cryptoCurrencies, setCryptoCurrencies] = useState<CryptoCurrency[]>(data?.data || [])

  useEffect(() => {
    const fetchedCryptoCurrencies = data?.data || []

    const getFilteredCryptoCurrency = async (id: string) => {
      try {
        const cryptoCurrency = await getCryptoCurrenciesById(id)
        setCryptoCurrencies(cryptoCurrency)
      } catch (e) {
        console.error('error fetching crypto currency by id', e)
      }
    }

    if (filterParam) {
      const filteredItems = fetchedCryptoCurrencies.filter((cryptoCurrency) => cryptoCurrency.id === filterParam)
      if (filteredItems.length === 0) {
        getFilteredCryptoCurrency(filterParam)
      } else if (JSON.stringify(filteredItems.map(item => item.id)) !== JSON.stringify(cryptoCurrencies.map(item => item.id))) {
        setCryptoCurrencies(filteredItems)
      }
    } else {
      setCryptoCurrencies(fetchedCryptoCurrencies)
    }
  }, [data, filterParam, cryptoCurrencies])


  const handleChangePage = (newPage: number) => {
    const redirectUrl = appendParamsSearchParams(location.search, { page: newPage.toString() })
    router.push(`/?${redirectUrl}`)
  }

  return (
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
        <ErrorPage />
      }
    </section>
  )
}
