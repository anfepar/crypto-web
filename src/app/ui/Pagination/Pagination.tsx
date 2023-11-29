import { useMemo } from "react";
import { getTotalPages } from "@/app/lib/utils/pagination";
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

interface PaginationProps {
  currentPage: number,
  totalCoins: number,
  onPageClick: (newPage: number) => void
}

export default function Pagination({ currentPage, totalCoins, onPageClick }: PaginationProps) {
  const totalPages = useMemo(() => getTotalPages(totalCoins), [totalCoins]);

  if (totalCoins === 0) return null
  return (
    <div className="flex justify-center my-6">
      <ul className="grid grid-flow-col grid-cols-6 w-60" >
        <li className="flex justify-center">
          <button data-testid="button-first-page" onClick={() => onPageClick(1)}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </button>
        </li>
        <li>
          <button
            className={clsx({
              'text-slate-400': currentPage === 1
            })}
            disabled={currentPage === 1}
            onClick={() => currentPage > 1 ? onPageClick(currentPage - 1) : null}
            data-testid="button-prev-page"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </li>
        {currentPage !== 1 &&
          <li>
            <button onClick={() => currentPage > 1 ? onPageClick(currentPage - 1) : null}>
              {currentPage - 1}
            </button>
          </li>
        }
        <li>
          <span className="font-bold cursor-pointer">{currentPage}</span>
        </li>
        {currentPage !== totalPages &&
          <li>
            <button onClick={() => currentPage < totalPages ? onPageClick(currentPage + 1) : null}>
              {currentPage + 1}
            </button>
          </li>
        }
        <li>
          <button
            className={clsx({
              'text-slate-400': currentPage === totalPages
            })}
            disabled={currentPage === totalPages}
            onClick={() => currentPage < totalPages ? onPageClick(currentPage + 1) : null}
            data-testid="button-next-page"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </li>
        <li>
          <button data-testid="button-last-page" onClick={() => onPageClick(totalPages)}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </li>
      </ul>
    </div>
  )
}