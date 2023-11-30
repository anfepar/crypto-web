'use client'
import { useGetCryptoCurrencyByIdQuery } from "@/app/lib/cryptoCurrenciesApi"

interface PageProps {
  params: {
    currencyId: string
  }
}

export default function Page({ params }: PageProps) {
  const { currencyId } = params
  const { data, error, isLoading } = useGetCryptoCurrencyByIdQuery(currencyId)
  const cryptoCurrency = data && data.length > 0 ? data[0] : null
  return (
    <main>
      <section>
        {!isLoading && (
          <>
            <h1>{cryptoCurrency?.name}</h1>
            <h2>{cryptoCurrency?.symbol}</h2>
            <p>{cryptoCurrency?.rank}</p>
            <p>{cryptoCurrency?.price_usd}</p>
            <p>{cryptoCurrency?.price_btc}</p>
            <p>{cryptoCurrency?.percent_change_1h}</p>
            <p>{cryptoCurrency?.percent_change_24h}</p>
            <p>{cryptoCurrency?.percent_change_7d}</p>
            <p>{cryptoCurrency?.market_cap_usd}</p>
            <p>{cryptoCurrency?.volume24}</p>
          </>
        )}
      </section>
    </main>
  )
}