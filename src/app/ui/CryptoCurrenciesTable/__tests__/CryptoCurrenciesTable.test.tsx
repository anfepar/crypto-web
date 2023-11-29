import { render } from '@testing-library/react'
import { cryptoCurrenciesMock } from '@/app/__mocks__/cryptoCurrencies'
import { formatCurrency } from '@/app/lib/utils/currency'
import '@testing-library/jest-dom'
import CryptoCurrenciesTable from '../CryptoCurrenciesTable'


describe('CryptoCurrenciesTable tests', () => {
  it('should show the cryptocurrencies list', () => {
    const { getAllByRole } = render(<CryptoCurrenciesTable cryptoCurrencies={cryptoCurrenciesMock} />)
    const tableRows: HTMLElement[] = getAllByRole('row')
    const tableHeaders = tableRows[0]
    const tableHeadersElements = tableHeaders.getElementsByTagName('th')
    //Validate headers
    const headers = ['Name', 'Symbol', 'USD Price', 'BTC Price']
    expect(tableHeadersElements.length).toBe(headers.length)
    headers.forEach((header, index) => {
      expect(tableHeadersElements[index].innerHTML).toBe(header)
    })
    //Validate table rows
    const tableBodyRows = tableRows.slice(1)
    expect(tableBodyRows.length).toBe(4)
    tableBodyRows.forEach((row, index) => {
      const rowItems = row.getElementsByTagName('td')
      const cryptoCurrency = cryptoCurrenciesMock[index]
      const formattedPrice = formatCurrency(parseFloat(cryptoCurrency.price_usd))
      const showedInfo = [cryptoCurrency.name, cryptoCurrency.symbol, formattedPrice, cryptoCurrency.price_btc]
      showedInfo.forEach((item, index) => {
        expect(rowItems[index].innerHTML).toBe(item)
      })
    })
  })

  it('should show empty state', () => {
    const { getByText } = render(<CryptoCurrenciesTable cryptoCurrencies={[]} />)
    const emptyParagraph: HTMLElement = getByText('No data to show')
    expect(emptyParagraph).toBeInTheDocument()
  })
})
