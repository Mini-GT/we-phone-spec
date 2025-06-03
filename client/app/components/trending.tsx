import { ChevronLeft, ChevronRight } from "lucide-react"
import { phones } from "mockData";
import { useRef } from "react";
import { formattNumber } from "~/utils/formatNumber";


export default function Trending() {
  const carouselRef = useRef<HTMLDivElement>(null);

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
      <div className="relative flex">
        <div
          ref={carouselRef}
          className="flex gap-2 overflow-x-hidden no-scrollbar scroll-smooth"
        >
          {phones.map((phone, index) => (
            <div key={phone.id} className="py-4 pr-4">
              <div className="flex items-end max-w-[20rem]">
                <div className="text-black">
                  <span className="vertical_text text-sm text-black mt-2 text-center">{phone.name}</span>
                  <div>{formattNumber(index + 1)}</div>
                </div>
                <img
                  src={`/${phone.image}`}
                  alt={phone.name}
                  className="min-w-34 m-2"
                />
              </div>
            </div>
          ))}
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