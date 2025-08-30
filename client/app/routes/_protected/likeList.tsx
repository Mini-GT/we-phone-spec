import { data, Link, redirect, useFetcher, useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs, type MetaFunction } from "react-router";
import { Heart } from 'lucide-react';
import UserMenuNav from "~/components/userMenuNav";
import { Spinner } from "~/components/spinner";
import authService from "~/services/auth.service";
import type { ApiResponse, Smartphone } from "~/types/globals.type";
import userService from "~/services/user.service";
import KebabMenu from "~/components/ui/kebabMenu";
import { useUser } from "~/context/userContext";
import { commitSession, destroySession, getSession } from "~/session/sessions.server";
import UserService from "~/services/user.service";
import { isTokenValid } from "~/utils/tokenValidator";

export function meta({}: MetaFunction) {
  return [
    { title: "Like list - WePhoneSpec" },
    { name: "description", content: "View and manage your like list." },
  ];
}

type UserLikeResponse = ApiResponse["message"] & {
  likedSmartphoneId: string[]
}
type SmartphoneData = ApiResponse["message"] & {
  smartphones: Smartphone[]
}


export async function action({request}: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  let accessToken = session.get("accessToken")
  let refreshToken = session.get("refreshToken")
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

  const userService = new UserService(accessToken)
  let formData = await request.formData()
  // action coming from "KebabMenu.tsx" component
  const smartphoneId = formData.get("smartphoneId") as string
  if(smartphoneId) {
    result = await userService.deleteLikedDevice(smartphoneId)
  }

  return data(
    { result },
    {
      headers: {
      "Set-Cookie": await commitSession(session)
      }
    }
  ) 
}

export async function loader({request}: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  const accessToken = session.get("accessToken")
  const userService = new UserService(accessToken)
  // get user liked smartphones Id/s 
  const data = await userService.getUserLikes()
  const { result, likedSmartphoneId } = data.message as UserLikeResponse
  // if success and there is a liked smartphone id/s
  if(result === "success") {
    // fetch the smartphone data base on Id/s
    const data = await userService.getUserLikeListSmartphoneData(likedSmartphoneId)
    const { smartphones } = data.message as SmartphoneData
    return smartphones
  }
}

export default function LikeList() {
  const smartphones = useLoaderData<typeof loader>();
  const { user } = useUser() 
  const fetcher = useFetcher()

  // const handleRemove = () => {
  //   if(setNotifications) {
  //     setNotifications(prevItems => 
  //       prevItems
  //         .map(item => item.globalNotificationId === deviceId ? { ...item, isDeleted: true } : item)
  //         .filter(item => !item.isDeleted)
  //     )
  //   }

  //   fetcher.submit(
  //     { smartphoneId: deviceId },
  //     {
  //       method: "post",
  //       action
  //     }
  //   )
  // }


  console.log(fetcher.data)
  if (!user) {
    return (
      <Spinner spinSize="w-12 h-12" />
    )
  }
  return (
  <div className="w-full min-h-full bg-gray-800 bg-opacity-90 flex flex-col items-center py-12 px-4">
      <UserMenuNav
        tab={"likelist"}
        name={user?.name}
      />

      <div className="w-full max-w-5xl rounded-lg overflow-hidden">
          <div className="flex p-2 sm:p-8 bg-gray-900 items-center">
            <div className="text-2xl sm:text-3xl font-bold text-white flex items-center">
              {/* <span className="mr-3">👤</span> */}
              {/* <Heart className="mr-3 h-6 w-6" /> */}
              <Heart fill="#e74c3c" strokeWidth={0} className="mr-3 h-7 w-7" />
              Like List
            </div>
          </div>

          <div className="bg-gray-900 px-2 sm:px-8 sm:pb-8 w-full h-full">
            <ul className="grid grid-cols-2 sm:grid-cols-5 grid-rows-2 gap-2">
              {Array.isArray(smartphones) && smartphones.length > 0 ? 
              smartphones.map(item => (
                <li
                  key={item._id} data-id={item._id}
                  className="relative bg-white border rounded-sm flex flex-col w-full cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-102"
                >
                  <Link 
                    to={`/smartphones/${item.name}-${item._id}`}
                    className="px-1 py-1 sm:px-2 sm:py-2"
                  >
                    <div className="relative">
                      <img src={`/imgs/phones/${item.image || "phone_placeholder.svg"}`} alt={item.name} className="object-cover" loading="lazy" />
                      {/* <div className="flex px-2 bg-black rounded-sm gap-1 cursor-default absolute bottom-0 m-5">
                        <img src="/eyeVector.svg" alt="views" className="" />
                      </div> */}
                    </div>
                    <div className="bg-white w-full">
                      <button className="ml-1 text-start hover:text-pink-600 cursor-pointer w-full">
                        <div className="truncate w-full">
                          {item.name}
                        </div>
                      </button>
                    </div>
                  </Link>
                  <div className="absolute right-5 top-1">
                    <KebabMenu action="/user/like-list" deviceId={item._id} />
                  </div>
                </li>
              )) : null}
            </ul>
          </div>
      </div>
    </div>
  );
}