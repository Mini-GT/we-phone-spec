import { ChevronDown } from "lucide-react";
import { brands } from "~/components/footer";
import _ from "lodash";

type BrandFilterProps = {
  brandFilter: string;
  setBrandFilter: (value: string) => void;
};

export default function BrandFilter({
  brandFilter,
  setBrandFilter,
}: BrandFilterProps) {
  return (
    <div className="relative">
      <select
        value={brandFilter}
        onChange={(e) => setBrandFilter(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">All Brands</option>
        {brands.map((brand) => (
          <option key={brand} value={brand.toLowerCase()}>{_.capitalize(brand)}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
    </div>
  )
}