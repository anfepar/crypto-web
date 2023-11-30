'use client'
import { faChevronLeft, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from 'next/navigation'


export default function Header() {
  const pathname = usePathname()
  return (
    <header className="grid grid-cols-3 container mx-auto  max-w-screen-md my-8 text-slate-700">
      {pathname !== '/' && (
        <Link href="/" className="col-start-1	col-end-1 justify-center p-4">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
      )}
      <Link href="/" className="col-start-2	col-end-2	flex justify-center items-center text-base sm:text-xl">
        <FontAwesomeIcon icon={faCoins} />
        <p className="ml-2 whitespace-nowrap	">Crypto Currencies</p>
      </Link>

    </header>
  )
}