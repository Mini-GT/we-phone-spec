import { Link } from "react-router";
import type { Smartphone } from "~/types/globals.type";

type TopTenSectionProps = {
  smartphones: Smartphone[]
}

export default function TopTenLayout({ smartphones }: TopTenSectionProps) {
  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {Array.isArray(smartphones) &&smartphones?.length > 0 ?smartphones.map((smartphone, i) => (
        <div className="relative border rounded-md" key={smartphone._id}>
          <Link
            to={`/smartphones/${smartphone.name}-${smartphone._id}`} 
          >
            <div
              className={`flex items-stretch cursor-pointer gap-4 rounded-md hover:bg-blue-50 transition p-2 z-10`}
            >
              <div className="flex items-center justify-center rounded-sm p-2 bg-white">
                <img 
                  src={`/imgs/phones/${smartphone.image || "phone_placeholder.svg"}`} 
                  alt="thumb" 
                  className="object-cover h-22 w-auto" 
                />
              </div>
              
              <div className="flex flex-col space-y-1 justify-between flex-1 ">
                <p className={`text-sm font-semibold text-black mb-2`}>
                  {smartphone.name}
                </p>
                <p className="line-clamp-2 text-xs text-gray-500 mt-auto">
                  Released: {smartphone.launch.announced}
                </p>
                <p className="text-xs text-gray-500 mt-auto">
                  {smartphone.specs.battery.type}
                </p>
                <p className="text-xs text-gray-500 mt-auto">
                  {smartphone.brand}
                </p>
              </div>
            </div>
          </Link>
        </div>
        )) : null}
      {/* <div className="text-center py-4">No Notifications</div> */}
    </div>
  )
}