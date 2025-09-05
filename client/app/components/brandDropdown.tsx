import { useState } from "react";

export default function FilterDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [ smartphones ] = useState()
  console.log(selectedBrands)
  // Toggle dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Filter brands based on search
  const filteredBrands = smartphones.filter((brand) =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle brand selection
  const toggleBrandSelection = (brand: string) => {
    setSelectedBrands((prev: string[]) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="relative inline-block w-64">
      {/* Dropdown Button */}
      <button
        className="flex items-center justify-between items-center w-full text-left border border-gray-400 px-4 py-2 rounded-md bg-white"
        onClick={toggleDropdown}
      >
        <div className="">
          <span className="font-semibold">Brand:</span> {selectedBrands.length > 0 ? selectedBrands.join(", ") : ""}
        </div>
          <img src="/imgs/downarrow.svg" alt="down arrow" className="w-2" />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-400 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Brand List */}
          <div className="p-2">
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <label key={brand} className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrandSelection(brand)}
                  />
                  <span>{brand}</span>
                </label>
              ))
            ) : (
              <p className="text-gray-500 px-3">No results found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
