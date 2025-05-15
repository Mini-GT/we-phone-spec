import { NavLink } from "react-router";
import type { MenuNav } from "~/types/globals.type";

type UserMenuNavProps = {
  name: string | undefined
  tab: MenuNav
}

export default function UserMenuNav({
  tab,
  name
}: UserMenuNavProps) {
  return (
    <div className="w-full max-w-4xl mb-8">
      {/* Header */}
      <h1 className="text-white text-3xl font-bold text-center mb-6">Hi, {name || "User"}</h1>
      
      {/* Navigation */}
      <div className="flex justify-center border-b h-9 border-gray-700 pb-1">
        <NavLink 
          to="/user/profile"
          className={`flex items-center ${tab === "profile" ? "text-pink-300 border-b-2 border-b-pink-300" : "text-gray-400" } mx-4 pb-1 cursor-pointer hover:text-pink-300 hover:border-pink-300`}
        >
          <span className="mr-2">👤</span>
          <span>Profile</span>
        </NavLink>
        <NavLink 
          to="/user/like-list"
          className={`flex items-center ${tab === "likelist" ? "text-pink-300 border-b-2 border-b-pink-300" : "text-gray-400" }  mx-4 pb-2 cursor-pointer hover:text-pink-300 hover:border-pink-300`}
        >
          <span className="mr-2">❤️</span>
          <span>Like List</span>
        </NavLink>
        <NavLink 
          to="/user/notification"
          className={`flex items-center ${tab === "notificaton" ? "text-pink-300 border-b-2 border-b-pink-300" : "text-gray-400" }  mx-4 pb-2 cursor-pointer hover:text-pink-300 hover:border-pink-300`}
        >
          <span className="mr-2">🔔</span>
          <span>Notification</span>
        </NavLink>
        <NavLink 
          to="/user/settings"
          className={`flex items-center ${tab === "settings" ? "text-pink-300 border-b-2 border-b-pink-300" : "text-gray-400" }  mx-4 pb-2 cursor-pointer hover:text-pink-300 hover:border-pink-300`}
        >
          <span className="mr-2">⚙️</span>
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  )
}