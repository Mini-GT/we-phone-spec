import { ProtectedRoute } from "~/components/protectedRoute";
import Unauthorized from "../unauthorized";
import { Form, redirect, useNavigation, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { Spinner } from "~/components/spinner";
import AddUserForm from "~/components/dashboard/usersManagement/addUserForm";
import { useUser } from "~/context/userContext";
import { FormField } from "~/components/form/formField";
import type { UserFormPath } from "~/types/globals.type";
import { useState } from "react";
import { getSession } from "~/session/sessions.server";
import UserService from "~/services/user.service";

export async function action({
  request,
}: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  let accessToken = session.get("accessToken")
  const userService = new UserService(accessToken)
  let formData = await request.formData();
  const stringifiedForm = formData.get("addNewUser") as string
  const { name, email, password, ...body } = JSON.parse(stringifiedForm)
  if(!name || !email || !password) return { error: "Field is required" }
  const userData = {
    name,
    email,
    password,
    ...body
  }
  const result = await userService.addNewUser(userData)
  console.log(result.details)
}

export async function loader({request}: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  let accessToken = session.get("accessToken")
  if(!accessToken) {
    return redirect("/")
  }
}

export default function AddNewUser() {
  const [ password, setPassword ] = useState("")
  const { user, setUser } = useUser()
  const handleInputChange = (path: UserFormPath, value: string | number | boolean) => {
    setUser(prev => {
      const newData = structuredClone(prev);
      const keys = path.split('.');
      let current: any = newData;
    
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    })
  } 
  const navigation = useNavigation() 
  return (
    <ProtectedRoute requiredRoles={["ADMIN", "MODERATOR"]} fallback={<Unauthorized />}>
      <div className="mx-15 my-4">
        <AddUserForm
          handleInputChange={handleInputChange}
          newInputField={
            <FormField 
              label="Password"
              value={password} 
              onChange={(val) => setPassword(val)}
            />
          }
        >
          <Form method="post" action="/user/new" className="flex justify-end">
            <button
              className="flex w-20 h-10 items-center justify-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              name="addNewUser"
              disabled={navigation.formAction === "/user/new"}
              value={JSON.stringify({ ...user, password})}
            >
              {navigation.formAction === "/user/new" ? <Spinner parentClassName="w-full h-full" spinSize="ml-1 w-5 h-5" /> : "Add"}
            </button>
          </Form>
        </AddUserForm>
      </div>
    </ProtectedRoute>
  )
}