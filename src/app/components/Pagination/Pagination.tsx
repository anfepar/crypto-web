import { getTotalPages } from "@/app/lib/utils/pagination";

interface PaginationProps {
  currentPage: number,
  totalCoins: number,
  onPageClick: (newPage: number) => void
}

export default function Pagination({ currentPage, totalCoins, onPageClick }: PaginationProps) {
  if (!totalCoins) return null
  return (
    <div className="flex">
      <ul className="flex">
        <li><button onClick={() => onPageClick(1)}>first</button></li>
        <li><button onClick={() => currentPage > 1 ? onPageClick(currentPage - 1) : null}>prev</button></li>
        <li><span>{currentPage}</span></li>
        <li><button onClick={() => currentPage < getTotalPages(totalCoins) ? onPageClick(currentPage + 1) : null}>next</button></li>
        <li><button onClick={() => onPageClick(getTotalPages(totalCoins))}>last</button></li>
      </ul>
    </div>

  )
}