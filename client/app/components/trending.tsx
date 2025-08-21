import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAddViewToSmartphone } from '~/hooks/useAddViewToSmartphone';
import type { Smartphone } from '~/types/globals.type';
import { NavLink } from 'react-router';
// import { NavLink } from 'react-router-dom';

type TrendingProps = {
  smartphones: Smartphone[]
}

export default function Trending({ smartphones }: TrendingProps) {
  const carouselRef = useRef<HTMLUListElement>(null);
  const addView = useAddViewToSmartphone();

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 200; 
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const formattNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="relative text-white">
      <h2 className="text-pink-400 text-2xl font-bold mb-4">Trending</h2>
      
      <div className="relative flex items-center gap-2">
        <div className="overflow-hidden">
          <ul
            ref={carouselRef}
            className="flex items-end py-2 gap-4 overflow-x-auto no-scrollbar scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {smartphones.map((phone, index) => (
              <li 
                key={phone._id} 
                className="flex shrink-0 relative group cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <span className="vertical_text hidden sm:block text-xs sm:text-sm whitespace-nowrap truncate text-black font-medium">
                  {phone.name}
                </span>
                <NavLink
                  to={`/smartphones/${phone.name}-${phone._id}`}
                  onClick={() => addView(phone.name, phone._id)}
                  className="w-full h-full"
                >
                  <div className="flex relative items-end w-full h-full rounded-lg">
                    <span className="absolute flex justify-center items-center w-8 h-8 left-0 bottom-0 rounded-full bg-white m-2 text-sm font-bold text-black drop-shadow-lg">
                      {formattNumber(index + 1)}
                    </span>
                    <img              
                      src={`/imgs/phones/${phone.image || "phone_placeholder.svg"}`}
                      alt={phone.name}
                      className="w-20 sm:w-35 md:w-40 h-full object-fit"
                      loading="lazy"
                    />
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex flex-col gap-2 z-20">
          <button
            className="bg-gray-800/90 h-full rounded-lg py-2 sm:py-5 hover:bg-pink-500/80 cursor-pointer"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            className="bg-gray-800/90 rounded-lg py-2 sm:py-5 hover:bg-pink-500/80 cursor-pointer"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
