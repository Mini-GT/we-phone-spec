import type { Route } from "./+types/smartphone";
import smartphoneService from "~/services/smartphone.service";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Calendar, Smartphone as SmartphoneCard, Camera, Battery, HardDrive, Cpu, Settings } from "lucide-react"; 
import DeviceSpec from "~/components/deviceSpecs";
import type { ApiResponse, Smartphone as SmartphoneType, UserType } from "~/types/globals.type";
import { useFetcher, useLoaderData, useMatches, type ActionFunctionArgs } from "react-router";
import authService from "~/services/auth.service";
import { useEffect, useState } from "react";
import userService from "~/services/user.service";
import { usePopupButton } from "~/context/popupButtonContext";
import incrementViewToSmartphone from "~/utils/viewSmartphone";

type SmartphoneIdType = {
  smartphoneId: string
}

type UserLikeResponse = ApiResponse["message"] & {
  likedSmartphoneId: SmartphoneIdType[]
}

export function meta({ data }: any) {
  const smartphone = data.smartphone
  return [
    { title: `${smartphone.name} – PhoneSpec` },
    { name: "description", content: smartphone.description }
  ];
}

export async function action({request}: ActionFunctionArgs) { 
  const token = authService.privateRoute(request) || ""
  let formData = await request.formData()
  const smartphoneLikesId = formData.get("smartphoneLikes") as SmartphoneType["_id"]
  const smartphoneViewId = formData.get("smartphoneViewId") as SmartphoneType["_id"]
  if(smartphoneViewId) {
    const res = await incrementViewToSmartphone(smartphoneViewId)
    return res
  }
  if(smartphoneLikesId) {
    if(!token) return { actionError: true, message: "Must be signed in" }
    const result = await userService.addToLikes(token, smartphoneLikesId)
    return result.message
  }
}

export async function loader({params, request}: Route.LoaderArgs) {
  const token = authService.publicRoute(request) || ""
  const data = params.smartphoneData
  const id = data?.split("-").pop()
  if(!id) throw new Error("No Id Found")
  const smartphone = await smartphoneService.getSmartphoneById(id)

  if(token) {
    const result = await userService.getUserLikes(token)
    const { likedSmartphoneId } = result.message as UserLikeResponse
    const likedIds = new Set(likedSmartphoneId.map(item => item.smartphoneId))
    // check if this smartphone is liked 
    const isLiked = likedIds.has(id) 
    return { smartphone, isLiked }
  }
  const isLiked = false
  return { smartphone, isLiked }
}

export default function Smartphone() {
  const data = useLoaderData<typeof loader>();
  const matches = useMatches()
  const user = matches[0].data as UserType
  const { isLiked }= data
  const smartphone: SmartphoneType = data.smartphone 
  const [ userLiked, setUserLiked ] = useState<boolean>(isLiked)
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
  if(!smartphone) return <div>no smartphone</div>;
  // if(isError) return <div>Error loading data</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-800">
      <div className="bg-[#061f70] text-white rounded-t-2xl p-4">
        <h1 className="text-2xl font-bold">{smartphone.name}</h1>
      </div>

      <div className="flex bg-white rounded-b-2xl shadow-md">
        <div className="p-4 flex flex-col gap-6">
          <img
            src={`/imgs/phones/${smartphone.image || "phone_placeholder.svg"}`}
            alt={smartphone.name}
            className="w-1/5 h-1/4 max-w-xs mx-auto rounded-lg"
          />

          <div className="flex justify-between flex-col gap-3 flex-1">
            <div className="space-y-3">
              <div>
                <Button className="self-start bg-[#1991ff] text-white hover:bg-[#1071cc] rounded-lg">COMPARE ▼</Button>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-1">DESCRIPTION</h2>
              </div>
              <div>
                <p className="text-lg">
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
              {/* {deviceStats.map((stat, index) => (
                <Card key={index} className="bg-gray-50 border border-gray-200 overflow-hidden hover:border-gray-400">
                  <Form 
                    method="post" 
                    action={`/smartphones/${smartphone.name}-${smartphone._id}`}
                  >
                    <button 
                      className="flex justify-between items-center w-full py-2 px-4 cursor-pointer hover:bg-gray-200"
                      value={smartphone._id}
                      name={`smartphone${stat.name}`}
                    >
                      <span className="font-medium">{stat.name}</span>
                      <span className="text-sm text-gray-500">{stat.counts?.toLocaleString()}</span>
                    </button>
                  </Form>
                </Card>
              ))} */}
            </div>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-3 min-w-[300px]">
            {specItems.map((item, index) => (
              <Card key={index} className="border hover:border-[#1991ff] hover:bg-blue-50 cursor-pointer py-0 border-gray-200">
                <CardContent className="flex items-center gap-3 py-3 px-4">
                  <div className="w-5">
                    {item.icon}
                  </div>
                  <div>
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
  );
}