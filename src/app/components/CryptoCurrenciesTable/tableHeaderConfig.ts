export type Transformer = string | number

export const tableHeaderConfig = [
  { id: 'name', value: 'Name' },
  { id: 'symbol', value: 'symbol' }, {
    id: 'price_usd', value: 'USD Price', transformer: (value: Transformer) => {
      let currentValue = typeof value === "string" ? parseFloat(value) : value;
      return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumSignificantDigits: 21
      }).format(currentValue)
    }
  },
  { id: 'price_btc', value: 'BTC Price' }
]
