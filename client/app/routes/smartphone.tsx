import type { Route } from "./+types/smartphone";
import { Card, CardContent } from "../components/ui/card";
import { Calendar, Smartphone as SmartphoneCard, Camera, Battery, HardDrive, Cpu, Settings } from "lucide-react"; 
import DeviceSpec from "~/components/deviceSpecs";
import { queryKeysType, type ApiResponse, type Smartphone, type SmartphoneCommentsDataType, type SmartphoneCommentType, type Smartphone as SmartphoneType } from "~/types/globals.type";
import { redirect, ScrollRestoration, useFetcher, useLoaderData, type ActionFunctionArgs } from "react-router";
import { useEffect, useState } from "react";
import { usePopupButton } from "~/context/popupButtonContext";
import incrementViewToSmartphone from "~/utils/viewSmartphone";
import CommentsSection from "~/components/commentSection";
import { QueryClient } from "@tanstack/react-query";
import { useUser } from "~/context/userContext";
import { destroySession, getSession } from "~/session/sessions.server";
import UserService from "~/services/user.service";
import SmartphoneService from "~/services/smartphone.service";
import CommentsService from "~/services/comment.service";
import { isTokenValid } from "~/utils/tokenValidator";
import authService from "~/services/auth.service";
import NotFound from "./notFound";

type SmartphoneIdType = {
  smartphoneId: string
}

type UserLikeResponse = ApiResponse["message"] & {
  likedSmartphoneId: SmartphoneIdType[]
}

export function meta({ data }: any) {
  const smartphone = data.smartphone
  let titleData = smartphone.name
  if(smartphone === "No Device found") titleData = "Not Found"
  return [
    { title: `${titleData} – PhoneSpec` },
    { name: "description", content: smartphone.description }
  ];
}

export async function loader({params, request}: Route.LoaderArgs) {
  const queryClient = new QueryClient();
  const session = await getSession(request.headers.get("Cookie"))
  const accessToken = session.get("accessToken")
  let smartphone = null
  let isLiked = null

  if(accessToken && !isTokenValid(accessToken)) return { smartphone, isLiked }
  const userService = new UserService(accessToken)
  const smartphoneService = new SmartphoneService(accessToken)

  // const url = new URL(request.url)
  const data = params.smartphoneData
  const id = data?.split("-").pop()
  if(!id) throw new Error("No Id Found")

  smartphone = await queryClient.fetchQuery({
    queryKey: queryKeysType.smartphone(id),
    queryFn: async () => await smartphoneService.getSmartphoneById(id),
    staleTime: 5 * 60 * 1000,
  })
  
  if(accessToken) {
    const result = await userService.getUserLikes()
    const { likedSmartphoneId } = result.message as UserLikeResponse
    const likedIds = new Set(likedSmartphoneId?.map(item => item.smartphoneId))
    // check if this smartphone is liked 
    const isLiked = likedIds.has(id) 
    return { smartphone, isLiked }
  }
  isLiked = false
  return { smartphone, isLiked }
}

export async function action({request}: ActionFunctionArgs) { 
  const currentUrl = new URL(request.url).pathname
  const session = await getSession(request.headers.get("Cookie"))
  let accessToken = session.get("accessToken")
  let refreshToken = session.get("refreshToken")

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
  const commentService = new CommentsService(accessToken)
  let formData = await request.formData()
  const smartphoneLikesId = formData.get("smartphoneLikes") as SmartphoneType["_id"]
  const smartphoneViewId = formData.get("smartphoneViewId") as SmartphoneType["_id"]
  const deleteCommentId = formData.get("deleteCommentId") as string
  const newComment = formData.get("newComment") as string
  const parsedNewComment = JSON.parse(newComment) as SmartphoneCommentType
  const initialCommentsData = formData.get("initialCommentsData") as string
  const viewMoreCommentsData = formData.get("viewMoreCommentsData") as string
  const parsedInitialCommentsData = JSON.parse(initialCommentsData) as SmartphoneCommentsDataType
  const parsedViewMoreCommentsData = JSON.parse(viewMoreCommentsData) as SmartphoneCommentsDataType
  if(parsedNewComment?.userId) {
    const result = await commentService.addNewCommet(parsedNewComment)
    return 
  }
  
  if(deleteCommentId) {
    await commentService.deleteComment(deleteCommentId)
  }
  
  if(parsedInitialCommentsData?.smartphoneId) {
    const { comments } = await commentService.getSmartphoneComments(
      parsedInitialCommentsData.smartphoneId, 
      parsedInitialCommentsData.skip, 
      parsedInitialCommentsData.take, 
      parsedInitialCommentsData.orderBy, 
      parsedInitialCommentsData.sortDirection,
    )
    return comments 
  }

  if(parsedViewMoreCommentsData?.smartphoneId) {
    const { comments } = await commentService.getSmartphoneComments(
      parsedViewMoreCommentsData.smartphoneId, 
      parsedViewMoreCommentsData.skip, 
      parsedViewMoreCommentsData.take, 
      parsedViewMoreCommentsData.orderBy, 
      parsedViewMoreCommentsData.sortDirection,
    )
    return comments 
  }

  if(smartphoneViewId) {
    const res = await incrementViewToSmartphone(smartphoneViewId)
    return res
  }

  if(smartphoneLikesId) {
    // if(!token) return { actionError: true, message: "Must be signed in" }
    const result = await userService.addToLikes(smartphoneLikesId)
    return result.message
  }
}

export default function Smartphone() {
  const { smartphone, isLiked } = useLoaderData<typeof loader>()
  const { user } = useUser()
  const [ userLiked, setUserLiked ] = useState<boolean | null>(isLiked)
  const [ userLikesCount, setUserLikesCount ] = useState<number>(smartphone.likes)
  const { setPopupButton } = usePopupButton()
  const fetcher = useFetcher()

  useEffect(() => {
    if(!user) return
    setUserLiked(isLiked)
  }, [isLiked, user])

  const handleLikeBtn = () => {
    if(!user) {
      setPopupButton(prevState => ({
        ...prevState,
        isLoginClicked: !prevState.isLoginClicked,
      }))
      return
    }
    const newUserLike = !userLiked
    setUserLiked(newUserLike)
    setUserLikesCount(prevLikeCount => newUserLike ? prevLikeCount + 1 : prevLikeCount - 1)

    fetcher.submit(
      { smartphoneLikes: smartphone._id },
      { 
        method: "post", 
        action: `/smartphones/${smartphone.name}-${smartphone._id}` 
      }
    )
  }

  if(smartphone === "No Device found") return <NotFound details="" message="" />;
    
  const specItems = [
    { icon: <Calendar className="w-5 h-5 text-blue-500" />, label: "Released", value: smartphone?.launch.released },
    { icon: <SmartphoneCard className="w-5 h-5 text-blue-500" />, label: "Display", value: `${smartphone?.specs.display.size}\n${smartphone?.specs.display.resolution}` },
    { icon: <Camera className="w-5 h-5 text-blue-500" />, label: "Camera", value: ` Main: ${smartphone?.specs.camera.main.triple}\nSelfie: ${smartphone?.specs.camera.selfie.single}` },
    { icon: <Battery className="w-5 h-5 text-blue-500" />, label: "Battery", value: smartphone?.specs.battery.type },
    { icon: <HardDrive className="w-5 h-5 text-blue-500" />, label: "Storage", value: smartphone?.specs.memory.internal },
    { icon: <Cpu className="w-5 h-5 text-blue-500" />, label: "Hardware", value: smartphone?.specs.platform.chipset },
    { icon: <Settings className="w-5 h-5 text-blue-500" />, label: "OS", value: smartphone?.specs.platform.os },
  ];

  const sections = [
    {
      title: "Body",
      data: [
        { label: "Dimensions", value: smartphone?.specs.body.dimensions },
        { label: "Weight", value: smartphone?.specs.body.weight },
        { label: "Build", value: smartphone?.specs.body.build },
        { label: "SIM", value: smartphone?.specs.body.sim },
        { label: "Resistance", value: smartphone?.specs.body.resistance },
      ],
    },
    {
      title: "Display",
      data: [
        { label: "Type", value: smartphone?.specs.display.type },
        { label: "Size", value: smartphone?.specs.display.size },
        { label: "Resolution", value: smartphone?.specs.display.resolution },
        { label: "Protection", value: smartphone?.specs.display.protection },
      ],
    },
    {
      title: "Platform",
      data: [
        { label: "OS", value: smartphone?.specs.platform.os },
        { label: "Chipset", value: smartphone?.specs.platform.chipset },
        { label: "CPU", value: smartphone?.specs.platform.cpu },
        { label: "GPU", value: smartphone?.specs.platform.gpu },
      ],
    },
    {
      title: "Memory",
      data: [
        { label: "Card Slot", value: smartphone?.specs.memory.cardSlot },
        { label: "Internal", value: smartphone?.specs.memory.internal },
      ],
    },
    {
      title: "Main Camera",
      data: [
        { label: "Triple", value: smartphone?.specs.camera.main.triple },
        { label: "Features", value: smartphone?.specs.camera.main.features },
        { label: "Video", value: smartphone?.specs.camera.main.video },
      ],
    },
    {
      title: "Selfie Camera",
      data: [
        { label: "Single", value: smartphone?.specs.camera.selfie.single },
        { label: "Features", value: smartphone?.specs.camera.selfie.features },
        { label: "Video", value: smartphone?.specs.camera.selfie.video },
      ],
    },
    {
      title: "Sound",
      data: [
        { label: "Loudspeaker", value: smartphone?.specs.sound.loudspeaker },
        { label: "3.5mm Jack", value: smartphone?.specs.sound.jack},
      ],
    },
    {
      title: "Connection",
      data: [
        { label: "WLAN", value: smartphone?.specs.connection.wlan },
        { label: "Bluetooth", value: smartphone?.specs.connection.bluetooth },
        { label: "NFC", value: smartphone?.specs.connection.nfc },
        { label: "Infrared Port", value: smartphone?.specs.connection.infraredPort },
        { label: "Radio", value: smartphone?.specs.connection.radio },
        { label: "USB", value: smartphone?.specs.connection.USB },
      ],
    },
    {
      title: "Features",
      data: [
        { label: "Sensors", value: smartphone?.specs.features.sensors },
      ],
    },
    {
      title: "Battery",
      data: [
        { label: "Type", value: smartphone?.specs.battery.type },
        { label: "Charging", value: smartphone?.specs.battery.charging },
      ],
    },
    {
      title: "Misc",
      data: [
        { label: "Colors", value: smartphone?.specs.misc.colors },
        { label: "Models", value: smartphone?.specs.misc.models },
      ],
    },
  ];

  // if(isLoading) return <div>Fetching data...</div>;
  // if(isError) return <div>Error loading data</div>;
  return (
    <>
      <div className="max-w-5xl mx-auto p-1 text-gray-800">
        <div className="bg-[#061f70] text-white rounded-t-2xl p-4">
          <h1 className="text-2xl font-bold">{smartphone.name}</h1>
        </div>

        <div className="flex flex-col lg:flex-row bg-white rounded-b-2xl shadow-md">
          <div className="p-3 flex flex-col gap-6">
            <img
              src={`/imgs/phones/${smartphone.image || "phone_placeholder.svg"}`}
              alt={smartphone.name}
              className="w-2/5 sm:w-1/5 lg:w-1/3 mx-auto rounded-md"
            />

            <div className="flex flex-col justify-end gap-3 md:gap-20 flex-1">
              <div className="space-y-3">
                {/* <div>
                  <Button className="self-start bg-[#1991ff] text-white hover:bg-[#1071cc] rounded-lg">COMPARE ▼</Button>
                </div> */}
                <div>
                  <h2 className="text-lg font-semibold mb-1">DESCRIPTION</h2>
                </div>
                <div>
                  <p className="text-md lg:text-lg">
                    {smartphone.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div
                  className="border rounded-md overflow-hidden"
                >
                  <button 
                    className="flex justify-between items-center w-full py-2 px-4 bg-gray-200 hover:bg-gray-300"
                    value={smartphone._id}
                    name={`smartphoneViews`}
                  >
                    <span className="font-medium">Views</span>
                    <span className="text-sm">{smartphone.views.toLocaleString()}</span>
                  </button>
                </div>

                <div
                  className="border rounded-md overflow-hidden"
                >
                  <button 
                    className={`flex justify-between items-center w-full py-2 px-4 cursor-pointer ${userLiked ? "bg-[#1991ff] hover:bg-[#1071cc]/90 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                    // value={smartphone._id}
                    // name={`smartphoneLikes`}
                    onClick={handleLikeBtn}
                  >
                    <span className="font-medium">{userLiked ? "You Liked" : "Likes" }</span>
                    <span className="text-sm">{userLikesCount.toLocaleString()}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 flex flex-col justify-end gap-3 min-w-[300px]">
            {specItems.map((item, index) => (
              <Card key={index} className="border hover:border-[#1991ff] hover:bg-blue-50 cursor-pointer py-0 border-gray-200">
                <CardContent className="flex items-center gap-3 py-3 px-4">
                  <div className="w-5">
                    {item.icon}
                  </div>
                  <div className="grid w-full">
                    <div className="text-sm text-gray-500 font-semibold">{item.label}</div>
                    <div className="text-sm whitespace-pre-line">{item.value}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {sections.map((section, index) => {
          return (
            <DeviceSpec 
              key={index}
              title={section.title}
              data={section.data}
            />
          )
        })}
      </div>
      <CommentsSection smartphoneId={smartphone._id} />
    </>
  );
}