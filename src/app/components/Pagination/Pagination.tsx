import { FETCH_ITEMS_LIMIT } from "@/app/lib/constants/numbers";

interface PaginationProps {
  currentPage: number,
  totalPages: number,
  onPageClick: (newPage: number) => void
}

const MAX_DESKTOP_PAGES = 6;

export default function Pagination({ currentPage, totalPages, onPageClick }: PaginationProps) {
  const totalButtonPages = totalPages < MAX_DESKTOP_PAGES ? totalPages : Math.ceil(totalPages / FETCH_ITEMS_LIMIT);

  if (!totalPages) return null
  return (
    <div className="flex">
      <ul className="flex">
        <li><button onClick={() => onPageClick(1)}>first</button></li>
        <li><button onClick={() => currentPage > 1 ? onPageClick(currentPage - 1) : null}>prev</button></li>
        <li><span>{currentPage}</span></li>
        <li><button onClick={() => currentPage < totalButtonPages ? onPageClick(currentPage + 1) : null}>next</button></li>
        <li><button onClick={() => onPageClick(totalButtonPages)}>last</button></li>
      </ul>
    </div>

  )
}