import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Upload, User } from 'lucide-react';
import type { Smartphone, TableSortConfig, UserMenuProps } from '~/types/globals.type';
import _ from 'lodash';
import UsersTable from '../usersManagement/userTable';
import DeviceTable from './deviceTable';
import BrandFilter from './brandFilter';
import OperatingSystemFilter from './operatingSystemFilter';

type ManagementDashoardProps = {
  devices: Smartphone[];
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSort: (sortType: TableSortConfig["key"]) => void;
  getSortIcon: (iconType: TableSortConfig["key"]) => React.ReactNode;
  totalRows: number;
  setCurrentPage: (page: number) => void;
  brandFilter: string;
  setBrandFilter: (brand: string) => void;
  operatingSystemFilter: string;
  setOperatingSystemFilter: (os: string) => void;
};

const DeviceManagementDashboard = ({
  devices,
  rowsPerPage,
  setRowsPerPage,
  searchTerm,
  setSearchTerm,
  handleSort,
  getSortIcon,
  totalRows,
  setCurrentPage,
  brandFilter,
  setBrandFilter,
  operatingSystemFilter,
  setOperatingSystemFilter
}: ManagementDashoardProps) => {
  const getStatusColor = (status: boolean) => {
    switch (status) {
      case true: return 'bg-green-100 text-green-800';
      // case 'inactive': return 'bg-gray-100 text-gray-800';
      case false: return 'bg-red-100 text-red-800';
      // case 'pending': return 'bg-blue-100 text-blue-800';
      // case 'suspended': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white w-full min-h-screen border rounded-md overflow-hidden shadow-lg">
      {/* Header with filters */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
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
              // onClick={handleAddUser}
            >
              <Plus className="h-4 w-4" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <DeviceTable
        getStatusColor={getStatusColor}
        handleSort={handleSort}
        getSortIcon={getSortIcon}
        currentDevices={devices}
      />
      {/* <UsersTable

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Rows per page</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-700 ml-4">
            of {totalRows} rows
          </span>
        </div>


      </div>
    </div>
  );
};

export default DeviceManagementDashboard;
