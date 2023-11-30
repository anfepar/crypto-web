'use client'
import React from "react"
import { useGetCryptoCurrencyByIdQuery } from "@/app/lib/cryptoCurrenciesApi"
import { CryptoCurrency } from "@/app/lib/types/CryptoCurrency"
import { formatCurrency } from "@/app/lib/utils/currency"
import PageSkeleton from "./ui/PageSkeleton/PageSkeleton"
import ErrorPage from "@/app/ui/ErrorPage/ErrorPage"

interface PageProps {
  params: {
    currencyId: string
  }
}

const priceValues = [
  { id: 'price_usd', text: 'USD Price' },
  { id: 'price_btc', text: 'BTC Price' },
  { id: 'market_cap_usd', text: 'Market Cap' }
]

const percentageValues = [
  { id: 'percent_change_1h', text: '1h %' },
  { id: 'percent_change_24h', text: '24h %' },
  { id: 'percent_change_7d', text: '7d %' }
]

export default function Page({ params }: PageProps) {
  const { currencyId } = params
  const { data, error, isLoading } = useGetCryptoCurrencyByIdQuery(currencyId)
  const cryptoCurrency = data && data.length > 0 ? data[0] : null
  return (
    <main>
      <section className="sm:container sm:mx-auto sm:max-w-screen-md m-4">
        {!isLoading && cryptoCurrency && !error && (
          <>
            <div className="grid grid-cols-2 grid-rows-2 gap-1 bg-slate-200 p-4 rounded my-6">
              <p className="row-span-2 rounded-full bg-white w-min h-min py-4 mx-auto px-4 whitespace-nowrap font-bold">{`# ${cryptoCurrency?.rank}`}</p>
              <h1 className="text-xl uppercase font-bold">{cryptoCurrency?.name}</h1>
              <h2>{cryptoCurrency?.symbol}</h2>
            </div>
            <div className="grid grid-cols-2 grid-rows-3 bg-slate-200 rounded p-4 my-6">
              {priceValues.map(item => (
                <React.Fragment key={item.id}>
                  <p className="font-bold text-center">{item.text}</p>
                  <p className="text-left">{formatCurrency(parseFloat(cryptoCurrency[item.id as keyof CryptoCurrency] as string || '0'))}</p>
                </React.Fragment>
              ))}
            </div>
            <div className="grid grid-cols-3 grid-rows-2 bg-slate-200 grid-flow-col rounded p-4 my-6">
              {percentageValues.map(item => (
                <React.Fragment key={item.id}>
                  <p className="font-bold text-center">{item.text}</p>
                  <p className="text-center">{cryptoCurrency[item.id as keyof CryptoCurrency]}</p>
                </React.Fragment>
              ))}
            </div>
          </>
        )}
        {isLoading && <PageSkeleton />}
        {error && (
          <ErrorPage />
        )}
      </section>
    </main>
  )
}