import { phones } from 'mockData';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import TopTenSection from '~/components/topTenSection';
import type { Smartphone, TableSortConfig } from '~/types/globals.type';
import { getFirstWord } from '~/utils/getFirstWord';
import DeviceTableContent from './deviceTableContent';
import type { BrandType } from '~/components/footer';
import type { OperatingSystemType } from './operatingSystemFilter';

type DeviceManagementDashboardProps = {
  items: Smartphone[];
};

export default function DeviceManagementDashboard({
  items,
}: DeviceManagementDashboardProps) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = rowsPerPage;
  
  // Calculate total pages
  // const totalPages = Math.ceil(items.length / itemsPerPage);
  
  // Get current items
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // 
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState<BrandType | ''>('');
  const [operatingSystemFilter, setOperatingSystemFilter] = useState<OperatingSystemType | ''>('');
  const [dateFilter, setDateFilter] = useState('');
  const [sortConfig, setSortConfig] = useState<TableSortConfig>({ key: null, direction: 'asc' });

  const handleSort = (key: TableSortConfig["key"]) => {
    let direction: TableSortConfig["direction"] = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  const filteredAndSorted = useMemo(() => {
    let filtered = items.filter(device => {
      const matchesSearch = 
        device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.specs.platform.os.toLowerCase().includes(searchTerm.toLowerCase())
      // user.username.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBrand = brandFilter === '' || device.brand.toLowerCase() === brandFilter.toLowerCase();
      const matchesOS = operatingSystemFilter === '' || getFirstWord(device.specs.platform.os).toLowerCase() === operatingSystemFilter.toLowerCase();
      
      return matchesSearch && matchesBrand && matchesOS;
    });
    
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const key = sortConfig.key as keyof Smartphone;
        // console.log(a[key])
        const aVal = a[key] ?? '';
        const bVal = b[key] ?? '';
       
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });

      // -------BAD FILTER--------
      //  console.log(filtered)
      // filtered.sort((a, b) => {
      //   const key = sortConfig.key as keyof Smartphone;
      
      //   // const aVal = typeof Number(a[key]) === "number" ? Number(a[key]) : a[key];
      //   // const bVal = typeof Number(b[key]) === "number" ? Number(b[key]) : b[key];

      //   let aVal = a[key] ?? '';
      //   let bVal = b[key] ?? '';
      //   if(key === "_id") {
      //     aVal = Number(a[key]) ?? '';
      //     bVal = Number(b[key]) ?? '';
      //   }
      //   else if (typeof a[key] === "string" && typeof b[key] === "string") {
      //     aVal = a[key].toLowerCase() || '';
      //     bVal = b[key].toLowerCase() || '';
      //   }
        
      //   // console.log(aVal)
      //   if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      //   if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      //   return 0;
      // });

    }
    return filtered;
  }, [searchTerm, brandFilter, operatingSystemFilter, sortConfig, items]);

  const totalRows = filteredAndSorted.length;
  const totalPages = Math.ceil(totalRows / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDevices = filteredAndSorted.slice(startIndex, endIndex);

  const getSortIcon = (columnKey: TableSortConfig["key"]) => {
    if (sortConfig.key !== columnKey) {
      return '↕️';
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };
  return (
    <DeviceTableContent
      devices={currentDevices}
      rowsPerPage={rowsPerPage}
      totalPages={totalPages}
      setRowsPerPage={setRowsPerPage}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      handleSort={handleSort}
      getSortIcon={getSortIcon}
      totalRows={totalRows}
      setCurrentPage={setCurrentPage}
      brandFilter={brandFilter}
      setBrandFilter={setBrandFilter}
      operatingSystemFilter={operatingSystemFilter}
      setOperatingSystemFilter={setOperatingSystemFilter}
      startIndex={startIndex}
      endIndex={endIndex}
      items={items}
      currentPage={currentPage}
    />
  );
}