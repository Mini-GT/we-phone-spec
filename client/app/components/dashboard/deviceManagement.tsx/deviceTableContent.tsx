import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Upload, User } from 'lucide-react';
import type { Smartphone, TableSortConfig, UserMenuProps } from '~/types/globals.type';
import _ from 'lodash';
import UsersTable from '../usersManagement/userTable';
import DeviceTable from './deviceTable';
import BrandFilter from './brandFilter';
import OperatingSystemFilter from './operatingSystemFilter';
import DevicePagination from './devicePagination';
import DeviceTableLayout from './deviceTable';

type DeviceTableContentProps = {
  devices: Smartphone[];
  rowsPerPage: number;
  totalPages: number;
  setRowsPerPage: (rows: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSort: (sortType: TableSortConfig["key"]) => void;
  getSortIcon: (iconType: TableSortConfig["key"]) => React.ReactNode;
  totalRows: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  brandFilter: string;
  setBrandFilter: (brand: string) => void;
  operatingSystemFilter: string;
  setOperatingSystemFilter: (os: string) => void;
  startIndex: number;
  endIndex: number;
  items: Smartphone[];
};

export default function DeviceTableContent({
  devices,
  rowsPerPage,
  totalPages,
  setRowsPerPage,
  searchTerm,
  setSearchTerm,
  handleSort,
  getSortIcon,
  totalRows,
  currentPage,
  setCurrentPage,
  brandFilter,
  setBrandFilter,
  operatingSystemFilter,
  setOperatingSystemFilter,
  startIndex,
  endIndex,
  items
}: DeviceTableContentProps) {
  function handleDevice() {
    console.log("add")
  }

  return (
    <div className="bg-white w-full min-h-screen border rounded-md overflow-hidden shadow-lg">
      {/* Header with filters */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              name="device-search"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Brand Filter */}
          <BrandFilter
            brandFilter={brandFilter}
            setBrandFilter={setBrandFilter}
          />

          {/* Operating System Filter */}
          <OperatingSystemFilter
            operatingSystemFilter={operatingSystemFilter}
            setOperatingSystemFilter={setOperatingSystemFilter}
          />

          {/* Date Filter */}
          {/* <DateFilter
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          /> */}

          <div className="flex gap-2 ml-auto">
            {/* Add User Button */}
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              onClick={handleDevice}
            >
              <Plus className="h-4 w-4" />
              Add Device
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <DeviceTableLayout
        handleSort={handleSort}
        getSortIcon={getSortIcon}
        currentDevices={devices}
      />
      {/* <UsersTable

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <DevicePagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          items={items}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalRows={totalRows}
        />
      </div>
    </div>
  );
};
