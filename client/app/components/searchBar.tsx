import { useEffect, useState } from "react";
import { Link } from "react-router";
import useDebounce from "~/hooks/useDebounce";
import smartphoneService from "~/services/smartphone.service";
import type { Smartphone } from "~/types/globals.type";

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [data, setData] = useState<Smartphone[]>()

  const debounceQuery = useDebounce(query, 300)

  useEffect(() => {
    const fecthQuery = async () => {
      const res = await smartphoneService.searchSmartphone(debounceQuery)
      // console.log(res.results)
      setData(res.data)
    } 

    fecthQuery()
  }, [debounceQuery]);

  return (
    <div className="relative max-w-md mx-auto">
      <div className="flex items-center border border-gray-400 rounded-lg focus-within:border-gray-900">
          <input
            type="text"
            className="border-none outline-none px-3 py-2 flex-1 rounded-l-lg"
            placeholder="Search smartphone..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          <button type="submit" className="p-2">
            <img src="/search.svg" alt="search" className="w-5 h-5" />
          </button>
        </div>

      {isFocused && query && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md z-10 overflow-y-auto">
          {Array.isArray(data) && data.length === 0 ? (
            <div className="p-4 text-gray-500">No results found</div>
          ) : (
            Array.isArray(data) && data?.map((smartphone) => (
              <Link
                to={`/smartphones/${smartphone.name}-${smartphone._id}`} 
                // onClick={() => handleClick(notif.globalNotificationId)}
              >
                <div
                  className={`flex items-stretch cursor-pointer gap-4 rounded-md hover:bg-[#1991ff] transition p-3 z-10`}
                >
                  <div className="flex items-center justify-center rounded-sm px-2 bg-white w-1/5">
                    <img 
                      src={`/imgs/phones/${smartphone.image || "phone_placeholder.svg"}`} 
                      alt="thumb" 
                      className="object-cover h-12 w-auto" 
                    />
                  </div>
                  
                  <div className="flex flex-col justify-between rounded-md flex-1 ">
                    <p className={`text-sm text-black mb-2`}>
                      {smartphone.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
          {/* <div className="text-center text-pink-600 font-semibold p-2 border-t cursor-pointer hover:bg-pink-100">
            View all results
          </div> */}
        </div>
      )}
    </div>
  )
}