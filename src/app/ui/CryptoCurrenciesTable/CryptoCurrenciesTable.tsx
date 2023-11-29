import { CryptoCurrency } from "../../lib/types/CryptoCurrency";
import { tableHeaderConfig } from "./tableHeaderConfig";

interface CryptoCurrenciesTableProps {
  cryptoCurrencies: CryptoCurrency[],
}

export default function CryptoCurrenciesTable({ cryptoCurrencies }: CryptoCurrenciesTableProps) {
  if (cryptoCurrencies.length === 0) {
    return (
      <p>
        No data to show
      </p>
    )
  } else {
    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="sticky top-0 bg-slate-50">
            {tableHeaderConfig.map((header) => (
              <th className={`p-4 px-8 ${header.classes}`} key={header.id}>{header.value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cryptoCurrencies.map((cryptocurrency: CryptoCurrency) => (
            <tr className="border-b-2 border-slate-100 hover:bg-slate-100" key={cryptocurrency.id}>
              {tableHeaderConfig.map((header) => (
                <td className={`p-4 px-8 ${header.classes}`} key={`${cryptocurrency.id}-${header.id}`}>
                  {header.transformer && header.transformer(cryptocurrency[header.id as keyof CryptoCurrency])}
                  {!header.transformer && cryptocurrency[header.id as keyof CryptoCurrency]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

}