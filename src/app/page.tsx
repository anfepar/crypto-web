'use client'
export const dynamic = 'force-dynamic'
import { useDispatch, useSelector } from "react-redux"
import { useGetCryptocurrenciesByPageQuery } from "./lib/cryptoCurrenciesApi"
import { CryptoCurrency } from "./lib/types/CryptoCurrency"
import { RootState } from "./lib/store"
import { setCurrentPage } from "./lib/currentPage"
import { getTotalPages } from "./lib/utils/pagination"
import CryptoCurrenciesTable from "./components/CryptoCurrenciesTable/CryptoCurrenciesTable"
import Pagination from "./components/Pagination/Pagination"
import SearchBar from "./components/SearchBar/SearchBar"

export default function Home() {
  const currentPage = useSelector((state: RootState) => state.currentPage)
  const { data, error, isLoading } = useGetCryptocurrenciesByPageQuery(currentPage)
  const cryptocurrencies: CryptoCurrency[] = data?.data || [];

  const dispatch = useDispatch()

  const handleChangePage = (newPage: number) => {
    dispatch(setCurrentPage(newPage))
  }

  return (
    <main>
      <section>
        <SearchBar cryptoCurrencies={cryptocurrencies} currentPage={currentPage} totalPages={getTotalPages(data?.info.coins_num as number)} />
        <CryptoCurrenciesTable cryptoCurrencies={cryptocurrencies} />
        <Pagination totalCoins={data?.info.coins_num as number} currentPage={currentPage} onPageClick={handleChangePage} />
      </section>
    </main>
  )
}
