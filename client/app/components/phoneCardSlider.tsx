import { CalendarCheck2, CalendarClock, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import type { Smartphone } from "~/types/globals.type";

type PhoneCardSliderProps = {
  smartphones: Smartphone[]
}

export default function PhoneCardSlider({ smartphones }: PhoneCardSliderProps) {
  const [counter, setCounter] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const intervalRef = useRef<number | null>(null);

  // Handle next slide
  const slideNext = () => {
    setCounter((prevCounter) => (prevCounter >= smartphones.length - 1 ? 0 : prevCounter + 1));
  };

  // Handle previous slide
  const slidePrev = () => {
    setCounter((prevCounter) => (prevCounter === 0 ? smartphones.length - 1 : prevCounter - 1));
  };

  // Handle dot indicator click
  const switchImage = (imageId: number) => {
    setCounter(imageId);
  };

  // Setup auto sliding
  useEffect(() => {
    if (isAutoSliding && smartphones.length > 1) {
      intervalRef.current = window.setInterval(() => {
        slideNext();
      }, 4000); // 4 seconds for better UX
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoSliding, smartphones.length]);

  // Stop auto sliding on mouse over
  const handleMouseOver = () => {
    setIsAutoSliding(false);
  };

  // Resume auto sliding on mouse out
  const handleMouseOut = () => {
    setIsAutoSliding(true);
  };

  if (!smartphones.length) {
    return <div className="w-full h-full flex items-center justify-center text-gray-500">No smartphones available</div>;
  }

  return (
    <div className="relative w-full ">
      <div 
        className="relative w-full overflow-hidden rounded-2xl"
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
      >
        {/* Slider Container */}
        <div className="relative w-full h-50 sm:h-75 md:h-85 lg:h-100 xl:h-120">
          {smartphones.map((phone, index) => (
            <div 
              key={phone._id}
              className={`absolute inset-0 h-full transition-all duration-700 ease-in-out ${
                index === counter 
                  ? "translate-x-0 opacity-100" 
                  : index < counter 
                    ? "-translate-x-full opacity-0" 
                    : "translate-x-full opacity-0"
              }`}
            >
            {/* Card Content */}
            <div className="grid grid-cols-2 sm:h-70 md:h-80 lg:h-95 xl:h-115">
              {/* Left Content Section */}
              <div className="flex flex-col justify-between sm:p-0">
                {/* Header */}
                <div className="mt-4">
                  <div className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 text-sm xl:text-lg font-medium rounded-full">
                    #{String(index + 1).padStart(2, '0')} Spotlight
                  </div>
                  
                  <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight">
                    {phone.name}
                  </h1>
                </div>

                {/* Description - Only shown on larger screens */}
                {phone.description && (
                  <p className="hidden sm:block md:line-clamp-3 lg:line-clamp-4 xl:line-clamp-none xl:text-xl text-gray-600 text-base">
                    {phone.description}
                  </p>
                )}

                {/* Launch Information */}
                <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CalendarClock size={20} className="lg:hidden text-gray-400 flex-shrink-0" />
                    <CalendarClock size={30} className="lg:block hidden text-gray-400 flex-shrink-0" />
                    <div className="flex flex-col text-xs sm:text-sm">
                      <span className="font-medium">Announced:</span>
                      <span>{phone.launch.announced}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarCheck2 size={20} className="lg:hidden text-gray-400 flex-shrink-0" />
                    <CalendarCheck2 size={30} className="lg:block hidden text-gray-400 flex-shrink-0" />
                    <div className="flex flex-col text-xs sm:text-sm">
                      <span className="font-medium">Released:</span>
                      <span>{phone.launch.released}</span>
                    </div>
                  </div>
                </div>
                {/* Call to Action */}
                <div className="relative hidden sm:block w-full col-span-2 pt-2">
                  <Link
                    to={`/smartphones/${phone.name}-${phone._id}`}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform "
                  >
                    <div className="flex items-center transition-all px-6 py-3 duration-200 hover:scale-105">
                      More Info
                      <ArrowRight size={18} />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Right Image Section */}
              <div className="relative flex items-end justify-end">
                {/* Phone Image */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="relative group">
                    <img 
                      src={`/imgs/phones/${phone.image || "phone_placeholder.svg"}`} 
                      alt={phone.name}
                      className="w-48 h-48 sm:w-64 sm:h-64 md:w-70 md:h-70 lg:w-90 lg:h-90 xl:w-110 xl:h-110 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    
                    {/* Image Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-200/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          ))}
          
        </div>
      </div>
      {/* Navigation Dots */}
      {smartphones.length > 1 && (
        <div className="relative w-full flex mt-2 justify-center gap-2 z-10">
          {smartphones.map((_, index) => (
            <button
              key={index}
              onClick={() => switchImage(index)}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                counter === index 
                  ? "bg-indigo-600 border-indigo-600 shadow-lg" 
                  : "bg-white/70 border-gray-300 hover:border-indigo-400 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}