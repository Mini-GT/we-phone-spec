import { NavLink } from "react-router";
import type { Smartphone } from "~/types/globals.type";

type SectionProps = {
  title: string
  smartphones: Smartphone[]
  viewMore: "/most-viewed" | "/most-liked" | "/new-added"
}

export default function SmartphonesFeaturedSection({ title, smartphones, viewMore}: SectionProps) {
  return (
    <div>
      <h2 className="text-pink-300 font-bold text-3xl mb-3 px-4">{title}</h2>
      <ul className="">
        {smartphones.map((smartphone) => (
          <li key={smartphone._id} className="flex border-b-1 cursor-pointer hover:bg-blue-50">
            <NavLink
              to={`/smartphones/${smartphone.name}-${smartphone._id}`} 
              className="flex items-stretch gap-4 px-3 py-5 rounded-md hover:bg-blue-50 transition z-10"
            >
              <div
                className={`flex items-stretch cursor-pointer gap-4 rounded-md transition z-10`}
              >
                  <div className="flex flex-shrink-0 px-2 items-center justify-center rounded-sm bg-white">
                    <img 
                      src={`/imgs/phones/${smartphone.image || "phone_placeholder.svg"}`} 
                      alt="thumb" 
                      className="object-cover h-25 w-auto" 
                    />
                  </div>
                  
                  {/* <div className="flex flex-col justify-between rounded-md flex-1 ">
                    <p className={`text-sm ${notif.isRead ? "text-[#CBD5E1] font-normal" : "font-semibold text-[#FFFFFF]"} mb-2`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-auto">
                      {convertToTimeAgo(notif.createdAt) || ""}
                    </p>
                  </div> */}
              </div>
              <div className="flex flex-col flex-shrink-3 items-stretch text-sm space-y-1 py-2 h-full w-full">
                <p className="text-black h-full cursor-pointer">
                  {smartphone.name}
                </p>
                <p className="text-black h-full cursor-pointer">
                  {smartphone.brand}
                </p>
                <p className="line-clamp-1 text-black h-full cursor-pointer">
                  Announced: {smartphone.launch.announced || "No description available"}
                </p>
                <p className="line-clamp-1 text-black h-full cursor-pointer">
                  Released: {smartphone.launch.released || "No description available"}
                </p>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
      <NavLink 
        to={viewMore}
        className="mt-3 text-xl text-black px-2 hover:underline cursor-pointer"
      >
        View more →
      </NavLink>
    </div>
  )
}