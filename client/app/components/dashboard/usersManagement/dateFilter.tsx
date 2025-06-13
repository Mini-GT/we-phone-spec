import { ChevronDown } from "lucide-react";

type DateFilterProps = {
  dateFilter: string;
  setDateFilter: (value: string) => void;
}

export default function DateFilter({
  dateFilter,
  setDateFilter,
}: DateFilterProps) {
  return (
    <div className="relative">
      <select
        name="select-date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Joined Date</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
    </div>
  )
}