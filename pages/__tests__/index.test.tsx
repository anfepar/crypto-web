import { getAllByRole, getByPlaceholderText, getByRole, getByTestId, render, act, getByText } from "@testing-library/react"
import { cryptoCurrenciesMock } from "../__mocks__/cryptoCurrencies";
import { useGetCryptocurrenciesByPageQuery } from "../../lib/cryptoCurrenciesApi";
import { FAKE_ITEMS_QUANTITY } from "../../components/CryptoCurrenciesTable/CryptoCurrenciesTableSkeleton";
import { useSearchParams } from "next/navigation";
import Home from "..";

jest.mock("../../lib/cryptoCurrenciesApi", () => ({
  useGetCryptocurrenciesByPageQuery: jest.fn(),
  getCryptoCurrenciesById: jest.fn()
}))

jest.mock("next/navigation", () => ({
  useRouter: () => {
    push: jest.fn()
  }
}))

const mockUseGetCryptocurrenciesByPageQuery = useGetCryptocurrenciesByPageQuery as jest.Mock

describe('Home tests', () => {
  it("should display the correct components when data is fetched", () => {
    mockUseGetCryptocurrenciesByPageQuery.mockImplementation(() => ({
      data: ({ data: cryptoCurrenciesMock, info: { coins_num: 300 } }),
      isLoading: false,
      error: null
    }))

    let container = null;
    act(() => {
      const reactRender = render(<Home currentPage={1} filterParam={''} />)
      container = reactRender.container
    });

    if (container) {
      const searchBar = getByPlaceholderText(container, 'Search by Symbol / Name')
      const tableRows = getAllByRole(container, 'row')
      const firstPageButton = getByTestId(container, 'button-first-page');
      const prevPageButton = getByTestId(container, 'button-prev-page');
      const nextPageButton = getByTestId(container, 'button-next-page');
      const lastPageButton = getByTestId(container, 'button-last-page');
      const currentPage = getByText(container, 1)
      const prevPageNumber = getByRole(container, 'button', { name: '2' })
      expect(searchBar).toBeInTheDocument()
      expect(tableRows.length).toBe(5)
      expect(firstPageButton).toBeInTheDocument()
      expect(prevPageButton).toBeInTheDocument()
      expect(nextPageButton).toBeInTheDocument()
      expect(lastPageButton).toBeInTheDocument()
      expect(prevPageNumber).toBeInTheDocument()
      expect(currentPage).toBeInTheDocument()
    }
  })

  it("should display the correct components when redux hook is loading", () => {
    mockUseGetCryptocurrenciesByPageQuery.mockImplementation(() => ({
      data: ({ data: cryptoCurrenciesMock, info: { coins_num: 300 } }),
      isLoading: true,
      error: null
    }))

    let container = null;
    act(() => {
      const reactRender = render(<Home currentPage={1} filterParam={''} />)
      container = reactRender.container
    });
    if (container) {
      expect(getByTestId(container, 'search-bar-skeleton')).toBeInTheDocument()
      expect(getAllByRole(container, 'row').length).toBe(FAKE_ITEMS_QUANTITY + 1)
    }
  })

  it("should show correct components when there are an error in fetch", () => {
    mockUseGetCryptocurrenciesByPageQuery.mockImplementation(() => ({
      data: ({ data: cryptoCurrenciesMock, info: { coins_num: 300 } }),
      isLoading: false,
      error: { error: 'fake error' }
    }))
    let container = null;
    act(() => {
      const reactRender = render(<Home currentPage={1} filterParam={''} />)
      container = reactRender.container
    });
    if (container) {
      expect(getByText(container, 'An error has occurred. Try again later.')).toBeInTheDocument()
    }
  })
})

it("should filter crypto currency if filter search param is set", () => {
  mockUseGetCryptocurrenciesByPageQuery.mockImplementation(() => ({
    data: ({ data: cryptoCurrenciesMock, info: { coins_num: 300 } }),
    isLoading: false,
    error: null
  }))

  let container = null;
  act(() => {
    const reactRender = render(<Home currentPage={1} filterParam={'90'} />)
    container = reactRender.container
  });
  if (container) {
    const tableRows = getAllByRole(container, 'row')
    expect(tableRows.length).toBe(2)
  }
})
