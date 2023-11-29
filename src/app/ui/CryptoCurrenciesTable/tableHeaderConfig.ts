import { formatCurrency } from "@/app/lib/utils/currency"

export type Transformer = string | number

export const tableHeaderConfig = [
  { id: 'name', value: 'Name', classes: 'text-left' },
  { id: 'symbol', value: 'Symbol', classes: 'text-left' },
  {
    id: 'price_usd', value: 'USD Price', transformer: (value: Transformer) => {
      const numberValue = typeof value === "string" ? parseFloat(value) : value
      return formatCurrency(numberValue)
    }, classes: 'text-left'
  },
  { id: 'price_btc', value: 'BTC Price',  classes: 'text-left' }
]
