
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


export default function SearchBarSkeleton() {
  return (
    <div className="flex flex-col items-center my-2 sm:items-end">
      <div className="w-60 relative">
        <div className="animate-pulse flex items-center	p-2 bg-slate-100 rounded">
          <FontAwesomeIcon className="bg-slate-100 text-slate-400 mr-2" icon={faMagnifyingGlass} />
          <div className="w-full bg-slate-100" />
        </div>
      </div>
    </div>)
}
