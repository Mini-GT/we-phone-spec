import { Smartphone, User } from "lucide-react";
import { useLoaderData, type ActionFunctionArgs, type ClientActionFunctionArgs, type ClientLoaderFunctionArgs, type LoaderFunctionArgs, type MetaFunction } from "react-router";
import { requireAuthCookie } from "~/utils/auth";
import { ProtectedRoute } from "~/components/protectedRoute";
import ManagementDashoard from "~/components/dashboard/usersManagement/userManagementDashboard";
import { useSmartphone } from "~/context/smartphoneContext";
import DevicePagination from "~/components/dashboard/deviceManagement.tsx/deviceManagementDashboard";
import smartphoneService from "~/services/smartphone.service";
import UserMenuNav from "~/components/userMenuNav";
import { useAuth } from "~/context/authContext";
import Unauthorized from "../unauthorized";
import DeviceManagementDashboard from "~/components/dashboard/deviceManagement.tsx/deviceManagementDashboard";
import type { Route } from "./+types/devices";
import { useEffect } from "react";
import { Spinner } from "~/components/spinner";

export function meta({}: MetaFunction) {
  return [
    { title: "Devices - WePhoneSpec" },
    { name: "description", content: "View and manage the devices." },
  ];
}

export async function action({
  request,
}: Route.ClientActionArgs) {
  let formData = await request.formData();
  const id = formData.get("action") as string;
  console.log(id)
  let device = await smartphoneService.getSmartphoneById(id)
  // console.log(JSON.stringify(device, null, 2));
  return device;
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = await requireAuthCookie(request)
}

export async function clientLoader({request}: ClientLoaderFunctionArgs) {
  // const token = await requireAuthCookie(request);
  try {
    const response = await smartphoneService.getSmartphones()
    if (!response || !response.data) {
      throw new Error("Failed to fetch users");
    }

    const devices = response.data.phones
    return devices;
  } catch (error) {
    console.error(error)
  }
}

// export function HydrateFallback() {
//   return <div>Loading...</div>;
// }

export default function Devices({
  actionData
}: Route.ComponentProps) {
  const devices = useLoaderData<typeof clientLoader>()
  const { setSmartphoneFormData } = useSmartphone()
  const { user } = useAuth()
  // const { user, isLoading, error } = useAuth()

  useEffect(() => {
    if (actionData) {
      // exclude `id` and `image`
      const { id, image, ...formCompatible } = actionData;
      setSmartphoneFormData(formCompatible);
    }
  }, [actionData, setSmartphoneFormData]);

  if (!user) {
    return (
      <Spinner childClassName="w-12 h-12" />
    )
  }
  
  // if (error || !user) {
  //   return (
  //     <div className="min-h-screen bg-gray-800 flex items-center justify-center">
  //       <p className="text-red-400">Error loading profile. Please try again.</p>
  //     </div>
  //   )
  // }

  return (
    <ProtectedRoute requiredRoles={["ADMIN", "MODERATOR"]} fallback={<Unauthorized />}>
      <div className="min-h-screen bg-gray-800 bg-opacity-90 flex flex-col items-center py-12 px-15">
        <UserMenuNav
          tab={"devices"}
          name={user?.name}
        />

        <div className="w-full bg-gray-900 rounded-lg overflow-hidden">
          <div className="p-8">
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