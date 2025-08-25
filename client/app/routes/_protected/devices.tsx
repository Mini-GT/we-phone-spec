import { Smartphone } from "lucide-react";
import { type ActionFunctionArgs, type MetaFunction } from "react-router";
import { ProtectedRoute } from "~/components/protectedRoute";
import { useSmartphone } from "~/context/smartphoneContext";
import UserMenuNav from "~/components/userMenuNav";
import Unauthorized from "../unauthorized";
import DeviceManagementDashboard from "~/components/dashboard/deviceManagement.tsx/deviceManagementDashboard";
import type { Route } from "./+types/devices";
import { useEffect } from "react";
import { Spinner } from "~/components/spinner";
import smartphoneService from "~/services/smartphone.service";
import { queryKeysType } from "~/types/globals.type";
import { useUser } from "~/context/userContext";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "~/session/sessions.server";
import SmartphoneService from "~/services/smartphone.service";

export function meta({}: MetaFunction) {
  return [
    { title: "Devices - WePhoneSpec" },
    { name: "description", content: "View and manage the devices." },
  ];
}

export async function action({
  request,
}: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  const accessToken = session.get("accessToken")
  const smartphoneService = new SmartphoneService(accessToken)
  
  let formData = await request.formData();
  const deviceId = formData.get("deviceId") as string
  const deleteDeviceById= formData.get("deleteDeviceById") as string
  if(deviceId) {
    let device = await smartphoneService.getSmartphoneById(deviceId)
    return device;
  }

  if(deleteDeviceById) {
    await smartphoneService.deleteSmartphone(deleteDeviceById)
  }

  const raw = formData.get("deviceObj") as string
  if(raw) {
    const deviceObj = JSON.parse(raw)
    const {
      _id,
      createdAt,
      updatedAt,
      __v,
      ...body
    } = deviceObj

    await smartphoneService.updateSmartphone(_id, body)
  }
}

// export async function loader({ request }: Route.LoaderArgs) {
//   try {
//     const response = await smartphoneService.getSmartphones()
//     if (!response || !response.data) {
//       throw new Error("Failed to fetch devices");
//     }

//     const devices = response.data.phones
//     return devices;
//   } catch (error) {
//     console.error(error)
//   }
// }

// export async function clientLoader({
//   serverLoader,
// }: Route.ClientLoaderArgs) {
//   const res = await smartphoneService.getSmartphones()
//   const serverData = await serverLoader();
//   // console.log(serverData)
//   return serverData;
// }

// export function HydrateFallback() {
//   return <Spinner childClassName="w-12 h-12" />
// }
// export async function clientLoader({request}: ClientLoaderFunctionArgs) {
//   // const token = await requireAuthCookie(request);
  
// }

export default function Devices({
  actionData
}: Route.ComponentProps) {
  const { setSmartphoneFormData } = useSmartphone()
  const { user } = useUser()
  const smartphoneService = new SmartphoneService()

  const { 
    data: smartphones, 
    isLoading: smartphonesIsLoading, 
    isError: smartphonesIsError, 
    error: smartphonesError 
  } = useQuery({
    queryKey: queryKeysType.smartphones,
    queryFn: () => smartphoneService.getSmartphones(),
  })

  useEffect(() => {
    if (actionData) {
      setSmartphoneFormData(actionData);
    }
  }, [actionData, setSmartphoneFormData]);

  if (smartphonesIsLoading) {
    return <Spinner spinSize="w-12" />
  }

  if (smartphonesIsError) {
    return <div>Error: {String(smartphonesError)}</div>
  }

  const devices = smartphones?.phones 
  
  return (
    <ProtectedRoute requiredRoles={["ADMIN", "MODERATOR"]} fallback={<Unauthorized />}>
      <div className="min-h-screen bg-gray-800 bg-opacity-90 flex flex-col items-center py-12 sm:px-15">
        <UserMenuNav
          tab={"devices"}
          name={user?.name}
        />

        <div className="w-full bg-gray-900 rounded-lg overflow-hidden">
          <div className="p-2 sm:p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="text-3xl font-bold text-white flex items-center">
                {/* <span className="mr-3">👤</span> */}
                {/* <Smartphone className="mr-3 h-6 w-6" /> */}
                <Smartphone fill="#d5dbdb" strokeWidth={2} className="mr-3 w-6 h-6 text-gray-400" />
                Devices
              </div>
              {devices ? <DeviceManagementDashboard items={devices} /> : null}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}