import AddDeviceForm from "~/components/dashboard/deviceManagement.tsx/addDeviceForm";
import { ProtectedRoute } from "~/components/protectedRoute";
import Unauthorized from "../unauthorized";
import { useSmartphone } from "~/context/smartphoneContext";
import { Form, useNavigation, type ActionFunctionArgs } from "react-router";
import smartphoneService from "~/services/smartphone.service";
import { Spinner } from "~/components/spinner";
import authService from "~/services/auth.service";
import { getSession } from "~/session/sessions.server";
import SmartphoneService from "~/services/smartphone.service";

export async function action({
  request,
}: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  let accessToken = session.get("accessToken")
  const smartphoneService = new SmartphoneService(accessToken)
  let formData = await request.formData();
  const stringifiedForm = formData.get("addNewDevice") as string
  const {_id, ...formBody}= JSON.parse(stringifiedForm)
  
  const response = await smartphoneService.createSmartphone(formBody)
  console.log(response.result)
}

export default function AddNewDevice() {
  const navigation = useNavigation() 
  const { smartphoneFormData } = useSmartphone()
  return (
    <ProtectedRoute requiredRoles={["ADMIN", "MODERATOR"]} fallback={<Unauthorized />}>
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