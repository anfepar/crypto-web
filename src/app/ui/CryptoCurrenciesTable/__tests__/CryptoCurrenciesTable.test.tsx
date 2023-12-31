import { render } from '@testing-library/react'
import { cryptoCurrenciesMock } from '@/app/__mocks__/cryptoCurrencies'
import { CryptoCurrency } from '@/app/lib/types/CryptoCurrency'
import CryptoCurrenciesTable from '../CryptoCurrenciesTable'
import { tableHeaderConfig } from '../tableHeaderConfig'
import fetchMock from "jest-fetch-mock"
import '@testing-library/jest-dom'


describe('CryptoCurrenciesTable tests', () => {
  it('should show the cryptocurrencies list', () => {
    fetchMock.mockResponse(JSON.stringify({ data: cryptoCurrenciesMock[0] }))
    const { getAllByRole } = render(<CryptoCurrenciesTable cryptoCurrencies={cryptoCurrenciesMock} />)
    const tableRows: HTMLElement[] = getAllByRole('row')
    const tableHeaders = tableRows[0]
    const tableHeadersElements = tableHeaders.getElementsByTagName('th')
    //Validate headers
    expect(tableHeadersElements.length).toBe(tableHeaderConfig.length)
    tableHeaderConfig.forEach((header, index) => {
      expect(tableHeadersElements[index].innerHTML).toBe(header.value)
    })
    //Validate table rows
    const tableBodyRows = tableRows.slice(1)
    expect(tableBodyRows.length).toBe(4)
    tableBodyRows.forEach((row, index) => {
      const rowItems = row.getElementsByTagName('td')
      const cryptoCurrency = cryptoCurrenciesMock[index]
      tableHeaderConfig.forEach((header, index) => {
        const value = header.transformer ? header.transformer(cryptoCurrency[header.id as keyof CryptoCurrency]) : cryptoCurrency[header.id as keyof CryptoCurrency]
        if (header.subItems) {
          expect(rowItems[index].innerHTML.includes(`${value}`)).toBeTruthy()
          header.subItems.forEach(subItem => {
            const subItemValue = subItem?.transformer ? subItem?.transformer(cryptoCurrency[subItem.id as keyof CryptoCurrency]) : cryptoCurrency[subItem.id as keyof CryptoCurrency]
            expect(rowItems[index].innerHTML.includes(`${subItemValue}`)).toBeTruthy()
          })
        } else {
          expect(rowItems[index].innerHTML).toBe(value)
        }
      })
    })
  })

  it('should show empty state', () => {
    fetchMock.mockResponse(JSON.stringify({ data: cryptoCurrenciesMock[0] }))
    const { getAllByRole } = render(<CryptoCurrenciesTable cryptoCurrencies={[]} />)
    const tableRows: HTMLElement[] = getAllByRole('row')
    const tableHeaders = tableRows[0]
    const tableHeadersElements = tableHeaders.getElementsByTagName('th')
    //Validate headers
    expect(tableHeadersElements.length).toBe(tableHeaderConfig.length)
    //Validate table rows
    const tableBodyRows = tableRows.slice(1)
    expect(tableBodyRows.length).toBe(0)
  })
})
