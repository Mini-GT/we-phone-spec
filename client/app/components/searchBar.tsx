import { useEffect, useState } from "react";
import { Link } from "react-router";
import useDebounce from "~/hooks/useDebounce";
import SmartphoneService from "~/services/smartphone.service";
// import smartphoneService from "~/services/smartphone.service";
import type { Smartphone } from "~/types/globals.type";

  const smartphoneService = new SmartphoneService()

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [data, setData] = useState<Smartphone[]>()

  const debounceQuery = useDebounce(query, 300)

  useEffect(() => {
    const fecthQuery = async () => {
      const res = await smartphoneService.searchSmartphone(debounceQuery.trim())
      // console.log(res.results)
      setData(res.data)
    } 

    fecthQuery()
  }, [debounceQuery]);

  return (
    <div className="w-full mx-auto z-11">
      {/* mobile search bar */}
      <div className="flex items-center mb-1 sm:hidden border lg:border lg:border-gray-400 focus-within:border-gray-900">
        <input
          type="text"
          className="border-none outline-none px-3 py-2 rounded-l-lg"
          placeholder="Search smartphone..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        <button 
          type="submit" 
          className="p-2"
        >
          <img src="/search.svg" alt="search" className="w-5 h-5" />
        </button>
      </div>

      {/* non mobile searchbar */}
      <div className="flex items-center w-full hidden sm:block sm:border sm:border-gray-400 rounded-lg focus-within:border-gray-900">
        <input
          type="text"
          className="border-none outline-none px-3 py-2 rounded-l-lg"
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
      <div className="relative sm:absolute bg-white border rounded-md w-full mt-1 z-50">
        {Array.isArray(data) && data.length === 0 ? (
          <div className="p-4 text-gray-500">No results found</div>
        ) : (
          Array.isArray(data) && data?.map((smartphone) => (
            <Link
              to={`/smartphones/${smartphone.name}-${smartphone._id}`} 
              key={smartphone._id}
              // onClick={() => handleClick(notif.globalNotificationId)}
            >
              <div
                className={`flex items-stretch cursor-pointer gap-2 rounded-md hover:bg-[#1991ff] transition p-2 z-10`}
              >
                <div className="flex items-center justify-center rounded-sm bg-white">
                  <img 
                    src={`/imgs/phones/${smartphone.image || "phone_placeholder.svg"}`} 
                    alt={smartphone.name} 
                    className="object-fit w-12" 
                    loading="lazy"
                  />
                </div>
                
                <div className="flex flex-col justify-center items-start rounded-md flex-1 ">
                  <p className={`text-sm text-black`}>
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