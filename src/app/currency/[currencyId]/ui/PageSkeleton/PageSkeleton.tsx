import React from "react"
import { CryptoCurrency } from "@/app/lib/types/CryptoCurrency"
import { formatCurrency } from "@/app/lib/utils/currency"

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

export default function PageSkeleton() {
  return (
    <>
      <div className="animate-pulse grid grid-cols-2 grid-rows-2 gap-1 bg-slate-200 p-4 rounded my-6">
        <p className="row-span-2 rounded-full bg-slate-100 w-14 h-14 py-4 mx-auto px-4 whitespace-nowrap font-bold bg-white" />
        <h1 className="text-xl uppercase font-bold w-14 bg-white rounded" />
        <h2 className="bg-white rounded" />
      </div>
      <div className="grid grid-cols-2 grid-rows-3 bg-slate-200 rounded p-4 my-6 animate-pulse">
        {priceValues.map(item => (
          <React.Fragment key={item.id}>
            <p className="font-bold text-center">{item.text}</p>
            <p className="text-left bg-white rounded my-1" />
          </React.Fragment>
        ))}
      </div>
      <div className="grid grid-cols-3 grid-rows-2 bg-slate-200 grid-flow-col rounded p-4 my-6 animate-pulse">
        {percentageValues.map(item => (
          <React.Fragment key={item.id}>
            <p className="font-bold text-center rounded">{item.text}</p>
            <p className="text-center rounded bg-white mx-1" />
          </React.Fragment>
        ))}
      </div>
    </>
  )
}