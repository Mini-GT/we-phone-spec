import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import type { TableSortConfig, UserMenuProps } from '~/types/globals.type';
import _ from 'lodash';
import StatusFilter from './dashboard/usersManagement/statusFilter';
import RoleFilter from './dashboard/usersManagement/roleFilter';
import DateFilter from './dashboard/usersManagement/dateFilter';
import UsersTable from './dashboard/usersManagement/userTable';
import Pagination from './pagination';



type ManagementDashoardProps = {
  users: UserMenuProps[];
  handleAddUser: () => void;
};

const ManagementDashoard = ({
  users,
  handleAddUser
}: ManagementDashoardProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<TableSortConfig>({ key: null, direction: 'asc' });

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

  const handleSort = (key: TableSortConfig["key"]) => {
    let direction: TableSortConfig["direction"] = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      //  user.username.toLowerCase().includes(searchTerm.toLowerCase());
      // console.log(searchTerm.toLowerCase())
      const matchesRole = roleFilter === '' || user.role.toLowerCase() === roleFilter.toLowerCase();
      const matchesStatus = statusFilter === '' || (user.isVerified ? "Verified" : "Unverified") === statusFilter;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
    
    if (sortConfig.key) {
      //  console.log(filtered)
      filtered.sort((a, b) => {
        const key = sortConfig.key as keyof UserMenuProps;
        // console.log(a[key])
        const aVal = a[key] ?? '';
        const bVal = b[key] ?? '';
       
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [searchTerm, roleFilter, statusFilter, sortConfig]);

  const totalRows = filteredAndSortedUsers.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentUsers = filteredAndSortedUsers.slice(startIndex, endIndex);

  const getSortIcon = (columnKey: TableSortConfig["key"]) => {
    if (sortConfig.key !== columnKey) {
      return '↕️';
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
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
              name="user-search"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <StatusFilter
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          {/* Role Filter */}
          <RoleFilter
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
          />

          {/* Date Filter */}
          <DateFilter
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />

          <div className="flex gap-2 ml-auto">
            {/* Add User Button */}
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              onClick={handleAddUser}
            >
              <Plus className="h-4 w-4" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <UsersTable
        getStatusColor={getStatusColor}
        handleSort={handleSort}
        getSortIcon={getSortIcon}
        currentUsers={currentUsers}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Rows per page</span>
          <select
            name="select-page-row"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-700 ml-4">
            of {totalRows} rows
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-slate-700 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          <span className="px-2 text-gray-500">...</span>
          <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded">
            {totalPages}
          </button>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagementDashoard;