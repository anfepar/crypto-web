'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from "react"
import { useGetCryptocurrenciesByPageQuery } from "./lib/cryptoCurrenciesApi"
import { CryptoCurrency } from "./lib/types/CryptoCurrency"
import CryptoCurrenciesTable from "./components/CryptoCurrenciesTable/CryptoCurrenciesTable"
import Pagination from "./components/Pagination/Pagination"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./lib/store"
import { setCurrentPage } from "./lib/currentPage"

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
        <CryptoCurrenciesTable cryptoCurrencies={cryptocurrencies} />
        <Pagination totalPages={data?.info.coins_num as number} currentPage={currentPage} onPageClick={handleChangePage} />
      </section>
    </main>
  )
}
