import type { DeviceSpecProps, SpecItem } from "~/types/globals.type";

export default function DeviceSpec({
  title,
  data
}: DeviceSpecProps) {

  function getInfo(value: SpecItem["value"]): string | undefined {
    if(Array.isArray(value)) {
      return value.length >= 1 ? value.join(", ") : "None";
    }

    if(typeof value === "boolean") {
      return value ? "Yes" : "No";
    }
    
    return value;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-blue-900">{title}</h2>
        <div className="grid gap-4">
          {data.map((spec: SpecItem, index: number) => (
            <div key={index} className="flex">
              <span className="font-semibold text-nowrap text-gray-700">{spec.label}:</span>
              <span className="text-gray-900 w-full ml-4">{getInfo(spec.value)}</span>
            </div>
          ))}
        </div>
      </div>
  )
}