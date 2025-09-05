import { useEffect, useRef, useState } from "react";
import { useNavigation } from "react-router";
import { type KebabMenuProps } from "~/types/globals.type";

export default function KebabMenu({ deviceId, action, setNotifications, fetcher }: KebabMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigation = useNavigation()
  // console.log(fetcher.data)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleRemove = () => {
    if(setNotifications) {
      setNotifications(prevItems => 
        prevItems
          .map(item => item.globalNotificationId === deviceId ? { ...item, isDeleted: true } : item)
          .filter(item => !item.isDeleted)
      )
    }

    fetcher?.submit(
      { smartphoneId: deviceId },
      {
        method: "post",
        action
      }
    )
  }

  return (
    <div className="absolute" ref={menuRef}> 
      <button
        onClick={() => setOpen(!open)}
        className="w-4 h-7 flex items-center justify-center rounded-full font-bold bg-black text-white hover:bg-gray-700 cursor-pointer"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-32 bg-white shadow-md rounded z-50 overflow-hidden">
          <button 
            className="block w-full text-left px-4 py-2 hover:bg-gray-200 active:bg-white text-sm text-red-700 cursor-pointer"
            disabled={navigation.formAction === action}
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  )
}