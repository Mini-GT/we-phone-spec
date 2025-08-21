import type { DeviceSpecProps, SpecItem } from "~/types/globals.type";

export default function DeviceSpec({
  title,
  data
}: DeviceSpecProps) {

  function getInfo(value: SpecItem["value"]): string | boolean | undefined {
    if(Array.isArray(value)) {
      return value.length >= 1 ? value.join(", ") : "None";
    }

    if(value === "false" || value === "true") {
      return value ? "Yes" : "No";
    }
    
    return value;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-3 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-blue-900">{title}</h2>
        <div className="grid gap-4">
          {data.map((spec: SpecItem, index: number) => (
            <div key={index} className="grid grid-cols-3 text-sm lg:text-lg">
              <span className="font-bold text-nowrap text-gray-700">{spec.label}:</span>
              <span className="text-gray-900 w-full col-span-2">{getInfo(spec.value)}</span>
            </div>
          ))}
        </div>
      </div>
  )
}