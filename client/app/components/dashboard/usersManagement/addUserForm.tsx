import { FormSection } from "~/components/form/formSection";
import { FormField } from "~/components/form/formField";
import { useUser } from "~/context/userContext";
import { Spinner } from "~/components/spinner";
import type { ReactNode } from "react";
import FormSelectOption from "~/components/form/formSelectOption";

type UserFormPath = 'name' | 'email' | 'role'

type AddUserFormType = {
  children: ReactNode
}

export default function AddUserForm({
  children
}: AddUserFormType) {
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
  return (
    <div className="relative rounded-xl h-[90vh] overflow-y-auto">
      <div className="relative rounded-t-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 mb-8">
        <h1 className="text-3xl font-bold text-white">User Form</h1>
        {/* <p className="text-blue-100 mt-2">Detailed</p> */}
      </div>

      <div className="bg-white shadow-x w-[30vw]">
        <div className="flex flex-col lg:flex-row">
          
          <div className="flex-1 p-8">
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
                    onChange={(val) => handleInputChange("email", val)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormSelectOption
                      label="Status"
                      option={["Verified", "Unverified", "Banned", "Pending", "Suspended"]}
                      user={user}
                      setUser={setUser}
                      selectValue={user.status}
                    />

                    <FormSelectOption 
                      label="Role"
                      option={["Admin", "Moderator", "User", "Demo"]}
                      user={user}
                      setUser={setUser}
                      selectValue={user.role}
                    />
                  </div>
                </FormSection>
                {children}
              </div> :
              <Spinner spinSize="w-12 h-12"/>
            }
          </div>
        </div>
      </div>
    </div>
  );
}