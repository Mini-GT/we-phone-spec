import { useEffect, useRef, useState } from "react";

export default function KebabMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="absolute top-1 right-1" ref={menuRef}> 
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 flex items-center justify-center bg-gray-900 rounded-full text-white hover:bg-gray-700 cursor-pointer"
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
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-700 cursor-pointer">Remove</button>
        </div>
      )}
    </div>
  )
}