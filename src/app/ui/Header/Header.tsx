'use client'
import { faChevronLeft, faCoins } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePathname } from 'next/navigation'
import Link from "next/link";


export default function Header() {
  const pathname = usePathname()
  return (
    <header className="grid grid-cols-3 container mx-auto  max-w-screen-md my-8 text-blue-400">
      {pathname !== '/' && (
        <Link data-testid="back-button-arrow" href="/" className="col-start-1	col-end-1 justify-center p-4">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
      )}
      <Link href="/" className="col-start-2	col-end-2	flex justify-center items-center text-base sm:text-xl">
        <FontAwesomeIcon  data-testid="coins-button" icon={faCoins} />
        <p className="ml-2 whitespace-nowrap	">Crypto Currencies</p>
      </Link>

    </header>
  )
}