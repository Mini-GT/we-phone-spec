import { useNavigate, type LoaderFunctionArgs, type MetaFunction } from "react-router";
import UserMenuNav from "~/components/userMenuNav";
import { useAuth } from "~/context/authContext";
import { requireAuthCookie } from "~/utils/auth";
import type { Route } from "../_protected/+types/notification";
import { Bell } from "lucide-react";
import { Spinner } from "~/components/spinner";

export function meta({}: MetaFunction) {
  return [
    { title: "Notification - WePhoneSpec" },
    { name: "description", content: "View and manage your notifications." },
  ];
}

export async function loader({request}: LoaderFunctionArgs) {
  const userId = await requireAuthCookie(request);
}

export default function Notification() {
  const { user } = useAuth()

  if (!user) {
    return (
      <Spinner childClassName="w-12 h-12" />
    )
  }

  return (
    <div className="min-h-screen bg-gray-800 bg-opacity-90 flex flex-col items-center py-12 px-4">
      <UserMenuNav
        tab={"notificaton"}
        name={user?.name}
      />

      <div className="w-full max-w-3xl bg-gray-900 rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-8">
            <div className="text-3xl font-bold text-white flex items-center">
              {/* <span className="mr-3">👤</span> */}
              {/* <Bell className="mr-3 h-6 w-6" /> */}
              <Bell fill="yellow" strokeWidth={0} className="mr-3 h-6 w-6" />
              Notification
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}