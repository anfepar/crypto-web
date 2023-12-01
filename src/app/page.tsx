import { getCryptoCurrenciesByPage, getCryptoCurrenciesById } from "./lib/cryptoCurrenciesApi"
import { CryptoCurrency } from "./lib/types/CryptoCurrency"
import { getTotalPages } from "./lib/utils/pagination"
import CryptoCurrenciesTable from "./ui/CryptoCurrenciesTable/CryptoCurrenciesTable"
import Pagination from "./ui/Pagination/Pagination"
import SearchBar from "./ui/SearchBar/SearchBar"

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: PageProps) {
  const pageParam = searchParams.page
  const filterParam = searchParams.filter || null
  const currentPage = pageParam ? parseInt(pageParam as string) : 1
  const data = await getCryptoCurrenciesByPage(currentPage)
  let cryptoCurrencies = data?.data || []

  const getFilteredCryptoCurrency = async (id: string) => {
    try {
      const cryptoCurrency = await getCryptoCurrenciesById(id)
      cryptoCurrencies = cryptoCurrency
    } catch (e) {
      console.error('error fetching crypto currency by id', e)
    }
  }

  if (filterParam) {
    const filteredItems = cryptoCurrencies.filter((cryptoCurrency: CryptoCurrency) => cryptoCurrency.id === filterParam)
    if (filteredItems.length === 0) {
      getFilteredCryptoCurrency(filterParam as string)
    } else if (JSON.stringify(filteredItems.map((item: CryptoCurrency) => item.id)) !== JSON.stringify(cryptoCurrencies.map((item: CryptoCurrency) => item.id))) {
      cryptoCurrencies = filteredItems
    }
  }

  return (
    <section className="container mx-auto max-w-screen-md">
      <SearchBar
        cryptoCurrencies={cryptoCurrencies}
        currentPage={currentPage}
        totalPages={getTotalPages(data?.info.coins_num as number)}
        filterIsActive={filterParam !== null}
      />
      <CryptoCurrenciesTable cryptoCurrencies={cryptoCurrencies} />
      <Pagination totalCoins={data?.info.coins_num as number} currentPage={currentPage} />
    </section>
  )
}
