import { useState } from "react";
import type { UserMenuProps } from "~/types/globals.type";
import authService from "~/services/auth.service"
import { useNavigate } from "react-router";

export default function UserMenu({
  userId,
  name,
  email
}: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleLogout = () => {
    authService.logout()
    navigate(0)
  }

  return (
    <div className="relative inline-block text-left">
      {/* Avatar */}
      <div>
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-full bg-gray-700 hover:opacity-80 focus:outline-none"
        >
          <img
            src="imgs/profile/gojo.png"
            alt="User Avatar"
            className="w-full h-full rounded-full object-cover"
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg p-4 z-50">
          <div className="mb-4">
            <p className="text-white font-bold">{name}</p>
            <p className="text-gray-400 text-sm">{email}</p>
          </div>

          <div className="flex flex-col gap-2">
            <button className="text-left px-4 py-2 rounded hover:bg-gray-700 text-white">Profile</button>
            <button className="text-left px-4 py-2 rounded hover:bg-gray-700 text-white">Continue Watching</button>
            <button className="text-left px-4 py-2 rounded hover:bg-gray-700 text-white">Watch List</button>
            <button className="text-left px-4 py-2 rounded hover:bg-gray-700 text-white">Notification</button>
            <button className="text-left px-4 py-2 rounded hover:bg-gray-700 text-white">Settings</button>
            <button 
              className="text-left px-4 py-2 rounded hover:bg-gray-700 text-red-400"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
