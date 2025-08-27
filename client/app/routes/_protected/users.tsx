import { UsersRound } from "lucide-react";
import { redirect, useLoaderData, type ActionFunctionArgs, type MetaFunction } from "react-router";
import UserMenuNav from "~/components/userMenuNav";
import Unauthorized from "../unauthorized";
import { ProtectedRoute } from "~/components/protectedRoute";
import type { Route } from "./+types/users";
import { usePopupButton } from "~/context/popupButtonContext";
import UserManagementDashoard from "~/components/dashboard/usersManagement/userManagementDashboard";
import { Spinner } from "~/components/spinner";
import { useUser } from "~/context/userContext";
import UserService from "~/services/user.service";
import UsersService from "~/services/users.service";
import { commitSession, destroySession, getSession } from "~/session/sessions.server";
import { isTokenValid } from "~/utils/tokenValidator";
import authService from "~/services/auth.service";

export function meta({}: MetaFunction) {
  return [
    { title: "Users - WePhoneSpec" },
    { name: "description", content: "View and manage the users." },
  ];
}

export async function action({
  request,
}: ActionFunctionArgs) {
  const currentUrl = new URL(request.url).pathname
  const session = await getSession(request.headers.get("Cookie"))
  let accessToken = session.get("accessToken")
  let refreshToken = session.get("refreshToken")
  let formData = await request.formData();
  const deleteId = formData.get("deleteUser") as string
  const rawData = formData.get("userFormData") as string

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

  const userService = new UserService(accessToken)
  
  if(deleteId) {
    const deleteResult = await userService.deleteUser(deleteId)
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

    const updateResult = await userService.updatetUser(body, id)
  }

  return redirect(`${currentUrl}`, {
    headers: {
    "Set-Cookie": await commitSession(session)
    }
  })
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  let accessToken = session.get("accessToken")
  if(accessToken && !isTokenValid(accessToken)) return
  const usersService = new UsersService(accessToken)
  try {
    const response = await usersService.getUsers()

    const users = response?.data
    return  users
  } catch (error) {
    console.error(error)
  } 
}

export default function Users() {
  const { user } = useUser()
  const users = useLoaderData<typeof loader>()
  // const { user, isLoading, error } = useAuth()
  const { setPopupButton } = usePopupButton()
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
      <div className="min-h-screen bg-gray-800 bg-opacity-90 flex flex-col items-center py-12 sm:px-15">
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