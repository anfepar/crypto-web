
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


export default function SearchBarSkeleton() {
  return (
    <div className="flex flex-col items-end my-2">
      <div className="w-60 relative">
        <div className="animate-pulseflex items-center	p-2 bg-slate-200 rounded">
          <FontAwesomeIcon className="bg-slate-200 text-slate-400 mr-2" icon={faMagnifyingGlass} />
          <div className="w-full bg-slate-200" />
        </div>
      </div>
    </div>)
}
