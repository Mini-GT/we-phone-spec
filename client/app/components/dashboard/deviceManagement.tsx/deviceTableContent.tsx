import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Upload, User } from 'lucide-react';
import type { Smartphone, TableSortConfig } from '~/types/globals.type';
import _ from 'lodash';
import UsersTable from '../usersManagement/userTableLayout';
import BrandFilter from './brandFilter';
import OperatingSystemFilter from './operatingSystemFilter';
import DeviceTableLayout from './deviceTableLayout';
import { usePopupButton } from '~/context/popupButtonContext';
import PaginationComponent from '~/components/pagination/paginationComponent';
import { useSmartphone } from '~/context/smartphoneContext';
import { NavLink } from 'react-router';
import { Spinner } from '~/components/spinner';

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
  const { setPopupButton } = usePopupButton()
  const { setSmartphoneFormData } = useSmartphone()
  function handleAddDevice() {
    setSmartphoneFormData({
      _id: '',
      name: '',
      brand: '',
      views: 0,
      likes: 0,
      description: '',
      image: '',
      launch: {
        announced: '',
        released: '',
      },
      specs: {
        body: {
          dimensions: '',
          weight: '',
          build: '',
          sim: '',
          resistance: '',
        },
        display: {
          type: '',
          size: '',
          resolution: '',
          protection: '',
        },
        platform: {
          os: '',
          chipset: '',
          cpu: '',
          gpu: '',
        },
        memory: {
          cardSlot: '',
          internal: '',
        },
        camera: {
          main: {
            triple: '',
            features: '',
            video: '',
          },
          selfie: {
            single: '',
            features: '',
            video: '',
          },
        },
        sound: {
          loudspeaker: '',
          jack: '',
        },
        connection: {
          wlan: '',
          bluetooth: '',
          nfc: '',
          infraredPort: '',
          radio: '',
          USB: '',
        },
        features: {
          sensors: '',
        },
        battery: {
          type: '',
          charging: '',
        },
        misc: {
          colors: '',
          models: '',
        },
      },
    })
  }

  return (
    <div className="bg-white w-full min-h-screen border rounded-md overflow-hidden shadow-lg">
      {/* Header with filters */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex flex-wrap items-center gap-4 h-10">
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

          <div className="flex gap-2 ml-auto items-center h-full">
            {/* Add Device Button */}
            <NavLink
              to="/devices/new"
              className="flex items-center w-35 h-full text-nowrap gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              onClick={handleAddDevice}
              children={({ isPending }: { isPending: boolean }) =>
                isPending ? (
                  <Spinner parentClassName="w-full h-full" spinSize="ml-1 w-5 h-5" />
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add Device
                  </>
                )
              }
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <DeviceTableLayout
        handleSort={handleSort}
        getSortIcon={getSortIcon}
        currentDevices={devices}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <PaginationComponent
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
