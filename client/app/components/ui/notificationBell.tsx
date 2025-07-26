import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { BellIcon, Bluetooth, CheckIcon } from 'lucide-react'
import clsx from 'clsx'
import type { DropDownProps, NewDeviceNotificationType, Smartphone } from '~/types/globals.type'
import { convertToTimeAgo } from '~/utils/formatDate'
import { io } from "socket.io-client";

type NotificationBellProps = {
  open: DropDownProps
  setOpen: Dispatch<SetStateAction<DropDownProps>>
}

export default function NotificationBell({
  open,
  setOpen
}: NotificationBellProps) {
  const [ notifications, setNotifications ] = useState<NewDeviceNotificationType[]>([])

  const toggleDropdown = () => {
    // we must close the other dropdown to avoid multiple opened dropdowns
    if(open.isProfileMenu) {
      setOpen({isProfileMenu: false, isNotificationDropdown: !open.isNotificationDropdown});
      return
    }
    setOpen(prev => ({...prev, isNotificationDropdown: !open.isNotificationDropdown}));
  }
  useEffect(() => {
    const socket = io(import.meta.env.VITE_NOTIFICATION_SOCKET_NAMESPACE, {
      withCredentials: true, 
    })

    socket.on("connect_error", (err) => {
      console.error("connection error", err.message)
    })

    socket.on("newDeviceNotification", (message: NewDeviceNotificationType) => {
      setNotifications((prev) => [message, ...prev])
    })

    return () => {
      socket.disconnect();
    }

  }, [])

  return (
    <div className="relative">
      {/* <div className="relative"> */}
        <button 
          className="relative hover:opacity-90 active:scale-97 active:opacity-80 cursor-pointer p-2 rounded-full bg-gray-800"
          onClick={toggleDropdown}
        >
          <BellIcon className="w-6 h-6 text-white cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1.5">
            {Array.isArray(notifications) && notifications.length > 0 ? notifications.length : null}
          </span>
        </button>
      {/* </div> */}

      <div className={`absolute right-0 w-90 rounded-lg bg-gray-800 shadow-xl text-white p-3 mt-1 z-50 transition-all duration-200 ${open.isNotificationDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
        <div className="flex items-center gap-2 py-2 pl-2 text-sm text-muted-foreground">
          <CheckIcon className="w-4 h-4" />
          {/* <button onClick={() => setAllRead(true)} className="hover:underline">
            Mark all as read
          </button> */}
        </div>

        <ul className="space-y-2 max-h-96 overflow-y-auto">
          {Array.isArray(notifications) && notifications?.length > 0 ? notifications.map(notif => (
              <li
                key={notif.id}
                className="flex items-stretch cursor-pointer gap-4 rounded-md hover:bg-[#2c2c3e] transition p-3"
              >
                <div className="flex items-center justify-center rounded-sm px-2 bg-white">
                  <img 
                    src={`/${notif.image}`} 
                    alt="thumb" 
                    className="object-cover h-12 w-auto" 
                  />
                </div>
                
                <div className="flex flex-col justify-between rounded-md flex-1 ">
                  <p className="text-sm font-semibold text-pink-400 mb-2">
                    {notif.title}
                  </p>
                  
                  {/* <div className="text-pink-400 text-sm flex-1 mb-2 overflow-hidden line-clamp-4">
                    {notif.description || "No description available."}
                  </div> */}
                  
                  <p className="text-xs text-gray-500 mt-auto">
                    {convertToTimeAgo(notif.date)}
                  </p>
                </div>
              </li>
            )) : null}
          {/* <div className="text-center py-4">No Notifications</div> */}
        </ul>

        <div className="flex items-center justify-center rounded-sm h-10 mt-3 bg-gray-700 cursor-pointer">
          <button className="text-sm text-white cursor-pointer">
            View all
          </button>
        </div>
      </div>
    </div>
  )
}
