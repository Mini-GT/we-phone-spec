import { ThumbsUp } from "lucide-react";
import { NavLink } from "react-router";
import { useAddViewToSmartphone } from "~/hooks/useAddViewToSmartphone";
import type { DeviceGridLayoutProps } from "~/types/globals.type";
import { formatNumberToCompact } from "~/utils/formatNumber";

export default function DeviceGridLayout({
  items,
  title
}: DeviceGridLayoutProps) {
  const addView = useAddViewToSmartphone()

  return (
    <div className='relative flex flex-col gap-2'>
      <h1 className="text-xl font-bold my-4">{title}</h1>
      <ul className="grid grid-cols-2 xl:grid-cols-6 sm:grid-cols-4 gap-2 rounded">
        {items?.map(item => (
          <li key={item._id} data-id={item._id} className="relative bg-white border rounded-sm w-full cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-102 overflow-hidden">
            <div className="relative flex flex-col items-start justify-between h-full w-full overflow-hidden">
              <NavLink 
                to={`/smartphones/${item.name}-${item._id}`} 
                className="relative p-2 w-full h-full"
                onClick={() => addView(item.name, item._id)}
              >
                <div className="relative w-full h-full">
                  <img 
                    className="object-fill w-full h-full"
                    src={`/imgs/phones/${item.image || "phone_placeholder.svg"}`} 
                    alt={item.name} 
                    loading="lazy" 
                  />
                </div>
                
              </NavLink>
              <button className="pl-1 text-start hover:text-pink-600 cursor-pointer w-full">
                <div className="truncate w-full px-2">
                  {item.name}
                </div>
              </button>
            </div>
            <div className="absolute flex gap-1 items-center justify-between bottom-9 left-2">
              <div className="flex w-full h-5 px-2 items-center justify-between gap-2 bg-black rounded-sm cursor-default">
                <img 
                  src="/eyeVector.svg" 
                  alt="views" 
                  className="min-w-[17px] h-full" 
                  loading="lazy" 
                />
                <div className='flex items-center justify-center bg-black text-center w-full h-5 flex text-xs text-white'>
                  {formatNumberToCompact(item.views)}
                </div>
              </div>
              <div className="flex w-full h-5 px-2 items-center gap-2 justify-between bg-black rounded-sm cursor-default">
                {/* <img src="/eyeVector.svg" alt="views" className="w-full" loading="lazy" /> */}
                <ThumbsUp className="min-w-[17px]" color="white" />
                <div className='flex items-center justify-center bg-black text-center w-full h-5 flex text-xs text-white'>
                  {formatNumberToCompact(item.likes)}
                </div>
              </div>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}