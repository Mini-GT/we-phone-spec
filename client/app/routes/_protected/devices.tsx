import { Smartphone, User } from "lucide-react";
import { useLoaderData, type LoaderFunctionArgs, type MetaFunction } from "react-router";
import Spinner from "~/components/spinner";
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

export function meta({}: MetaFunction) {
  return [
    { title: "Devices - WePhoneSpec" },
    { name: "description", content: "View and manage the devices." },
  ];
}

export async function loader({request}: LoaderFunctionArgs) {
  const token = await requireAuthCookie(request);
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

export default function Devices() {
  const devices = useLoaderData<typeof loader>()
  const { user, isLoading, error } = useAuth()

  
  if (isLoading) {
    return (
      <Spinner />
    )
  }
  
  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <p className="text-red-400">Error loading profile. Please try again.</p>
      </div>
    )
  }

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
              <DeviceManagementDashboard
                items={devices}
              />
            </div>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}