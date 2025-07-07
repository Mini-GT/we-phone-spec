import { ChevronDown } from "lucide-react";
import type { UserStatus, UserType } from "~/types/globals.type";

type FormSelectOptionProps = {
  label: string
  option: string[]
  user: UserType
  setUser: (user: UserType) => void
  selectValue: string
} 

export default function FormSelectOption({ label, option, selectValue, user, setUser }: FormSelectOptionProps) {
  return (
    <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <select
        name="select-status"
        value={selectValue.toLowerCase()}
        onChange={(e) => setUser({
          ...user, 
          status: e.target.value as UserStatus
        })}
        className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {option.map(opt => (
          <option key={opt} value={opt.toLowerCase()}>{opt}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
    </div>
</div>
  )
}