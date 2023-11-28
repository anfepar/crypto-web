import { useCallback, useEffect, useState } from "react";
import { getCryptoCurrencies } from "@/app/lib/cryptoCurrenciesApi";
import { CryptoCurrency } from "@/app/lib/types/CryptoCurrency";
import { appendParamsSearchParams } from "@/app/lib/utils/location";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  cryptoCurrencies: CryptoCurrency[]
  currentPage: number
  totalPages: number
  filterIsActive: boolean
}

const MIN_WORD_LENGTH = 2

const searchFunction = (cryptoCurrency: CryptoCurrency, value: string) => {
  return cryptoCurrency.symbol.trim().toLocaleLowerCase().includes(value) || cryptoCurrency.name.trim().toLocaleLowerCase().includes(value)
}

const filterCryptoCurrencies = (cryptoCurrencies: CryptoCurrency[], value: string) => cryptoCurrencies.filter((cryptoCurrency) => searchFunction(cryptoCurrency, value))

export default function SearchBar({ cryptoCurrencies, currentPage, totalPages, filterIsActive }: SearchBarProps) {
  const [filteredItems, setFilteredItems] = useState<CryptoCurrency[]>([])
  const [fetchingMoreItems, setFetchingMoreItems] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState('');
  const router = useRouter()

  useEffect(() => {
    if (cryptoCurrencies.length === 1 && filterIsActive) {
      const selectedCryptoCurrency = cryptoCurrencies[0]
      setInputValue(`${selectedCryptoCurrency.symbol} - ${selectedCryptoCurrency.name}`)
    }
  }, [cryptoCurrencies, filterIsActive])

  const searchValue = useCallback((array: CryptoCurrency[], value: string) => {
    const sanitizedValue = value?.trim()?.toLocaleLowerCase()
    if (array.length > 0) {
      const foundItems = filterCryptoCurrencies(array, sanitizedValue)
      return foundItems
    } else {
      return []
    }
  }, [])


  const fetchMoreItems = async (value: string) => {
    let page = 0;
    let filteredItems: CryptoCurrency[] = []
    setFetchingMoreItems(true)
    while (page < totalPages && filteredItems.length === 0) {
      if (page !== (currentPage - 1)) {
        const newCryptoCurrenciesPage = await getCryptoCurrencies(page * 100)
        filteredItems = searchValue(newCryptoCurrenciesPage.data, value)
      }
      page++
    }
    setFilteredItems(filteredItems)
    setFetchingMoreItems(false)
  }

  const handleClickItem = (cryptoCurrencyId: string) => {
    const redirectUrl = appendParamsSearchParams('', { filter: cryptoCurrencyId })
    const selectedCryptoCurrency = cryptoCurrencies.find(cryptoCurrency => cryptoCurrency.id === cryptoCurrencyId)
    setFilteredItems([])
    if (selectedCryptoCurrency?.id) {
      setInputValue(`${selectedCryptoCurrency.symbol} - ${selectedCryptoCurrency.name}`)
    }
    router.push(`/?${redirectUrl}`)
  }

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value)
    if (value.length >= MIN_WORD_LENGTH && !fetchingMoreItems && cryptoCurrencies.length > 0) {
      const filteredItems = searchValue(cryptoCurrencies, value)
      if (filteredItems.length === 0) {
        fetchMoreItems(value)
      } else {
        setFilteredItems(filteredItems)
      }
    } else if (value.length < MIN_WORD_LENGTH && filteredItems.length > 0) {
      setFilteredItems([])
    }
  }

  const handleClearFilter = () => {
    setInputValue('')
    setFilteredItems([])
    router.push('/')
  }

  return (
    <div>
      <div className="flex flex-col items-end my-2">
        <div className="w-60 relative">
          <div className="flex items-center	p-2 bg-slate-200 rounded">
            <FontAwesomeIcon className="bg-slate-200 text-slate-400 mr-2" icon={faMagnifyingGlass} />
            <input
              className="outline-none w-full bg-slate-200"
              type="text" onChange={handleInputChange}
              placeholder="Search by Symbol / Name"
              value={inputValue}
            />
            {filterIsActive && (
              <button onClick={handleClearFilter}>
                <FontAwesomeIcon className="text-slate-400" icon={faCircleXmark} />
              </button>
            )}
          </div>
          {filteredItems.length > 0 && (
            <ul className="divide-y z-10 absolute bg-slate-200 w-full">
              {filteredItems.map(item => (
                <li className="cursor-pointer hover:bg-slate-300 rounded" key={item.id}>
                  <button className="p-2 w-full text-left" role="button" onClick={() => handleClickItem(item.id)}>
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
