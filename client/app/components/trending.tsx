import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react";
import { NavLink } from "react-router";
import { useAddViewToSmartphone } from "~/hooks/useAddViewToSmartphone";
import type { Smartphone } from "~/types/globals.type";
import { formattNumber } from "~/utils/formatNumber";

type TrendingProps = {
  smartphones: Smartphone[]
}

export default function Trending({
  smartphones
}: TrendingProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const addView = useAddViewToSmartphone()
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 200; // Adjust scroll distance
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div 
      className="my-10 w-full relative py-4 text-white"
    >
      <h2 className="text-pink-400 text-2xl font-bold font-bold">Trending</h2>
      <div className="relative flex justify-between">
        <div
          ref={carouselRef}
        >
          <ul
            className="flex gap-2 overflow-x-hidden no-scrollbar scroll-smooth"
          >
            {smartphones.map((phone, index) => (
              <li key={phone._id} className="py-4 pr-4 overflow-hidden">
                <NavLink
                  to={`/smartphones/${phone.name}-${phone._id}`}
                  onClick={() => addView(phone.name, phone._id)}
                >
                  <div className="flex">
                    <div className="items-end text-black">
                      <div className="flex flex-col w-fit">
                        <div className="flex items-start">
                          <span className="mb-2 h-40 text-nowrap vertical_text text-sm text-black mt-2 text-start overflow-hidden truncate">{phone.name}</span>
                        </div> 
                        <div className="h-6">
                          {formattNumber(index + 1)}
                          </div> 
                      </div>
                    </div>
                    <div>
                      <img               
                        src={`/imgs/phones/${phone.image || "phone_placeholder.svg"}`}
                        alt={phone.name}
                        className="w-44"
                      />
                    </div>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col my-6 ml-2 gap-2">
          <button
            className="relative cursor-pointer bg-gray-800 h-full p-2 rounded-lg hover:bg-red-300"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            className="relative cursor-pointer bg-gray-800 h-full p-2 rounded-lg hover:bg-red-300"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}