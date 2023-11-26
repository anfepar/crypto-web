import { formatCurrency } from "@/app/lib/utils/currency"

export type Transformer = string | number

export const tableHeaderConfig = [
  { id: 'name', value: 'Name' },
  { id: 'symbol', value: 'Symbol' },
  {
    id: 'price_usd', value: 'USD Price', transformer: (value: Transformer) => {
      const numberValue = typeof value === "string" ? parseFloat(value) : value
      return formatCurrency(numberValue)
    }
  },
  { id: 'price_btc', value: 'BTC Price' }
]
