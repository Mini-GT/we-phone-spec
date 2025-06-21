import { User, UsersRound } from "lucide-react";
import { useLoaderData, type ClientLoaderFunctionArgs, type LoaderFunctionArgs, type MetaFunction } from "react-router";
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
import { Spinner } from "~/components/spinner";

export function meta({}: MetaFunction) {
  return [
    { title: "Users - WePhoneSpec" },
    { name: "description", content: "View and manage the users." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  // console.log("loader", request) 
  const token = await requireAuthCookie(request)
  try {
    const response = await usersService.getUsers({
      cookie: token || "",
    })

    const users = response?.data
    return  users
  } catch (error) {
    console.error(error)
  } 
}

// export async function clientLoader({request, serverLoader}: Route.ClientLoaderArgs) {
//   const serverData = await serverLoader();
//   console.log("clientloader", serverData) 
//   const token = await requireAuthCookie(request);
//   try {
//     const response = await usersService.getUsers({
//       cookie: token || "",
//     })

//     const users = response?.data
//     return  users
//   } catch (error) {
//     console.error(error)
//   }
// }

// clientLoader.hydrate = true;

// export function HydrateFallback() {
//   return <div className="h-screen">Loading.ssssssssssssssssssssssasdasda..</div>
// }

export default function Users() {
  const { user } = useAuth()
  const users = useLoaderData<typeof loader>()
  // console.log(users)
  // const { user, isLoading, error } = useAuth()
  const { setPopupButton } = usePopupButton()

  function handleAddUser() {
    // Logic to add a new user
    setPopupButton(prevState => ({
      ...prevState,
      isAddUserClicked: true,
    }));
  }
  
  if (!user) {
    return (
      <Spinner childClassName="w-12 h-12" />
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
              {user ? <UserManagementDashoard users={users} handleAddUser={handleAddUser} /> : null}
              {/* <UserManagementDashoard
                users={users}
                handleAddUser={handleAddUser}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}