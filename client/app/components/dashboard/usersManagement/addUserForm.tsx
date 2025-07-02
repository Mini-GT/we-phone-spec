import { Form } from "react-router";
import { FormSection } from "~/components/form/formSection";
import { FormField } from "~/components/form/formField";
import { useUser } from "~/context/userContext";
import { Spinner } from "~/components/spinner";
import { ChevronDown } from "lucide-react";
import type { UserStatus } from "~/types/globals.type";
import type { ReactNode } from "react";

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
    <div className="relative rounded-xl h-[90vh] overflow-y-scroll">
      <div className="relative rounded-t-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 mb-8">
        <h1 className="text-3xl font-bold text-white">User Form</h1>
        {/* <p className="text-blue-100 mt-2">Detailed</p> */}
      </div>

      <div className="bg-white shadow-x w-[60vw]">
        <div className="flex flex-col lg:flex-row">
          
          <div className="flex-1 p-8">
            {user ?
              <div className="space-y-6">
                {/* <div>
                  <label htmlFor="username">Username:</label>
                  <input type="text" id="username" name="username" required />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <button type="submit">Add User</button> */}
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
                  {/* <FormField 
                    label="Status"
                    value={user.isVerified ? "Verified" : "Unverified"}
                    onChange={(val) => handleInputChange("isVerified", val)}
                  /> */}
                  <div className="relative">
                    <select
                      name="select-status"
                      value={user.status}
                      onChange={(e) => setUser({
                        ...user, 
                        status: e.target.value as UserStatus
                      })}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Status</option>
                      <option value="Verified">Verified</option>
                      <option value="Unverified">Unverified</option>
                      <option value="Banned">Banned</option>
                      <option value="Pending">Pending</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                  </div>
                  <FormField 
                    label="Role"
                    value={user.role}
                    onChange={(val) => handleInputChange("role", val)}
                  />
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