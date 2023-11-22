import { CryptoCurrency } from "../../lib/types/Cryptocurrency";
import { tableHeaderConfig } from "./tableHeaderConfig";

interface CryptoCurrenciesTableProps {
  cryptoCurrencies: CryptoCurrency[],
}

export default function CryptoCurrenciesTable({ cryptoCurrencies }: CryptoCurrenciesTableProps) {
  return (
    <table>
      <thead>
        <tr>
          {tableHeaderConfig.map((header) => (
            <th key={header.id}>{header.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cryptoCurrencies.map((cryptocurrency: CryptoCurrency) => (
          <tr key={cryptocurrency.id}>
            {tableHeaderConfig.map((header) => (
              <td key={`${cryptocurrency.id}-${header.id}`}>
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