import { getAllByRole, getByPlaceholderText, getByRole, getByTestId, render, act, getByText } from "@testing-library/react"
import { FAKE_ITEMS_QUANTITY } from "../ui/CryptoCurrenciesTable/CryptoCurrenciesTableSkeleton";
import { useSearchParams } from "next/navigation";
import fetchMock from "jest-fetch-mock"
import Page from "../page"
import { cryptoCurrenciesMock } from "../__mocks__/cryptoCurrencies";

interface SearchParams { page: number, filter: string | null }
const searchParamsFilter: SearchParams = {
  page: 1,
  filter: '90'
}

const searchParams: SearchParams = {
  page: 1,
  filter: null
}

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter() {
    return {
      push: () => { }
    }
  }
}))

jest.mock("../lib/cryptoCurrenciesApi", () => ({
  getCryptoCurrenciesById: jest.fn(),
  getCryptoCurrenciesByPage: jest.fn()
}))

fetchMock.mockResponse(JSON.stringify({ data: cryptoCurrenciesMock }))


const mockUseSearchParams = useSearchParams as jest.Mock

describe('Home tests', () => {
  it("should display the correct components when data is fetched", () => {
    mockUseSearchParams.mockImplementation(() =>
      ({ get: (key: string) => searchParams[key as keyof SearchParams] })
    )
    let container = null;
    act(async () => {
      const reactRender = render(await Page({ searchParams: { page: '1' } }))
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


  it("should filter crypto currency if filter search param is set", () => {
    mockUseSearchParams.mockImplementation(() =>
      ({ get: (key: string) => searchParamsFilter[key as keyof SearchParams] })
    )

    let container = null;
    act(async () => {
      const reactRender = render(await Page({ searchParams: { page: '1', filter: '90' } }))
      container = reactRender.container
    });
    if (container) {
      const tableRows = getAllByRole(container, 'row')
      expect(tableRows.length).toBe(2)
    }
  })
})



