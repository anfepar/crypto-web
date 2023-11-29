import TableHeader from "./TableHeader";
import { tableHeaderConfig } from "./tableHeaderConfig";

const FAKE_ITEMS_QUANTITY = 10;

export default function CryptoCurrenciesTableSkeleton() {
  const fakeItems = Array.from(Array(FAKE_ITEMS_QUANTITY).keys())
  return (
    <table className={"table-auto w-full"}>
      <TableHeader />
      <tbody>
        {fakeItems.map((item) => (
          <tr className={"animate-pulse w-full border-b-2 border-slate-100"} key={item} >
            {tableHeaderConfig.map((header, index) => (
              <td className={"py-1 px-4 sm:py-4 sm:px-8"} key={`${header.id}-${index}`}>
                <div className="h-10 bg-slate-200 rounded" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}