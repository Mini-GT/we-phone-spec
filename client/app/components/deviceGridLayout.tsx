import { Link } from "react-router";
import type { DeviceGridLayoutProps } from "~/types/globals.type";
import { formatNumberToCompact } from "~/utils/formatNumber";

export default function DeviceGridLayout({
  items,
  title
}: DeviceGridLayoutProps) {
  return (
    <div className='flex flex-col gap-4 my-4'>
      <h1 className="text-xl font-bold my-4">{title}</h1>
      <ul className="grid grid-cols-[230px_230px_230px_230px_230px] gap-4 rounded">
        {items.map(item => (
          <div key={item._id} data-id={item._id} className="flex flex-col justify-between items-start max-w-[15rem] cursor-pointer overflow-hidden">
            <Link to={`/smartphones/${item.name}-${item._id}`} >
              <div className="relative">
                <img src={`/${item.image}`} alt={item.name} className="min-w-3 max-h-[250px] m-2" />
                <div className="flex px-2 bg-black rounded-sm gap-1 cursor-default absolute bottom-0 m-5">
                  <img src="/eyeVector.svg" alt="views" className="w-4" />
                  <div className='text-sm text-white'>
                    {formatNumberToCompact(item.views)}
                  </div>
                </div>
              </div>
            </Link>
            <div className="mx-2">
              <button className="hover:text-pink-600 cursor-pointer">
                <div className="truncate max-w-[13rem]">
                  {item.name}
                </div>
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}