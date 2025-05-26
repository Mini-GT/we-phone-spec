import { phones } from "mockData";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

export default function PhoneCardSlider() {
  const [counter, setCounter] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const intervalRef = useRef<number | null>(null);

  // Handle next slide
  const slideNext = () => {
    setCounter((prevCounter) => (prevCounter >= phones.length - 1 ? 0 : prevCounter + 1));
  };

  // Handle previous slide
  const slidePrev = () => {
    setCounter((prevCounter) => (prevCounter === 0 ? phones.length - 1 : prevCounter - 1));
  };

  // Handle dot indicator click
  const switchImage = (imageId: number) => {
    setCounter(imageId);
  };

  // Setup auto sliding
  useEffect(() => {
    if (isAutoSliding) {
      intervalRef.current = window.setInterval(() => {
        slideNext();
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoSliding]);

  // Stop auto sliding on mouse over
  const handleMouseOver = () => {
    setIsAutoSliding(false);
  };

  // Resume auto sliding on mouse out
  const handleMouseOut = () => {
    setIsAutoSliding(true);
  };

  return (
    <div className="mt-6 bg-white">
      <div 
        className="relative w-full overflow-hidden" 
        style={{ height: "500px" }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className="w-full h-full relative">
          {phones.map((phone, index) => (
            <div 
              key={phone.id}
              className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
                index === counter ? "translate-x-0" : index < counter ? "-translate-x-full" : "translate-x-full"
              }`}
            >
              <div className="phonecard flex flex-wrap items-end h-full">
                <div className="w-full md:w-1/2">
                  <div className="space-y-6 sm:max-w-md lg:max-w-10/11">
                    <h1 className="text-xl">#{index+1} Spotlight</h1>
                    <h1 className="font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                      <span className="block xl:inline">{phone.name}</span>
                    </h1>
                    <div className="flex w-full space-x-10 text-gray-500 text-nowrap">
                      <div className="flex justify-center items-center">
                        <img 
                          className="w-7 mr-1"
                          src="megaphone.svg" 
                          alt="Date Announced" 
                        />
                        <h1>{phone.launch.announced}</h1>
                      </div>
                      <div className="flex justify-center items-center">
                        <img 
                          className="w-5 mr-1"
                          src="calendarRelease.svg" 
                          alt="Date Released" 
                        />
                        <h1>{phone.launch.released}</h1>
                      </div>
                    </div>
                    <p className="text-base text-gray-500 text-xl">
                      {phone.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                      <Link
                        to="/smartphones"
                        className="flex items-center justify-center px-6 py-3 text-lg text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                      >
                        More Info
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 ml-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bg-white flex justify-end md:w-1/2">
                  <div className="overflow-hidden rounded-md">
                    <img src={phone.image} alt={phone.name} className="w-[400px]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-cenrter relative top-5 space-x-2">
        {phones.map((_, index) => (
          <button
            key={index}
            onClick={() => switchImage(index)}
            className={`w-3 h-3 rounded-full border cursor-pointer border-gray-400 ${
              counter === index ? "bg-gray-600" : "bg-transparent"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};