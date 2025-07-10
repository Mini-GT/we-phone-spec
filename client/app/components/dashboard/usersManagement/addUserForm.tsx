import { FormSection } from "~/components/form/formSection";
import { FormField } from "~/components/form/formField";
import { useUser } from "~/context/userContext";
import { Spinner } from "~/components/spinner";
import type { ReactNode } from "react";
import FormSelectOption from "~/components/form/formSelectOption";
import type { UserFormPath } from "~/types/globals.type";


type AddUserFormType = {
  children: ReactNode
  newInputField?: ReactNode
  handleInputChange: (path: UserFormPath, value: string | number | boolean) => void
}

export default function AddUserForm({
  children,
  newInputField,
  handleInputChange
}: AddUserFormType) {
  const { user, setUser } = useUser()
  return (
    <div className="flex flex-col justify-start items-center relative rounded-xl overflow-y-auto">
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-[60vw] rounded-t-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">User Form</h1>
        </div>

        <div className="flex flex-col items-center border rounded-b-xl w-full py-8">
          <div className="bg-white shadow-x w-[30vw]">
            <div className="flex flex-col lg:flex-row">
              
              <div className="flex flex-col flex-1">
                {user ?
                  <div className="space-y-6">
                    <FormSection title="User Information">
                      <FormField 
                        label="Full Name"
                        value={user.name}
                        onChange={(val) => handleInputChange("name", val)}
                      />
                      <FormField 
                        label="Email"
                        value={user.email}
                        readOnly={user.email ? true : false}
                        onChange={(val) => handleInputChange("email", val)}
                      />
                      {newInputField}
                      <div className="grid grid-cols-2 gap-4">
                        <FormSelectOption
                          label="Status"
                          field="status"
                          option={["Verified", "Unverified", "Banned", "Pending", "Suspended"]}
                          user={user}
                          setUser={setUser}
                          selectValue={user.status}
                        />
                        
                        <FormSelectOption 
                          label="Role"
                          field="role"
                          option={["Admin", "Moderator", "User", "Demo"]}
                          user={user}
                          setUser={setUser}
                          selectValue={user.role}
                        />
                      </div>
                    </FormSection>
                    {children}
                  </div> :
                  <Spinner parentClassName="" spinSize="w-12 h-12"/>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}