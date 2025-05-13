import { useState, useEffect, useRef } from "react";
import type { UserMenuProps } from "~/types/globals.type";
import authService from "~/services/auth.service";
import { NavLink, useNavigate } from "react-router";

export default function UserMenu({
  userId,
  name,
  email,
  profileImage
}: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Handle clicks outside of the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    
    // Add event listener when the dropdown is open
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  
  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };
  
  const handleLogout = () => {
    authService.logout();
    navigate(0);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Avatar Button */}
      <div>
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-full bg-gray-700 hover:opacity-80 focus:outline-none"
          aria-expanded={open}
          aria-haspopup="true"
        >
          <img
            src={profileImage ?? "userIcon.svg"}
            alt="User Avatar"
            className="w-full h-full rounded-full object-cover"
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      <div 
        className={`absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg p-4 z-50 transition-all duration-200 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="mb-4">
          <p className="text-white font-bold">{name}</p>
          <p className="text-gray-400 text-sm">{email}</p>
        </div>

        <div className="flex flex-col gap-2">
          <NavLink
            to="/user/profile"
            className="text-left px-4 py-2 rounded hover:bg-gray-700 text-white"
            onClick={() => setOpen(false)} // Close the dropdown when navigating
          >
            Profile
          </NavLink>
          <button className="text-left px-4 py-2 rounded hover:bg-gray-700 text-white">
            Watch List
          </button>
          <button className="text-left px-4 py-2 rounded hover:bg-gray-700 text-white">
            Notification
          </button>
          <button className="text-left px-4 py-2 rounded hover:bg-gray-700 text-white">
            Settings
          </button>
          <button 
            className="text-left px-4 py-2 rounded hover:bg-gray-700 text-red-400"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}