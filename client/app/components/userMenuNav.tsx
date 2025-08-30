import { NavLink } from "react-router";
import type { UserMenuNavProps } from "~/types/globals.type";
import { ProtectedRoute } from "./protectedRoute";
import { PERMISSIONS } from "~/utils/permissions";
import { Bell, Heart, SettingsIcon, Smartphone, UserRound, UsersRound } from "lucide-react";
import { Spinner } from "./spinner";

export default function UserMenuNav({
  tab,
  name,
}: UserMenuNavProps) {
  return (
    <div className="w-full max-w-4xl mb-8">
      {/* Header */}
      <h1 className="text-white hidden sm:block text-3xl font-bold text-center mb-6">Hi, {name || "User"}</h1>
      
      {/* Navigation */}
      <div className="flex gap-6 justify-center items-center border-b h-9 border-gray-700 pb-1">
        <ProtectedRoute requiredRoles={["ADMIN", "MODERATOR"]} requiredPermission={PERMISSIONS.VIEW_USERS}>
          <NavLink 
            to="/users"
            className={`flex items-center ${tab === "users" ? "text-pink-300 border-pink-300 border-b-2 sm:border-none" : "text-gray-400" } pb-1 cursor-pointer hover:text-pink-300`}
          >
            {({ isPending }) => (
              <div className="flex items-center">
                  <UsersRound fill="#3498db" strokeWidth={2} className="w-5 h-5 text-gray-400" />
                  <span className="hidden sm:block">User</span> 
                <div className="hidden sm:block ml-1 w-5 h-5">
                  {isPending && <Spinner parentClassName="w-full h-full" spinSize="ml-1 w-5 h-5" />}
                </div>
              </div>
            )}
          </NavLink>
        </ProtectedRoute>
        <ProtectedRoute requiredRoles={["ADMIN", "MODERATOR"]} requiredPermission={PERMISSIONS.VIEW_DEVICES}>
          <NavLink 
            to="/devices"
            className={`flex items-center ${tab === "devices" ? "text-pink-300 border-pink-300 border-b-2 sm:border-none" : "text-gray-400" } pb-1 cursor-pointer hover:text-pink-300`}
          >
            {({ isPending }) => (
              <div className="flex items-center">
                  <Smartphone fill="#d5dbdb" strokeWidth={2} className="w-5 h-5 text-gray-400" />
                  <span className="hidden sm:block">Devices</span>
                <div className="hidden sm:block ml-1 w-5 h-5">
                  {isPending && <Spinner parentClassName="w-full h-full" spinSize="ml-1 w-5 h-5" />}
                </div>
              </div>
            )}
            {/* <span className="mr-2">👤</span> */}
            {/* <Smartphone fill="#d5dbdb" strokeWidth={2} className="mr-1 w-5 h-5  text-gray-400" />
            <span>Devices</span> */}
          </NavLink>
        </ProtectedRoute>
        <NavLink 
          to="/user/profile"
          className={`flex items-center ${tab === "profile" ? "text-pink-300 border-pink-300 border-b-2 sm:border-none" : "text-gray-400" } pb-1 cursor-pointer hover:text-pink-300`}
        >
          {({ isPending }) => (
            <div className="flex items-center">
                <UserRound fill="#8e44ad" strokeWidth={0} className="w-5 h-5 text-gray-400" />
                <span className="hidden sm:block">Profile</span>
              <div className="hidden sm:block ml-1 w-5 h-5">
                {isPending && <Spinner parentClassName="w-full h-full" spinSize="ml-1 w-5 h-5" />}
              </div>
            </div>
          )}
          {/* <UserRound fill="#8e44ad" strokeWidth={0} className="mr-1 w-5 h-5" />
          <span>Profile</span> */}
        </NavLink>
        <NavLink 
          to="/user/like-list"
          className={`flex items-center ${tab === "likelist" ? "text-pink-300 border-pink-300 border-b-2 sm:border-none" : "text-gray-400" } pb-1 cursor-pointer hover:text-pink-300`}
        >
          {({ isPending }) => (
            <div className="flex items-center">
                <Heart fill="#e74c3c" strokeWidth={0} className="w-5 h-5 text-gray-400" />
                <span className="hidden text-nowrap sm:block">Like List</span>
              <div className="hidden sm:block ml-1 w-5 h-5">
                {isPending && <Spinner parentClassName="w-full h-full" spinSize="ml-1 w-5 h-5" />}
              </div>
            </div>
          )}
          {/* <Heart fill="#e74c3c" strokeWidth={0} className="mr-1 w-5 h-5" />
          <span>Like List</span> */}
        </NavLink>
        <NavLink 
          to="/user/notification"
          className={`flex items-center ${tab === "notificaton" ? "text-pink-300 border-pink-300 border-b-2 sm:border-none" : "text-gray-400" } pb-1 cursor-pointer hover:text-pink-300`}
        >
          {({ isPending }) => (
            <div className="flex items-center">
                <Bell fill="yellow" strokeWidth={0} className="w-5 h-5 text-gray-400" />
                <span className="hidden text-nowrap sm:block">Notification</span>
              <div className="hidden sm:block ml-1 w-5 h-5">
                {isPending && <Spinner parentClassName="w-full h-full" spinSize="ml-1 w-5 h-5" />}
              </div>
            </div>
          )}
        </NavLink>
        <NavLink 
          to="/user/settings"
          className={`flex items-center ${tab === "settings" ? "text-pink-300 border-pink-300 border-b-2 sm:border-none" : "text-gray-400" } pb-1 cursor-pointer hover:text-pink-300`}
        >
          {({ isPending }) => (
            <div className="flex items-center">
                <SettingsIcon fill="white" strokeWidth={0} className="w-5 h-5 text-gray-400" />
                <span className="hidden sm:block">Settings</span>
              <div className="hidden sm:block ml-1 w-5 h-5">
                {isPending && <Spinner parentClassName="w-full h-full" spinSize="w-5 h-5" />}
              </div>
            </div>
          )}
          {/* <SettingsIcon fill="white" strokeWidth={1} className="mr-1 w-5 h-5  text-gray-400" />
          <span>Settings</span> */}
        </NavLink>
      </div>
    </div>
  )
}