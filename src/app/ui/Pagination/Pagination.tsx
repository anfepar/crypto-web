'use client'
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { getTotalPages } from "@/app/lib/utils/pagination";
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { appendParamsSearchParams } from "@/app/lib/utils/location";
import clsx from "clsx";


interface PaginationProps {
  currentPage: number,
  totalCoins: number
}

export default function Pagination({ currentPage, totalCoins }: PaginationProps) {
  const totalPages = useMemo(() => getTotalPages(totalCoins), [totalCoins]);
  const router = useRouter()
  const handleChangePage = (newPage: number) => {
    const redirectUrl = appendParamsSearchParams(location.search, { page: newPage.toString() })
    router.push(`/?${redirectUrl}`)
  }

  if (totalCoins === 0) return null
  return (
    <div className="flex justify-center my-6">
      <ul className="grid grid-flow-col grid-cols-6 w-60" >
        <li className="flex justify-center">
          <button data-testid="button-first-page" onClick={() => handleChangePage(1)}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </button>
        </li>
        <li>
          <button
            className={clsx({
              'text-slate-400': currentPage === 1
            })}
            disabled={currentPage === 1}
            onClick={() => currentPage > 1 ? handleChangePage(currentPage - 1) : null}
            data-testid="button-prev-page"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </li>
        {currentPage !== 1 &&
          <li>
            <button onClick={() => currentPage > 1 ? handleChangePage(currentPage - 1) : null}>
              {currentPage - 1}
            </button>
          </li>
        }
        <li>
          <span className="font-bold cursor-pointer">{currentPage}</span>
        </li>
        {currentPage !== totalPages &&
          <li>
            <button onClick={() => currentPage < totalPages ? handleChangePage(currentPage + 1) : null}>
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
            onClick={() => currentPage < totalPages ? handleChangePage(currentPage + 1) : null}
            data-testid="button-next-page"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </li>
        <li>
          <button data-testid="button-last-page" onClick={() => handleChangePage(totalPages)}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </li>
      </ul>
    </div>
  )
}