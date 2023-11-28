import { useCallback, useState } from "react";
import { getCryptoCurrencies } from "@/app/lib/cryptoCurrenciesApi";
import { CryptoCurrency } from "@/app/lib/types/CryptoCurrency";
import { appendParamsSearchParams } from "@/app/lib/utils/location";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  cryptoCurrencies: CryptoCurrency[]
  currentPage: number
  totalPages: number
}

const MIN_WORD_LENGTH = 2

const searchFunction = (cryptoCurrency: CryptoCurrency, value: string) => {
  return cryptoCurrency.symbol.trim().toLocaleLowerCase().includes(value) || cryptoCurrency.name.trim().toLocaleLowerCase().includes(value)
}

const filterCryptoCurrencies = (cryptoCurrencies: CryptoCurrency[], value: string) => cryptoCurrencies.filter((cryptoCurrency) => searchFunction(cryptoCurrency, value))

export default function SearchBar({ cryptoCurrencies, currentPage, totalPages }: SearchBarProps) {
  const [filteredItems, setFilteredItems] = useState<CryptoCurrency[]>([])
  const [fetchingMoreItems, setFetchingMoreItems] = useState<boolean>(false)

  const searchValue = useCallback((array: CryptoCurrency[], value: string) => {
    const sanitizedValue = value?.trim()?.toLocaleLowerCase()
    const foundItems = filterCryptoCurrencies(array, sanitizedValue)
    return foundItems
  }, [])


  const fetchMoreItems = async (value: string) => {
    let i = 0;
    let filteredItems: CryptoCurrency[] = []
    setFetchingMoreItems(true)
    while (i < totalPages && filteredItems.length === 0) {
      if (i !== (currentPage - 1)) {
        const newCryptoCurrenciesPage = await getCryptoCurrencies(i * 100)
        filteredItems = searchValue(newCryptoCurrenciesPage.data, value)
      }
      i++
    }
    setFilteredItems(filteredItems)
    setFetchingMoreItems(false)
  }

  const handleClickItem = (cryptoCurrencyId: string) => {
    location.search = appendParamsSearchParams(location.search, { filter: cryptoCurrencyId })
  }

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= MIN_WORD_LENGTH && !fetchingMoreItems && cryptoCurrencies.length > 0) {
      const filteredItems = searchValue(cryptoCurrencies, value)
      if (filteredItems.length === 0) {
        fetchMoreItems(value)
      } else {
        setFilteredItems(filteredItems)
      }
    } else if (value.length < MIN_WORD_LENGTH) {
      setFilteredItems([])
    }
  }

  return (
    <div>
      <div className="flex flex-col items-end my-2">
        <div className="max-w-xs w-100 relative">
          <div className="p-2 bg-slate-200 rounded">
            <FontAwesomeIcon className="bg-slate-200 text-slate-400 mr-2" icon={faMagnifyingGlass} />
            <input className="outline-none bg-slate-200" type="text" onChange={handleInputChange} placeholder="Search Symbol / Name" />
          </div>
          {filteredItems.length > 0 && (
            <ul className="divide-y z-10 absolute bg-slate-200 w-full">
              {filteredItems.map(item => (
                <li className="cursor-pointer py-2 hover:bg-slate-300 rounded" key={item.id}>
                  <button className="mx-2" role="button" onClick={() => handleClickItem(item.id)}>
                    {`${item.symbol} - ${item.name}`}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {fetchingMoreItems && (
            <p>
              loading ...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
