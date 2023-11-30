import CryptoCurrenciesTableSkeleton from "./ui/CryptoCurrenciesTable/CryptoCurrenciesTableSkeleton";
import SearchBarSkeleton from "./ui/SearchBar/SearchBarSkeleton";

export default function Loading() {
  return (
    <section className="container mx-auto max-w-screen-md">
      <SearchBarSkeleton />
      <CryptoCurrenciesTableSkeleton />
    </section>
  )
}