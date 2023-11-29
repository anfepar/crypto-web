import { tableHeaderConfig } from "./tableHeaderConfig";

const FAKE_ITEMS_QUANTITY = 10;

export default function CryptoCurrenciesTableSkeleton() {
  const fakeItems = Array.from(Array(FAKE_ITEMS_QUANTITY).keys())
  return (
    <table className={"table-auto w-full"}>
      <thead>
        <tr className="sticky top-0 bg-slate-50">
          {tableHeaderConfig.map((header) => (
            <th className={`p-4 px-8 ${header.classes}`} key={header.id}>{header.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {fakeItems.map((item) => (
          <tr className={"animate-pulse w-full border-b-2 border-slate-100"} key={item} >
            {tableHeaderConfig.map((header, index) => (
              <td className={`p-4 px-8 ${header.classes}`} key={`${header.id}-${index}`}>
                <div className="h-10 bg-slate-200 rounded" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}