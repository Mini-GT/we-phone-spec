import { ChevronDown } from "lucide-react";

type RoleFilterProps = {
  roleFilter: string;
  setRoleFilter: (value: string) => void;
};

export default function RoleFilter({
  roleFilter,
  setRoleFilter,
}: RoleFilterProps) {
  return (
    <div className="relative">
      <select
        name="select-role"
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Role</option>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
        <option value="Moderator">Moderator</option>
        {/* <option value="Guest">Guest</option> */}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
    </div>
  )
}