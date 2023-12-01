import { act, getByRole, getByText, render } from "@testing-library/react"
import Page from "../page"
import { cryptoCurrenciesMock } from "@/app/__mocks__/cryptoCurrencies"
import { formatCurrency } from "@/app/lib/utils/currency"

jest.mock("../../../lib/cryptoCurrenciesApi", () => ({
  getCryptoCurrenciesById: () => cryptoCurrenciesMock
}))

const CRYPTO_CURRENCY_ID = '90'

describe('Currency page tests', () => {
  it("should display the correct components when data is fetched", () => {
    const currentCurrency = cryptoCurrenciesMock.filter(item => item.id === CRYPTO_CURRENCY_ID)
    let container;
    act(async () => {
      container = render(await Page({ params: { currencyId: '90' } }))
    })
    if (container) {
      expect(getByRole(container, 'heading', { level: 1, name: currentCurrency[0].name })).toBeInTheDocument()
      expect(getByRole(container, 'heading', { level: 2, name: currentCurrency[0].symbol })).toBeInTheDocument()
      expect(getByText(container, `# ${currentCurrency[0].rank}`)).toBeInTheDocument()

      expect(getByText(container, '1h %')).toBeInTheDocument()
      expect(getByText(container, '24h %')).toBeInTheDocument()
      expect(getByText(container, '7d %')).toBeInTheDocument()

      expect(getByText(container, 'USD Price')).toBeInTheDocument()
      expect(getByText(container, 'BTC Price')).toBeInTheDocument()
      expect(getByText(container, 'Market Cap')).toBeInTheDocument()

      expect(getByText(container, currentCurrency[0].percent_change_1h)).toBeInTheDocument()
      expect(getByText(container, currentCurrency[0].percent_change_24h)).toBeInTheDocument()
      expect(getByText(container, currentCurrency[0].percent_change_7d)).toBeInTheDocument()

      expect(getByText(container, formatCurrency(parseFloat(currentCurrency[0].price_usd)))).toBeInTheDocument()
      expect(getByText(container, currentCurrency[0].price_btc)).toBeInTheDocument()
      expect(getByText(container, formatCurrency(parseFloat(currentCurrency[0].market_cap_usd)))).toBeInTheDocument()
    }
  })

})