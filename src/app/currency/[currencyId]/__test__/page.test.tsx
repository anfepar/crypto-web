import { render } from "@testing-library/react"
import Page from "../page"
import { useGetCryptoCurrencyByIdQuery } from "@/app/lib/cryptoCurrenciesApi"
import { cryptoCurrenciesMock } from "@/app/__mocks__/cryptoCurrencies"
import { formatCurrency } from "@/app/lib/utils/currency"

jest.mock("../../../lib/cryptoCurrenciesApi", () => ({
  useGetCryptoCurrencyByIdQuery: jest.fn()
}))

const mockUseGetCryptoCurrencyByIdQuery = useGetCryptoCurrencyByIdQuery as jest.Mock
const CRYPTO_CURRENCY_ID = '90'

describe('Currency page tests', () => {
  it("should display the correct components when data is fetched", () => {
    mockUseGetCryptoCurrencyByIdQuery.mockImplementation((id: string) => ({
      data: cryptoCurrenciesMock.filter(item => item.id === id),
      isLoading: false,
      error: null
    }))

    const currentCurrency = cryptoCurrenciesMock.filter(item => item.id === CRYPTO_CURRENCY_ID)

    const { getByRole, getByText } = render(<Page params={{ currencyId: CRYPTO_CURRENCY_ID }} />)
    expect(getByRole('heading', { level: 1, name: currentCurrency[0].name })).toBeInTheDocument()
    expect(getByRole('heading', { level: 2, name: currentCurrency[0].symbol })).toBeInTheDocument()
    expect(getByText(`# ${currentCurrency[0].rank}`)).toBeInTheDocument()

    expect(getByText('1h %')).toBeInTheDocument()
    expect(getByText('24h %')).toBeInTheDocument()
    expect(getByText('7d %')).toBeInTheDocument()

    expect(getByText('USD Price')).toBeInTheDocument()
    expect(getByText('BTC Price')).toBeInTheDocument()
    expect(getByText('Market Cap')).toBeInTheDocument()

    expect(getByText(currentCurrency[0].percent_change_1h)).toBeInTheDocument()
    expect(getByText(currentCurrency[0].percent_change_24h)).toBeInTheDocument()
    expect(getByText(currentCurrency[0].percent_change_7d)).toBeInTheDocument()

    expect(getByText(formatCurrency(parseFloat(currentCurrency[0].price_usd)))).toBeInTheDocument()
    expect(getByText(currentCurrency[0].price_btc)).toBeInTheDocument()
    expect(getByText(formatCurrency(parseFloat(currentCurrency[0].market_cap_usd)))).toBeInTheDocument()
  })

  it("should display the correct components when redux hook is loading", () => {
    mockUseGetCryptoCurrencyByIdQuery.mockImplementation((id: string) => ({
      data: cryptoCurrenciesMock.filter(item => item.id === id),
      isLoading: true,
      error: null
    }))

    const currentCurrency = cryptoCurrenciesMock.filter(item => item.id === CRYPTO_CURRENCY_ID)

    const { getByRole, getAllByText, getByText } = render(<Page params={{ currencyId: CRYPTO_CURRENCY_ID }} />)
    expect(getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument()

    expect(getByText('1h %')).toBeInTheDocument()
    expect(getByText('24h %')).toBeInTheDocument()
    expect(getByText('7d %')).toBeInTheDocument()

    expect(getByText('USD Price')).toBeInTheDocument()
    expect(getByText('BTC Price')).toBeInTheDocument()
    expect(getByText('Market Cap')).toBeInTheDocument()

    expect(getAllByText('').length).toBe(16)
  })

  it("should display the correct components on error", () => {
    mockUseGetCryptoCurrencyByIdQuery.mockImplementation((id: string) => ({
      data: cryptoCurrenciesMock.filter(item => item.id === id),
      isLoading: false,
      error: { error: 'fake error' }
    }))

    const { getByText } = render(<Page params={{ currencyId: CRYPTO_CURRENCY_ID }} />)
    expect(getByText('An error has occurred. Try again later.')).toBeInTheDocument()
  })


})