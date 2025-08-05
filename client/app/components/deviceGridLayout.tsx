import { useState } from "react";
import { Link } from "react-router";
import type { DeviceGridLayoutProps, Smartphone } from "~/types/globals.type";
import { formatNumberToCompact } from "~/utils/formatNumber";
import viewSmartphone from "~/utils/viewSmartphone";

export default function DeviceGridLayout({
  items,
  title
}: DeviceGridLayoutProps) {
  return (
    <div className='flex flex-col gap-2'>
      <h1 className="text-xl font-bold my-4">{title}</h1>
      <ul className="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-4 gap-2 rounded">
        {items.map(item => (
          <li key={item._id} data-id={item._id} className="relative bg-white border rounded-sm w-full cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-102 overflow-hidden">
            <div className="relative flex flex-col justify-between h-full overflow-hidden">
              <Link 
                to={`/smartphones/${item.name}-${item._id}`} 
                className="p-2"
                onClick={() => viewSmartphone(item._id)}
              >
                <div className="relative">
                  <img src={`/imgs/phones/${item.image || "phone_placeholder.svg"}`} alt={item.name} className="" />
                </div>
              </Link>
              <button className="pl-1 text-start hover:text-pink-600 cursor-pointer w-full">
                <div className="truncate w-full px-2">
                  {item.name}
                </div>
              </button>
              <div className="flex px-2 bg-black w-1/6 rounded-sm gap-1 cursor-default absolute bottom-6 m-5">
                <img src="/eyeVector.svg" alt="views" className="w-full" />
                <div className='bg-black flex text-sm text-white pr-2 rounded-r-sm'>
                  {formatNumberToCompact(item.views)}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}