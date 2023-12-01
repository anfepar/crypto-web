import { act, fireEvent, render } from "@testing-library/react"
import { cryptoCurrenciesMock } from "../../../__mocks__/cryptoCurrencies"
import fetchMock from "jest-fetch-mock"
import SearchBar from "../SearchBar"

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: () => { }
    };
  },
}))


describe('Search bar tests', () => {
  it('should render correct elements ', () => {
    const { getByPlaceholderText } = render(<SearchBar cryptoCurrencies={cryptoCurrenciesMock} currentPage={1} totalPages={1} filterIsActive={false} />)
    const searchInput = getByPlaceholderText('Search by Symbol / Name')
    expect(searchInput).toBeInTheDocument()
  })
  it('should filtered elements depending input value', () => {
    const { getByPlaceholderText, getAllByRole } = render(<SearchBar cryptoCurrencies={cryptoCurrenciesMock} currentPage={1} totalPages={1} filterIsActive={false} />)
    const searchInput = getByPlaceholderText('Search by Symbol / Name')
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'BTC' } })
    })
    const filteredList = getAllByRole('listitem')
    expect(filteredList.length).toBe(1)
    const firstFilteredItem = filteredList[0]
    expect(firstFilteredItem.firstChild?.textContent).toBe('BTCBitcoin')
  })
  it('should set selected element as input value after click an element', () => {
    const { getByPlaceholderText, getAllByRole } = render(<SearchBar cryptoCurrencies={cryptoCurrenciesMock} currentPage={1} totalPages={1} filterIsActive={false} />)
    const searchInput = getByPlaceholderText('Search by Symbol / Name')
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'BTC' } })
    })
    const filteredList = getAllByRole('listitem')
    const filteredItemButton = filteredList[0].firstElementChild
    if (filteredItemButton) {
      fireEvent.click(filteredItemButton)
      expect(searchInput.getAttribute('value')).toBe('BTC - Bitcoin')
    }
  })
  it('should set selected element as input value after receive filter is active prop', () => {
    const { getByPlaceholderText } = render(<SearchBar cryptoCurrencies={[cryptoCurrenciesMock[0]]} currentPage={1} totalPages={1} filterIsActive={true} />)
    const searchInput = getByPlaceholderText('Search by Symbol / Name')
    expect(searchInput.getAttribute('value')).toBe('BTC - Bitcoin')
  })
  it('should fetch more items if there is not filtered results in current items', () => {
    fetchMock.mockResponse(JSON.stringify({ data: [] }))
    const { getByPlaceholderText, getByText } = render(<SearchBar cryptoCurrencies={cryptoCurrenciesMock} currentPage={1} totalPages={2} filterIsActive={false} />)
    const searchInput = getByPlaceholderText('Search by Symbol / Name')
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'TRON' } })
    });
    const loadingMessage = getByText(/Loading/g)
    expect(loadingMessage).toBeInTheDocument()
    expect(fetchMock.mock.calls.length).toBe(1)
  })
})
