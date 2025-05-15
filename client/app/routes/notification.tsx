import UserMenuNav from "~/components/userMenuNav";
import { useAuth } from "~/context/authContext";

export default function Notification() {
  const { user } = useAuth()

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
              <span className="mr-3">👤</span>
              Notification
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}