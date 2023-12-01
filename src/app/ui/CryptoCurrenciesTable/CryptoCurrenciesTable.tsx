import { CryptoCurrency } from "../../lib/types/CryptoCurrency";
import { tableHeaderConfig } from "./tableHeaderConfig";
import TableHeader from "./TableHeader";
import Link from "next/link";

interface CryptoCurrenciesTableProps {
  cryptoCurrencies: CryptoCurrency[],
}

export default function CryptoCurrenciesTable({ cryptoCurrencies }: CryptoCurrenciesTableProps) {
  return (
    <table className="table-auto w-full">
      <TableHeader />
      <tbody>
        {cryptoCurrencies.map((cryptocurrency: CryptoCurrency) => (
          <tr className="border-b-2 border-slate-100 hover:bg-slate-100" key={cryptocurrency.id}>
            <Link className="contents	w-full" href={`currency/${cryptocurrency.id}`} >
              {tableHeaderConfig.map((header) => (
                <td className={`py-1 px-4 text-s ${header.classes} sm:py-4 sm:px-8 sm:text-base lg:text-lg`} key={`${cryptocurrency.id}-${header.id}`} >
                  {header.transformer && header.transformer(cryptocurrency[header.id as keyof CryptoCurrency])}
                  {!header.transformer && cryptocurrency[header.id as keyof CryptoCurrency]}
                  {header.subItems?.map(subItem => (
                    <p className={`${subItem.classes}`} key={subItem.id}>
                      {cryptocurrency[subItem.id as keyof CryptoCurrency]}
                    </p>
                  ))}
                </td>
              ))}
            </Link>
          </tr>
        ))}
      </tbody>
    </table>
  )
}