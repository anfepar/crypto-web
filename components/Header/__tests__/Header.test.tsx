import { render } from "@testing-library/react"
import { usePathname } from "next/navigation"
import Header from "../Header"

jest.mock("next/navigation", () => ({
  usePathname: jest.fn()
}))

const mockUsePathname = usePathname as jest.Mock

describe('Header tests', () => {
  it('should show the correct elements in home page', () => {
    mockUsePathname.mockImplementation(() => "/")
    const { getByText, getByTestId, queryByTestId } = render(<Header />)
    expect(getByText('Crypto Currencies')).toBeInTheDocument()
    expect(queryByTestId('back-button-arrow')).not.toBeInTheDocument()
    expect(getByTestId('coins-button')).toBeInTheDocument()
  })

  it('should show the correct elements in home page', () => {
    mockUsePathname.mockImplementation(() => "/test")
    const { getByText, getByTestId } = render(<Header />)
    expect(getByText('Crypto Currencies')).toBeInTheDocument()
    expect(getByTestId('coins-button')).toBeInTheDocument()
  })
})
