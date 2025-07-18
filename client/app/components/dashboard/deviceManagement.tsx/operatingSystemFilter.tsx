import { ChevronDown } from "lucide-react";

type OperatingSystemFilterProps = {
  operatingSystemFilter: OperatingSystemType | "";
  setOperatingSystemFilter: (value: OperatingSystemType) => void;
};

const operatingSystems = [
  "Android",
  "iOS",
  "HarmonyOS",
  "KaiOS",
  "LineageOS",
] as const;

export type OperatingSystemType = typeof operatingSystems[number]

export default function OperatingSystemFilter({
  operatingSystemFilter,
  setOperatingSystemFilter,
}: OperatingSystemFilterProps) {
  return (
    <div className="relative">
      <select
        name="select-operating-system"
        value={operatingSystemFilter}
        onChange={(e) => setOperatingSystemFilter(e.target.value as OperatingSystemType)}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">OS</option>
        {operatingSystems.map((operatingSystem) => (
          <option key={operatingSystem} value={operatingSystem.toLowerCase()}>{operatingSystem}</option>
        ))}
        {/* <option value="Guest">Guest</option> */}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
    </div>
  )
}