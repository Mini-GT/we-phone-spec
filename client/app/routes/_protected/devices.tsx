import { Smartphone } from "lucide-react";
import { redirect, useLoaderData, type ActionFunctionArgs, type MetaFunction } from "react-router";
import { ProtectedRoute } from "~/components/protectedRoute";
import { useSmartphone } from "~/context/smartphoneContext";
import UserMenuNav from "~/components/userMenuNav";
import DeviceManagementDashboard from "~/components/dashboard/deviceManagement.tsx/deviceManagementDashboard";
import type { Route } from "./+types/devices";
import { useEffect } from "react";
import { Spinner } from "~/components/spinner";
import { queryKeysType } from "~/types/globals.type";
import { useUser } from "~/context/userContext";
import { QueryClient } from "@tanstack/react-query";
import { commitSession, destroySession, getSession } from "~/session/sessions.server";
import SmartphoneService from "~/services/smartphone.service";
import { isTokenValid } from "~/utils/tokenValidator";
import authService from "~/services/auth.service";

export function meta({}: MetaFunction) {
  return [
    { title: "Devices - WePhoneSpec" },
    { name: "description", content: "View and manage the devices." },
  ];
}

export async function action({
  request,
}: ActionFunctionArgs) {
  const queryClient = new QueryClient();
  const currentUrl = new URL(request.url).pathname
  const session = await getSession(request.headers.get("Cookie"))
  let refreshToken = session.get("refreshToken")
  let accessToken = session.get("accessToken")
  let formData = await request.formData();
  const deviceId = formData.get("deviceId") as string
  const deleteDeviceById= formData.get("deleteDeviceById") as string
  const raw = formData.get("deviceObj") as string

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
  
  const smartphoneService = new SmartphoneService(accessToken)

  if(deviceId) {
    let device = await smartphoneService.getSmartphoneById(deviceId)
    return device;
  }

  if(deleteDeviceById) {
    await smartphoneService.deleteSmartphone(deleteDeviceById)
  }

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
  queryClient.invalidateQueries({ queryKey: queryKeysType.smartphones})
  return redirect(`${currentUrl}`, {
    headers: {
    "Set-Cookie": await commitSession(session)
    }
  })
}

export async function loader({ request }: Route.LoaderArgs) {
  const queryClient = new QueryClient();
  const session = await getSession(request.headers.get("Cookie"))
  let accessToken = session.get("accessToken")

  if(!accessToken) {
    return redirect("/")
  }

  const smartphoneService = new SmartphoneService()
  
  const smartphones = await queryClient.fetchQuery({
    queryKey: queryKeysType.smartphones,
    queryFn: async () => await smartphoneService.getSmartphones(),
    staleTime: 5 * 60 * 1000,
  })

  return smartphones
}

export default function Devices({
  actionData
}: Route.ComponentProps) {
  const { setSmartphoneFormData } = useSmartphone()
  const { user } = useUser()
  const smartphones = useLoaderData<typeof loader>()
  const phones = smartphones?.phones

  useEffect(() => {
    if (actionData) {
      setSmartphoneFormData(actionData);
    }
  }, [actionData, setSmartphoneFormData]);

  return (
    <ProtectedRoute requiredRoles={["ADMIN", "MODERATOR"]} fallback={<Spinner spinSize="w-12 h-12" />}>
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
              {/* {devices ? <DeviceManagementDashboard items={devices} /> : null} */}
              {phones.length > 0 ? <DeviceManagementDashboard items={phones} /> : null}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}