import { ChevronDown } from "lucide-react";

type StatusFilterProps = {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
};

export default function StatusFilter({
  statusFilter,
  setStatusFilter,
}: StatusFilterProps) {
  return (
    <div className="relative">
      <select
        name="select-status"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
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
  )
}