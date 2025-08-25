import { type LoaderFunctionArgs, type MetaFunction } from "react-router";
import UserMenuNav from "~/components/userMenuNav";
import { SettingsIcon } from "lucide-react";
import { Spinner } from "~/components/spinner";
import authService from "~/services/auth.service";
import { useUser } from "~/context/userContext";

export function meta({}: MetaFunction) {
  return [
    { title: "Settings - WePhoneSpec" },
    { name: "description", content: "Manage your settings." },
  ];
}

// export async function loader({request}: LoaderFunctionArgs) {
//   const userId = authService.privateRoute(request);
// }

export default function Settings() {
  const { user } = useUser()

  if (!user) {
    return (
      <Spinner spinSize="w-12 h-12" />
    )
  }

  return (
    <div className="min-h-screen bg-gray-800 bg-opacity-90 flex flex-col items-center py-12 px-4">
      <UserMenuNav
        tab={"settings"}
        name={user?.name}
      />

      <div className="w-full max-w-3xl bg-gray-900 rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-8">
            <div className="text-3xl font-bold text-white flex items-center">
              {/* <span className="mr-3">👤</span> */}
              {/* <SettingsIcon className="mr-3 h-6 w-6" /> */}
              <SettingsIcon fill="white" strokeWidth={1} className="mr-3 h-7 w-7 text-gray-400" />
              Settings
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}