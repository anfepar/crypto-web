import { getTotalPages } from "@/app/lib/utils/pagination";
import { useMemo } from "react";
interface PaginationProps {
  currentPage: number,
  totalCoins: number,
  onPageClick: (newPage: number) => void
}

export default function Pagination({ currentPage, totalCoins, onPageClick }: PaginationProps) {
  const totalPages = useMemo(() => getTotalPages(totalCoins), [totalCoins]);

  if (totalCoins === 0) return null
  return (
    <div className="flex">
      <ul className="flex">
        <li><button data-testid="button-first-page" onClick={() => onPageClick(1)}>first</button></li>
        <li>
          <button
            disabled={currentPage === 1}
            onClick={() => currentPage > 1 ? onPageClick(currentPage - 1) : null}
            data-testid="button-prev-page"
          >
            prev
          </button>
        </li>
        {currentPage !== 1 &&
          <li>
            <button onClick={() => currentPage > 1 ? onPageClick(currentPage - 1) : null}>
              {currentPage - 1}
            </button>
          </li>}
        <li><span>{currentPage}</span></li>
        {currentPage !== totalPages &&
          <li>
            <button onClick={() => currentPage < totalPages ? onPageClick(currentPage + 1) : null}>
              {currentPage + 1}
            </button>
          </li>}
        <li>
          <button
            disabled={currentPage === totalPages}
            onClick={() => currentPage < totalPages ? onPageClick(currentPage + 1) : null}
            data-testid="button-next-page"
          >
            next
          </button>
        </li>
        <li><button data-testid="button-last-page" onClick={() => onPageClick(totalPages)}>last</button></li>
      </ul>
    </div>
  )
}