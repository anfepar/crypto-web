import { formatCurrency } from "@/app/lib/utils/currency"

export type Transformer = string | number
interface TableHeaderConfig {
  id: string,
  value: string,
  classes: string,
  transformer?: (value: Transformer) => Transformer,
  subItems?: TableHeaderConfig[]
}

export const tableHeaderConfig: TableHeaderConfig[] = [
  {
    id: 'symbol', value: 'Coin', classes: 'text-left', subItems: [
      { id: 'name', value: 'Name', classes: 'text-left text-xs	sm:text-sm' }
    ]
  },
  {
    id: 'price_usd', value: 'USD Price', transformer: (value: Transformer) => {
      const numberValue = typeof value === "string" ? parseFloat(value) : value
      return formatCurrency(numberValue)
    }, classes: 'text-left'
  },
  { id: 'price_btc', value: 'BTC Price', classes: 'text-left' }
]
