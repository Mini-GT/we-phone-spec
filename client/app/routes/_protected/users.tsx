import { UsersRound } from "lucide-react";
import { useLoaderData, useMatches, type ActionFunctionArgs, type ClientActionFunctionArgs, type ClientLoaderFunctionArgs, type LoaderFunctionArgs, type MetaFunction } from "react-router";
import UserMenuNav from "~/components/userMenuNav";
import { useAuth } from "~/context/authContext";
import Unauthorized from "../unauthorized";
import { ProtectedRoute } from "~/components/protectedRoute";
import ManagementDashoard from "~/components/dashboard/usersManagement/userManagementDashboard";
import userService from "~/services/user.service";
import usersService from "~/services/users.service";
import type { Route } from "./+types/users";
import { usePopupButton } from "~/context/popupButtonContext";
import UserManagementDashoard from "~/components/dashboard/usersManagement/userManagementDashboard";
import { Spinner } from "~/components/spinner";
import authService from "~/services/auth.service";
import type { UserType } from "~/types/globals.type";
import { useEffect } from "react";
import { useUser } from "~/context/userContext";

export function meta({}: MetaFunction) {
  return [
    { title: "Users - WePhoneSpec" },
    { name: "description", content: "View and manage the users." },
  ];
}

export async function action({
  request,
}: ActionFunctionArgs) {
  const token = authService.privateRoute(request) || ""
  let formData = await request.formData();
  const deleteId = formData.get("deleteUser") as string
  const userId = formData.get("getUserById") as string
  const rawData = formData.get("userFormData") as string
  if(deleteId) {
    const deleteResult = await userService.deleteUser(token, deleteId)
  }
  if(userId) {
    const user = await userService.getUserById(token, userId)
    return user.user
  }
  if(rawData) {
    const userFormData = JSON.parse(rawData)
    const {
      id,
      createdAt,
      email,
      profileImage,
      ...body
    } = userFormData

    const updateResult = await userService.updatetUser(token, body, id)
    return updateResult.updatedUser
  }
}

export async function loader({ request }: Route.LoaderArgs) {
  // console.log("loader", request) 
  const token = authService.privateRoute(request) || ""
try {
    const response = await usersService.getUsers(token)

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
//     const response = await usersService.getUsers()

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

export default function Users({
  actionData
}: Route.ComponentProps) {
  const matches = useMatches()
  const user = matches[0].data as UserType
  const users = useLoaderData<typeof loader>()
  const { setUser } = useUser()
  // const { user, isLoading, error } = useAuth()
  const { setPopupButton } = usePopupButton()
  useEffect(() => {
    setUser(actionData)
  }, [actionData, setUser])

  function handleAddUser() {
    // Logic to add a new user
    setPopupButton(prevState => ({
      ...prevState,
      isAddUserClicked: true,
    }));
  }
  
  if (!user || !users) {
    return (
      <Spinner spinSize="w-12 h-12" />
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
                Users Management
              </div>
              {user ? <UserManagementDashoard users={users} handleAddUser={handleAddUser} /> : null}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}