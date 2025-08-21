import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { BellIcon } from 'lucide-react'
import type { DropDownProps, NewDeviceNotificationType, NotificationType } from '~/types/globals.type'
import { convertToTimeAgo } from '~/utils/formatDate'
import { io } from "socket.io-client";
import notificationService from '~/services/notification.service'
import { Link } from 'react-router'
import KebabMenu from './kebabMenu';

type NotificationBellProps = {
  open: DropDownProps
  setOpen: Dispatch<SetStateAction<DropDownProps>>
}

export default function NotificationBell({
  open,
  setOpen
}: NotificationBellProps) {
  const [ notifications, setNotifications ] = useState<NewDeviceNotificationType[]>([])
  const unreadCount = notifications.filter(n => !n.isRead).length

  const toggleDropdown = () => {
    // close the other dropdown to avoid multiple opened dropdowns
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

    // initial load of notification data
    const fetchNotifationData = async () => {
      const notificationData = await notificationService.getNotifications()
      if(notificationData.message.result === "success") {
        const data = (notificationData.message as NotificationType).notifications
        setNotifications(data)
      }
    }

    fetchNotifationData()

    socket.on("connect_error", (err) => {
      console.error("connection error", err.message)
    })

    socket.on("newDeviceNotification", async (message: NewDeviceNotificationType) => {
      const res = await notificationService.addNotification(message)
      setNotifications((prev) => [message, ...prev])
    })

    return () => {
      socket.disconnect();
    }

  }, [])

  const handleClick = async (notifId: string) => {
    toggleDropdown()

    setNotifications((prevNotifs) =>
      prevNotifs.map((notif) =>
        notif.globalNotificationId === notifId
          ? { ...notif, isRead: true }
          : notif
      )
    )
    
    // setNotifications((prevNotifs) =>
    //   prevNotifs.map((notif) => {
    //     if(notif.isDeleted) {
    //       return
    //     } else {
    //       return notif.globalNotificationId === notifId ? { ...notif, isRead: true}  : notif 
    //     }
    //   })
    // )
    const res = await notificationService.markNotificationAsRead(notifId)
  }
  
  return (
    <div className="relative">
      {/* <div className="relative"> */}
        <button 
          className="relative hover:opacity-90 active:scale-97 active:opacity-80 cursor-pointer p-2 rounded-full bg-gray-800"
          onClick={toggleDropdown}
        >
          <BellIcon className="w-6 h-6 text-white cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1.5">
            {unreadCount ? unreadCount : null}
          </span>
        </button>
      {/* </div> */}

      <div className={`absolute -right-10 w-70 sm:right-0 sm:w-90 rounded-lg bg-gray-800 shadow-xl text-white p-3 mt-1 z-20 transition-all duration-200 ${open.isNotificationDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
        {/* <div className="flex items-center gap-2 py-2 pl-2 text-sm text-muted-foreground">
          <CheckIcon className="w-4 h-4" />
          <button onClick={() => setAllRead(true)} className="hover:underline">
            Mark all as read
          </button>
        </div> */}

        <div className="space-y-2 max-h-full overflow-y-none">
          {Array.isArray(notifications) && notifications?.length > 0 ? notifications.map((notif, i) => (
            <div className="relative" key={notif.globalNotificationId}>
              
                <div
                  // className={`relative flex`}
                  className={`relative flex items-stretch cursor-pointer gap-2 rounded-md hover:bg-[#2c2c3e] ${notif.isRead ? "" : ""} transition sm:p-3 z-10`}
                >
                  <Link 
                    to={`/smartphones/${notif.name}-${notif.globalNotificationId}`} 
                    onClick={() => handleClick(notif.globalNotificationId)}
                    className={`relative flex gap-2`}
                  >
                    <div className="flex items-center justify-center rounded-sm px-2 bg-white sm:w-1/5">
                      <img 
                        src={`/imgs/phones/${notif.image || "phone_placeholder.svg"}`} 
                        alt="thumb" 
                        className="object-fit h-12 w-10" 
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="flex flex-col justify-between rounded-md flex-1 ">
                      <p className={`text-sm ${notif.isRead ? "text-[#CBD5E1] font-normal" : "font-semibold text-[#FFFFFF]"} mb-2`}>
                        {notif.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-auto">
                        {convertToTimeAgo(notif.createdAt) || ""}
                      </p>
                    </div>
                  </Link>
                  <div className="absolute right-3 sm:right-4">
                    <KebabMenu 
                      action="user/notification" 
                      deviceId={notif.globalNotificationId} 
                      setNotifications={setNotifications}
                    />
                  </div>
                </div>
            </div>
            )) : null}
          {/* <div className="text-center py-4">No Notifications</div> */}
        </div>

        <div className="flex items-center justify-center rounded-sm h-10 mt-3 bg-gray-700 cursor-pointer">
          <button className="text-sm text-white cursor-pointer">
            View all
          </button>
        </div>
      </div>
    </div>
  )
}
