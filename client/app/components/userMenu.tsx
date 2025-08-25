import { useState, useEffect, useRef } from "react";
import { NavLink, useFetcher, useNavigate } from "react-router";
import { ProtectedRoute } from "./protectedRoute";
import { PERMISSIONS } from "~/utils/permissions";
import type { DropDownProps, UserType } from "~/types/globals.type";
import NotificationBell from "./ui/notificationBell";
import { useUser } from "~/context/userContext";

export default function UserMenu({
  name,
  email,
  profileImage,
}: Omit<UserType, "createdAt" | "status" | "id">) {
  const [open, setOpen] = useState<DropDownProps>({
    isProfileMenu: false,
    isNotificationDropdown: false
  });
  const menuRef = useRef<HTMLDivElement>(null);
  const fetcher = useFetcher()
  const navigate = useNavigate()
  // const { handleLogout } = useAuth();
  const { setUser } = useUser()

  const handleLogout = () => {
    navigate("/")
    setUser(null)
    fetcher.submit(
      { logout: true }, 
      { action: "/", method: "post"}
    )
  }
  
  // Handle clicks outside of the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen({isProfileMenu: false, isNotificationDropdown: false });
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
    if(open.isNotificationDropdown) {
      // we must close the other dropdown to avoid multiple opened dropdowns
      setOpen({ isNotificationDropdown: false, isProfileMenu: !open.isProfileMenu});
      return
    }
    setOpen(prev => ({...prev, isProfileMenu: !open.isProfileMenu}));
  };

  return (
    <div className="flex gap-2 ml-auto relative text-left" ref={menuRef}>
      <NotificationBell open={open} setOpen={setOpen} />
      {/* Avatar Button */}
      <div className="relative inline-block">
        <div>
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-full bg-gray-700 hover:opacity-90 active:scale-97 active:opacity-80 focus:outline-none"
            aria-expanded={open.isProfileMenu}
            aria-haspopup="true"
          >
            <img
              src={profileImage ?? "/userIcon.svg"}
              alt="User Avatar"
              className="w-full h-full rounded-full object-cover border-1 border-gray-600"
            />
          </button>
        </div>

        {/* Dropdown Menu */}
        <div 
          className={`absolute right-0 mt-1 w-64 bg-gray-800 rounded-lg shadow-lg p-4 z-50 transition-all duration-200 ${
            open.isProfileMenu ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="mb-4">
            <p className="text-white font-bold">{name}</p>
            <p className="text-gray-400 text-sm">{email}</p>
          </div>

          <div className="flex flex-col gap-2">
            <ProtectedRoute requiredRoles={["ADMIN", "MODERATOR"]} requiredPermission={PERMISSIONS.VIEW_USERS} >
              <NavLink
                to="/users"
                className="text-left px-4 py-2 rounded hover:bg-gray-700 text-white"
                onClick={() => setOpen(prev => ({...prev, isProfileMenu: false}))} // Close the dropdown when navigating
              >
                Users
              </NavLink>
            </ProtectedRoute>
            <ProtectedRoute requiredRoles={["ADMIN", "MODERATOR"]} requiredPermission={PERMISSIONS.VIEW_DEVICES} >
              <NavLink
                to="/devices"
                className="text-left px-4 py-2 rounded hover:bg-gray-700 text-white"
                onClick={() => setOpen(prev => ({...prev, isProfileMenu: false}))} // Close the dropdown when navigating
              >
                Devices
              </NavLink>
            </ProtectedRoute>
            <NavLink
              to="/user/profile"
              className="text-left px-4 py-2 rounded hover:bg-gray-700 text-white"
              onClick={() => setOpen(prev => ({...prev, isProfileMenu: false}))} // Close the dropdown when navigating
            >
              Profile
            </NavLink>
            <NavLink
              to="/user/like-list"
              className="text-left px-4 py-2 rounded hover:bg-gray-700 text-white"
              onClick={() => setOpen(prev => ({...prev, isProfileMenu: false}))} // Close the dropdown when navigating
            >
              Like List
            </NavLink>
            {/* <NavLink
              to="/user/notification"
              className="flex text-left px-4 py-2 rounded hover:bg-gray-700 text-white"
              onClick={() => setOpen(prev => ({...prev, isProfileMenu: false}))} // Close the dropdown when navigating
            >
              Notification
            </NavLink> */}
            <NavLink
              to="/user/settings"
              className="text-left px-4 py-2 rounded hover:bg-gray-700 text-white"
              onClick={() => setOpen(prev => ({...prev, isProfileMenu: false}))} // Close the dropdown when navigating
            >
              Settings
            </NavLink>
            <button 
              className="text-left px-4 py-2 rounded hover:bg-gray-700 text-red-400 cursor-pointer "
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}