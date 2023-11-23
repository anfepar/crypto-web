import { FETCH_ITEMS_LIMIT } from "@/app/lib/constants/numbers";
import { useCallback, useState } from "react";

interface PaginationProps {
  currentPage: number,
  totalPages: number,
  onPageClick: (newPage: number) => void
}

const MAX_DESKTOP_PAGES = 6;

export default function Pagination({ currentPage, totalPages, onPageClick }: PaginationProps) {
  const [showFirstItems, setShowFirstItems] = useState(true)
  const totalButtonPages = totalPages < MAX_DESKTOP_PAGES ? totalPages : Math.ceil(totalPages / FETCH_ITEMS_LIMIT);

  const buttonPages = useCallback(() => {
    let buttonsArray;
    if (showFirstItems) {
      const firstPagesNumbers = Array.from({ length: MAX_DESKTOP_PAGES }, (_, index) => index + 1);
      const lastPagesNumbers = [-1, totalButtonPages]
      buttonsArray = [...firstPagesNumbers, ...lastPagesNumbers];
    } else {
      const firstPagesNumbers = [1, -1]
      const lastPagesNumbers = Array.from({ length: MAX_DESKTOP_PAGES }, (_, index) => totalButtonPages - index).reverse();
      buttonsArray = [...firstPagesNumbers, ...lastPagesNumbers];
    }

    return buttonsArray.map(page => {
      let buttonText: number | string = page
      let action = () => onPageClick(page)
      if (page < 0) {
        buttonText = "..."
        action = () => {
          onPageClick(totalPages - MAX_DESKTOP_PAGES - 1)
          setShowFirstItems(!showFirstItems)
        }
      }
      return (
        <tr key={page}>
          <td>
            <button onClick={action}>
              {buttonText}
            </button>
          </td>
        </tr>
      )
    })
  }, [totalPages, onPageClick, showFirstItems, totalButtonPages])

  if (!totalPages) return null
  return (
    <div>
      <ul>
        <li><button onClick={() => onPageClick(currentPage - 1)}>prev</button></li>
        {buttonPages()}
        <li><button onClick={() => onPageClick(currentPage + 1)}>next</button></li>
      </ul>
    </div>

  )
}