import { useMatches, useNavigate, type LoaderFunctionArgs, type MetaFunction } from "react-router";
import UserMenuNav from "~/components/userMenuNav";
import { useAuth } from "~/context/authContext";
import type { Route } from "../_protected/+types/notification";
import { Bell } from "lucide-react";
import { Spinner } from "~/components/spinner";
import authService from "~/services/auth.service";
import type { Smartphone, UserType } from "~/types/globals.type";
import { useEffect, useState } from "react";
import { io } from 'socket.io-client'
import { convertToTimeAgo } from "~/utils/formatDate";

const socket = io('http://localhost:3000')

export function meta({}: MetaFunction) {
  return [
    { title: "Notification - WePhoneSpec" },
    { name: "description", content: "View and manage your notifications." },
  ];
}

export async function loader({request}: LoaderFunctionArgs) {
  const userId = authService.privateRoute(request);
}

export default function Notification() {
  const matches = useMatches()
  const user = matches[0].data as UserType
  const [ notification, setNotification ] = useState<Smartphone[] | null>([])

  useEffect(() => {
    socket.on("newDeviceNotification", (message: Smartphone) => {
      console.log(message)
      setNotification(message)
    })

    return () => {
      socket.disconnect();
    }

  }, [])

  if (!user) {
    return (
      <Spinner spinSize="w-12 h-12" />
    )
  }

  return (
    <div className="min-h-screen bg-gray-800 bg-opacity-90 flex flex-col items-center py-12 px-4">
      <UserMenuNav
        tab={"notificaton"}
        name={user?.name}
      />

      <div className="w-full max-w-5xl bg-gray-900 rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-8">
            <div className="text-3xl font-bold text-white flex items-center">
              <Bell fill="yellow" strokeWidth={0} className="mr-3 h-6 w-6" />
              Notification
            </div>
          </div>
          
          <div className="space-y-4 overflow-y-auto">
            {Array.isArray(notification) && notification?.length > 0 ? notification.map(notif => (
              <div
                key={notif.id}
                className="flex items-stretch cursor-pointer gap-4 rounded-md hover:bg-[#2c2c3e] transition p-3"
              >
                <div className="flex-shrink-0 flex items-center justify-center rounded-md p-2 bg-white">
                  <img 
                    src={`/${notif.image}`} 
                    alt="thumb" 
                    className="object-cover rounded-md h-32 w-auto" 
                  />
                </div>
                
                <div className="flex flex-col justify-between rounded-md flex-1 min-h-[140px]">
                  <p className="text-xl font-semibold text-pink-400 mb-2">
                    {notif.title}
                  </p>
                  
                  <div className="text-pink-400 text-sm flex-1 mb-2 overflow-hidden line-clamp-4">
                    {notif.description || "No description available."}
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-auto">
                    {convertToTimeAgo(notif.date)}
                  </p>
                </div>
              </div>
            )) : null}
          </div>
        </div>
      </div>
    </div>
  )
}