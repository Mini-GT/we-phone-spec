import { data, Link, redirect, ScrollRestoration, useFetcher, useLoaderData, useLocation, useMatches, type ActionFunctionArgs, type LoaderFunctionArgs, type MetaFunction } from "react-router";
import UserMenuNav from "~/components/userMenuNav";
import { Bell } from "lucide-react";
import { Spinner } from "~/components/spinner";
import authService from "~/services/auth.service";
import { queryKeysType, type NewDeviceNotificationType, type NotificationType, type UserType } from "~/types/globals.type";
import { convertToTimeAgo } from "~/utils/formatDate";
import { commitSession, destroySession, getSession } from "~/session/sessions.server";
import NotificationService from "~/services/notification.service";
import type { Route } from "./+types/notification";
import { isTokenValid } from "~/utils/tokenValidator";
import KebabMenu from "~/components/ui/kebabMenu";
import PaginationComponent from "~/components/paginations";
import { useEffect, useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { useUser } from "~/context/userContext";
import type { MatchesNotificationType } from "~/components/ui/notificationBell";

export function meta({}: MetaFunction) {
  return [
    { title: "Notification - WePhoneSpec" },
    { name: "description", content: "View and manage your notifications." },
  ];
}

export async function action({request}: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  const queryClient = new QueryClient();
  let accessToken = session.get("accessToken")
  let refreshToken = session.get("refreshToken")
  let formData = await request.formData()
  // action coming from "KebabMenu.tsx" component
  const notifId = formData.get("smartphoneId") as string
  const pagination = formData.get("pagination") as string
  const parsedPagination = JSON.parse(pagination) as { take: number, skip: number }
  let result = null
  
  if(refreshToken && !isTokenValid(refreshToken)) {
    return redirect("/", {
      headers: {
        "Set-Cookie": await destroySession(session),
      }
    })
  }

  if (!isTokenValid(accessToken) && isTokenValid(refreshToken)) {
    const { newAccessToken } = await authService.refresh(refreshToken!)
    session.set("accessToken", newAccessToken)
    accessToken = newAccessToken
  }

  const notificationService = new NotificationService(accessToken)
  if(parsedPagination) {
    const data = await queryClient.fetchQuery({
      queryKey: queryKeysType.notifications,
      queryFn: async () => await notificationService.getNotifications(parsedPagination.take, parsedPagination.skip)
    })
    // const data = await notificationService.getNotifications()
    result = data.message 
  }

  if(notifId) {
    const deleteResult = await notificationService.deleteNotification(notifId)
    result = deleteResult.message
  }

  return data(
    { result },
    { 
      headers: {
        "Set-Cookie": await commitSession(session),
      }
    }
  )

}

// export async function loader({request}: LoaderFunctionArgs) {
//   const queryClient = new QueryClient();
//   const session = await getSession(request.headers.get("Cookie"))
//   let accessToken = session.get("accessToken")
//   if(accessToken && !isTokenValid(accessToken)) return
//   const notificationService = new NotificationService(accessToken)
//   const notifications = await queryClient.fetchQuery({
//     queryKey: queryKeysType.notifications,
//     queryFn: () => notificationService.getNotifications()
//   })
//   // const notifications = (notification.message as NotificationType).notifications
//   // console.log("notif:", notifications)
//   // return notifications
// }

export default function Notification() {
  const matches = useMatches()[0].data as MatchesNotificationType
  const notif = matches.notifData.message.notifications 
  const [fetcherData, setFetcherData] = useState<NotificationType | null>(null)
  const notifications = fetcherData?.notifications ?? notif
  const fetcher = useFetcher()
  const { user } = useUser()

  useEffect(() => {
    if (fetcher.data?.result) {
      setFetcherData(fetcher.data.result)
    }
  }, [fetcher.data])

  if (!user) {
    return (
      <Spinner spinSize="w-12 h-12" />
    )
  }

  return (
    <div className="min-h-full bg-gray-800 bg-opacity-90 flex flex-col items-center py-12 px-4">
      <UserMenuNav
        tab={"notificaton"}
        name={user?.name}
      />

      <div className="w-full max-w-5xl bg-gray-900 rounded-lg overflow-hidden">
        <div className="flex p-2 sm:p-8 bg-gray-900 items-center">
          <div className="text-2xl sm:text-3xl font-bold text-white flex items-center">
            <Bell fill="yellow" strokeWidth={0} className="mr-3 h-7 w-7" />
            Notification
          </div>
        </div>
        
        <div className="flex flex-col gap-4 p-2">
          {
          fetcher.state === "loading" ? <Spinner parentClassName="h-full" spinSize="w-12" /> :
          Array.isArray(notifications) && notifications.length > 0 ? notifications.map((notif) => (
            <div className="relative" key={notif.globalNotificationId}>
              <Link
                to={`/smartphones/${notif.name}-${notif.globalNotificationId}`} 
              >
                <div
                  className={`relative flex items-center cursor-pointer gap-2 rounded-md hover:bg-[#2c2c3e] ${notif.isRead ? "" : ""} transition z-10`}
                >
                  <div className="flex items-center h-17 w-15 justify-center rounded-sm p-2 bg-white">
                    <img 
                      src={`/imgs/phones/${notif.image || "phone_placeholder.svg"}`} 
                      alt="thumb" 
                      className="object-fit h-full w-full"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col justify-between rounded-md flex-1 ">
                    <p className={`text-sm ${notif.isRead ? "text-[#CBD5E1] font-normal" : "font-semibold text-[#FFFFFF]"} mb-2`}>
                      {notif.title}
                    </p>
                    <div 
                      className={`hidden ${notif.isRead ? "text-[#CBD5E1] font-normal" : "font-semibold text-[#FFFFFF]"} line-clamp-4`}
                    >
                      {notif.description || "No Description"}
                    </div>
                    <p className="text-xs text-gray-500 mt-auto">
                      {convertToTimeAgo(notif.createdAt) || ""}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="absolute right-5 top-0 z-10">
                <KebabMenu action="/user/notification" deviceId={notif.globalNotificationId} fetcher={fetcher} />
              </div>
            </div>
          )) : null}
        </div>
      </div>
      <PaginationComponent 
        totalItems={fetcherData?.totalNotifications} 
        fetcher={fetcher} 
        action="/user/notification"
      />  
    </div>
  )
}