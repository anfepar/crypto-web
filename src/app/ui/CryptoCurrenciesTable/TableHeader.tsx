import { tableHeaderConfig } from "./tableHeaderConfig";

export default function TableHeader() {
  return (
    <thead>
      <tr className="sticky top-0 bg-slate-50">
        {tableHeaderConfig.map((header) => (
          <th className={`whitespace-nowrap py-1 px-4 text-xs ${header.classes} sm:py-4 sm:px-8 sm:text-base`} key={header.id}>{header.value}</th>
        ))}
      </tr>
    </thead>
  )
}