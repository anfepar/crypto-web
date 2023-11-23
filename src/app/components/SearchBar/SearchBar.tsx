import { useCallback, useState } from "react";
import { getCryptoCurrencies } from "@/app/lib/cryptoCurrenciesApi";
import { CryptoCurrency } from "@/app/lib/types/CryptoCurrency";

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
      <input type="text" onChange={handleInputChange} placeholder="Search Symbol / Name" />
      <div>
        {filteredItems.length > 0 && (
          <ul>
            {filteredItems.map(item => (
              <li key={item.id}>
                {`${item.symbol} - ${item.name}`}
              </li>
            ))}
          </ul>
        )}
        {!fetchingMoreItems && filteredItems.length === 0 && (
          <p>
            No match found
          </p>
        )}
        {fetchingMoreItems && (
          <p>
            loading ...
          </p>
        )}
      </div>
    </div>
  )
}
