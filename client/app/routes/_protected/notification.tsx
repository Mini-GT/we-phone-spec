import { Link, useLoaderData, useMatches, type ActionFunctionArgs, type LoaderFunctionArgs, type MetaFunction } from "react-router";
import UserMenuNav from "~/components/userMenuNav";
import type { Route } from "../_protected/+types/notification";
import { Bell } from "lucide-react";
import { Spinner } from "~/components/spinner";
import authService from "~/services/auth.service";
import type { NotificationType, UserType } from "~/types/globals.type";
import { convertToTimeAgo } from "~/utils/formatDate";
import notificationService from "~/services/notification.service";

export function meta({}: MetaFunction) {
  return [
    { title: "Notification - WePhoneSpec" },
    { name: "description", content: "View and manage your notifications." },
  ];
}

export async function action({request}: ActionFunctionArgs) {
  const token = authService.privateRoute(request) || ""
  let formData = await request.formData()
  // action coming from "KebabMenu.tsx" component
  const notifId = formData.get("smartphoneId") as string
  
  if(notifId) {
    const deleteResult = await notificationService.deleteNotification(token, notifId)
    return deleteResult
  }
}

export async function loader({request}: LoaderFunctionArgs) {
  const token = authService.privateRoute(request) || ""
  const notification = await notificationService.getNotifications(token) 
  return (notification.message as NotificationType).notifications
}

export default function Notification({actionData}: Route.ComponentProps) {
  const notifications = useLoaderData<typeof loader>()
  const matches = useMatches()
  const user = matches[0].data as UserType
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
            {Array.isArray(notifications) && notifications?.length > 0 ? notifications.map((notif) => (
              <div className="relative" key={notif.globalNotificationId}>
                <Link
                  to={`/smartphones/${notif.name}-${notif.globalNotificationId}`} 
                >
                  <div
                    className={`relative flex items-stretch cursor-pointer gap-4 rounded-md hover:bg-[#2c2c3e] ${notif.isRead ? "" : ""} transition p-3 z-10`}
                  >
                    <div className="flex items-center justify-center rounded-sm p-2 bg-white">
                      <img 
                        src={`/${notif.image}`} 
                        alt="thumb" 
                        className="object-cover h-32 w-auto" 
                        loading="lazy"
                      />
                    </div>

                    <div className="flex flex-col justify-between rounded-md flex-1 ">
                      <p className={`text-xl ${notif.isRead ? "text-[#CBD5E1] font-normal" : "font-semibold text-[#FFFFFF]"} mb-2`}>
                        {notif.title}
                      </p>
                      <div 
                        className={`${notif.isRead ? "text-[#CBD5E1] font-normal" : "font-semibold text-[#FFFFFF]"} line-clamp-4`}
                      >
                        {notif.description || "No Description"}
                      </div>
                      <p className="text-xs text-gray-500 mt-auto">
                        {convertToTimeAgo(notif.createdAt) || ""}
                      </p>
                    </div>
                  </div>
                </Link>
                {/* <KebabMenu action="/user/notification" deviceId={notif.globalNotificationId} /> */}
              </div>
            )) : null}
          </div>
        </div>
      </div>
    </div>
  )
}