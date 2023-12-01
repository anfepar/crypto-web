import { act, fireEvent, render } from '@testing-library/react'
import Pagination from '../Pagination'
import { useRouter } from 'next/navigation'

jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}))

const mockUseRouter = useRouter as jest.Mock


describe('Pagination tests', () => {
  it('should show the correct pages and buttons', () => {
    const { getByRole, getByTestId, getByText } = render(<Pagination totalCoins={300} currentPage={2} />)
    const firstPageButton = getByTestId('button-first-page');
    const prevPageButton = getByTestId('button-prev-page');
    const nextPageButton = getByTestId('button-next-page');
    const lastPageButton = getByTestId('button-last-page');
    const prevPageNumber = getByRole('button', { name: '1' })
    const nextPageNumber = getByRole('button', { name: '3' })
    const currentPageNumber = getByText('2')

    expect(firstPageButton).toBeInTheDocument()
    expect(prevPageButton).toBeInTheDocument()
    expect(nextPageButton).toBeInTheDocument()
    expect(lastPageButton).toBeInTheDocument()
    expect(prevPageNumber).toBeInTheDocument()
    expect(nextPageNumber).toBeInTheDocument()
    expect(currentPageNumber).toBeInTheDocument()
  })

  it('should disable prev button and hide prev page number button when current page is the first one', () => {
    const { queryByRole, getByTestId } = render(<Pagination totalCoins={200} currentPage={1} />)
    const prevPageButton = getByTestId('button-prev-page');
    const prevPageNumber = queryByRole('button', { name: '1' })
    expect(prevPageButton).toBeDisabled()
    expect(prevPageNumber).toBeNull()
  })

  it('should disable next button and hide next page number button when current page is the last one', () => {
    const { queryByRole, getByTestId } = render(<Pagination totalCoins={200} currentPage={2} />)
    const nextPageButton = getByTestId('button-next-page');
    const nextPageNumber = queryByRole('button', { name: '2' })
    expect(nextPageButton).toBeDisabled()
    expect(nextPageNumber).toBeNull()
  })

  it('should avoid render if total coins prop is zero', () => {
    const { container } = render(<Pagination totalCoins={0} currentPage={2} />)
    expect(container.innerHTML).toBeFalsy()
  })

  it('should send correct page to onPageClick function parameter', () => {
    const mockPushFunction = jest.fn(page => page)
    mockUseRouter.mockImplementation(() => ({ push: mockPushFunction }))
    const { getByTestId, getByRole } = render(<Pagination totalCoins={300} currentPage={2} />)
    const firstPageButton = getByTestId('button-first-page');
    const prevPageButton = getByTestId('button-prev-page');
    const nextPageButton = getByTestId('button-next-page');
    const lastPageButton = getByTestId('button-last-page');
    const prevPageNumber = getByRole('button', { name: '1' })
    const nextPageNumber = getByRole('button', { name: '3' })

    const paginationButtons = [
      { element: firstPageButton, result: 1 },
      { element: lastPageButton, result: 3 },
      { element: prevPageButton, result: 1 },
      { element: nextPageButton, result: 3 },
      { element: prevPageNumber, result: 1 },
      { element: nextPageNumber, result: 3 }
    ]

    paginationButtons.forEach((buttonElement, index) => {
      fireEvent.click(buttonElement.element)
      expect(mockPushFunction.mock.results[index].value.includes(buttonElement.result)).toBeTruthy()
    })
  })
})
