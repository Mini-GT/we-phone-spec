import { NavLink } from "react-router";
import { useAddViewToSmartphone } from "~/hooks/useAddViewToSmartphone";
import type { Smartphone } from "~/types/globals.type";

type TopTenSectionProps = {
  smartphones: Smartphone[]
}

export default function TopTenLayout({ smartphones }: TopTenSectionProps) {
  const addView = useAddViewToSmartphone()

  return (
    <div className="max-h-full overflow-y-auto">
      {Array.isArray(smartphones) && smartphones?.length > 0 ?smartphones.map((smartphone, i) => (
        <div className="relative rounded-md" key={smartphone._id}>
          <NavLink
            to={`/smartphones/${smartphone.name}-${smartphone._id}`} 
            onClick={() => addView(smartphone.name, smartphone._id)}
          >
            <div
              className={`flex items-stretch cursor-pointer gap-4 rounded-md hover:bg-blue-50 transition p-2 z-10`}
            >
              <div className="flex items-center justify-center rounded-sm p-2 bg-white">
                <img 
                  src={`/imgs/phones/${smartphone.image || "phone_placeholder.svg"}`} 
                  alt="thumb" 
                  className="object-cover h-22 w-auto" 
                  loading="lazy"
                />
              </div>
              
              <div className="flex flex-col space-y-1 justify-between flex-1 py-2">
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
          </NavLink>
        </div>
        )) : null}
      {/* <div className="text-center py-4">No Notifications</div> */}
    </div>
  )
}