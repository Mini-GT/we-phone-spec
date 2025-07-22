import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { BellIcon, Bluetooth, CheckIcon } from 'lucide-react'
import clsx from 'clsx'
import type { DropDownProps } from '~/types/globals.type'

const notifications = [
  {
    id: 1,
    title: 'One Piece - Episode 1136 [SUB] available NOW!',
    date: '9 days ago',
    image: '/imgs/profile/gojo.png',
    read: false,
  },
  {
    id: 2,
    title: 'One Piece - Episode 1135 [SUB] available NOW!',
    date: '16 days ago',
    image: '/imgs/profile/gojo.png',
    read: false,
  },
  {
    id: 3,
    title: 'One Piece - Episode 1134 [SUB] available NOW!',
    date: '22 days ago',
    image: '/imgs/profile/gojo.png',
    read: false,
  },
  {
    id: 4,
    title: 'One Piece - Episode 1133 [SUB] available NOW!',
    date: 'a month ago',
    image: '/imgs/profile/gojo.png',
    read: false,
  },
  {
    id: 5,
    title: 'One Piece - Episode 1132 [SUB] available NOW!',
    date: 'a month ago',
    image: '/imgs/profile/gojo.png',
    read: false,
  },
]

type NotificationBellProps = {
  open: DropDownProps
  setOpen: Dispatch<SetStateAction<DropDownProps>>
}

export default function NotificationBell({
  open,
  setOpen
}: NotificationBellProps) {
  const [allRead, setAllRead] = useState(false)

  const toggleDropdown = () => {
    // we must close the other dropdown to avoid multiple opened dropdowns
    if(open.isProfileMenu) {
      setOpen({isProfileMenu: false, isNotificationDropdown: !open.isNotificationDropdown});
      return
    }
    setOpen(prev => ({...prev, isNotificationDropdown: !open.isNotificationDropdown}));
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
            {notifications.length}
          </span>
        </button>
      {/* </div> */}

      <div className={`absolute right-0 w-80 rounded-lg bg-gray-800 shadow-xl text-white p-3 mt-1 z-50 transition-all duration-200 ${open.isNotificationDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
        <div className="flex items-center gap-2 py-2 pl-2 text-sm text-muted-foreground">
          <CheckIcon className="w-4 h-4" />
          <button onClick={() => setAllRead(true)} className="hover:underline">
            Mark all as read
          </button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={clsx(
                'flex items-start cursor-pointer gap-3 rounded-md p-2 hover:bg-[#2c2c3e] transition',
                allRead && 'opacity-90'
              )}
            >
              <img src={notif.image} alt="thumb" className="w-12 h-12 rounded-md" />
              <div>
                <p className={`text-sm font-semibold text-pink-400 leading-snug ${allRead && "opacity-80"}`}>
                  {notif.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{notif.date}</p>
              </div>
            </div>
          ))}
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
