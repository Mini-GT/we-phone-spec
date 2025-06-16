import { User, UsersRound } from "lucide-react";
import { useLoaderData, type LoaderFunctionArgs, type MetaFunction } from "react-router";
import Spinner from "~/components/spinner";
import UserMenuNav from "~/components/userMenuNav";
import { useAuth } from "~/context/authContext";
import { requireAuthCookie } from "~/utils/auth";
import Unauthorized from "../unauthorized";
import { ProtectedRoute } from "~/components/protectedRoute";
import ManagementDashoard from "~/components/dashboard/usersManagement/userManagementDashboard";
import userService from "~/services/user.service";
import usersService from "~/services/users.service";
import type { Route } from "./+types/users";
import { usePopupButton } from "~/context/popupButtonContext";
import UserManagementDashoard from "~/components/dashboard/usersManagement/userManagementDashboard";

export async function loader({request}: LoaderFunctionArgs) {
  const token = await requireAuthCookie(request);
  try {
    const response = await usersService.getUsers({
      cookie: token || "",
    })

    if (!response || !response.data) {
      throw new Error("Failed to fetch users");
    }

    const users = response.data
    return users;
  } catch (error) {
    console.error(error)
  }
}

// clientLoader.hydrate = true;

// export function HydrateFallback() {
//   return <Spinner />
// }

export default function Users() {
  const users = useLoaderData<typeof loader>()
  const { user, isLoading, error } = useAuth()
  const { setPopupButton } = usePopupButton()

  function handleAddUser() {
    // Logic to add a new user
    setPopupButton(prevState => ({
      ...prevState,
      isAddUserClicked: true,
    }));
  }

  if (isLoading) {
    return (
      <Spinner />
    )
  }
  
  if (error) {
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
          tab={"users"}
          name={user?.name}
        />

        <div className="w-full bg-gray-900 rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="text-3xl font-bold text-white flex items-center">
                <UsersRound fill="#3498db" strokeWidth={2} className="mr-3 w-6 h-6 text-gray-400" />
                {/* <span className="mr-3">👤</span> */}
                Users Management
              </div>
              <UserManagementDashoard
                users={users}
                handleAddUser={handleAddUser}
              />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}