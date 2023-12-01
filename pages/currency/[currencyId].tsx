import React from "react"
import { cryptoCurrenciesApi, useGetCryptoCurrencyByIdQuery } from "@/lib/cryptoCurrenciesApi"
import { CryptoCurrency } from "@/lib/types/CryptoCurrency"
import { formatCurrency } from "@/lib/utils/currency"
import ErrorPage from "@/components/ErrorPage/ErrorPage"
import CurrencyPageSkeleton from "@/components/CurrencyPageSkeleton/CurrencyPageSkeleton"
import { wrapper } from "@/lib/store"

const priceValues = [
  { id: 'price_usd', text: 'USD Price' },
  { id: 'price_btc', text: 'BTC Price', noFormat: true },
  { id: 'market_cap_usd', text: 'Market Cap' }
]

const percentageValues = [
  { id: 'percent_change_1h', text: '1h %' },
  { id: 'percent_change_24h', text: '24h %' },
  { id: 'percent_change_7d', text: '7d %' }
]

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const currencyId = context.params?.currencyId
    if (currencyId) {
      store.dispatch(cryptoCurrenciesApi.endpoints.getCryptoCurrencyById.initiate(currencyId as string))
    }

    await Promise.all(store.dispatch(cryptoCurrenciesApi.util.getRunningQueriesThunk()));

    return {
      props: { currencyId },
    };
  }
);

interface CurrencyPageProps {
  currencyId: string
}

export default function CurrencyPage({ currencyId }: CurrencyPageProps) {
  const { data, error, isLoading } = useGetCryptoCurrencyByIdQuery(currencyId as string)
  const cryptoCurrency = data && data.length > 0 ? data[0] : null
  return (
    <main>
      <section className="sm:container sm:mx-auto sm:max-w-screen-md m-4">
        {!isLoading && !error && cryptoCurrency && (
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
                  <p className="text-left">{item.noFormat ? cryptoCurrency[item.id as keyof CryptoCurrency] || '0' : formatCurrency(parseFloat(cryptoCurrency[item.id as keyof CryptoCurrency] as string || '0'))}</p>
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
        {isLoading && <CurrencyPageSkeleton />}
        {error && (
          <ErrorPage />
        )}
      </section>
    </main>
  )
}