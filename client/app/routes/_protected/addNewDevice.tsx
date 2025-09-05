import AddDeviceForm from "~/components/dashboard/deviceManagement.tsx/addDeviceForm";
import { ProtectedRoute } from "~/components/protectedRoute";
import { useSmartphone } from "~/context/smartphoneContext";
import { Form, redirect, useLocation, useNavigation, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { Spinner } from "~/components/spinner";
import authService from "~/services/auth.service";
import { commitSession, destroySession, getSession } from "~/session/sessions.server";
import SmartphoneService from "~/services/smartphone.service";
import { isTokenValid } from "~/utils/tokenValidator";
import { useEffect } from "react";

export async function action({
  request,
}: ActionFunctionArgs) {
  const currentUrl = new URL(request.url).pathname
  const session = await getSession(request.headers.get("Cookie"))
  let accessToken = session.get("accessToken")
  let refreshToken = session.get("refreshToken")
  let formData = await request.formData();
  const stringifiedForm = formData.get("addNewDevice") as string
  const {_id, ...formBody}= JSON.parse(stringifiedForm)

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

  const smartphoneService = new SmartphoneService(accessToken)

  if (formBody?.name !== "") {
    const response = await smartphoneService.createSmartphone(formBody)
  }

  return redirect(`${currentUrl}`, {
    headers: {
    "Set-Cookie": await commitSession(session)
    }
  })
}

export async function loader({request}: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  let accessToken = session.get("accessToken")
  if(!accessToken) {
    return redirect("/")
  }
}

export default function AddNewDevice() {
  const navigation = useNavigation() 
  const { key } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [key])
  const { smartphoneFormData } = useSmartphone()
  return (
    <ProtectedRoute requiredRoles={["ADMIN", "MODERATOR"]} fallback={<Spinner spinSize="w-12" />}>
      <div className="mx-15 my-4">
        <AddDeviceForm 
          style="flex flex-col items-center justify-center" 
        >
          <Form method="post" action="/devices/new" className="flex justify-end">
            <button
              className="flex w-20 h-10 items-center justify-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              name="addNewDevice"
              disabled={navigation.formAction === "/devices/new"}
              value={JSON.stringify(smartphoneFormData)}
            >
              {navigation.formAction === "/devices/new" ? <Spinner parentClassName="w-full h-full" spinSize="ml-1 w-5 h-5" /> : "Add"}
            </button>
          </Form>
        </AddDeviceForm>
      </div>
    </ProtectedRoute>
  )
}