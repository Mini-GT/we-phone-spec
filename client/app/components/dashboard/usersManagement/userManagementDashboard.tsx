import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import type { TableSortConfig, UserRole, UserStatus, UserType } from '~/types/globals.type';
import _ from 'lodash';
import StatusFilter from './statusFilter';
import RoleFilter from './roleFilter';
import DateFilter from './dateFilter';
import UsersTable from './userTableLayout';
import Pagination from '../../pagination';
import UsersTableLayout from './userTableLayout';
import UserTableContent from './userTableContent';



type ManagementDashoardProps = {
  users: UserType[];
  handleAddUser: () => void;
};

export default function UserManagementDashoard ({
  users
}: ManagementDashoardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | ''>('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | ''>('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<TableSortConfig>({ key: null, direction: 'asc' });

  const handleSort = (key: TableSortConfig["key"]) => {
    let direction: TableSortConfig["direction"] = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => {

      // filter base on search, role, and status
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      //  user.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === '' || user.role.toLowerCase() === roleFilter.toLowerCase();
      const matchesStatus = statusFilter === '' || user.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesRole && matchesStatus;
    });
    
    // filter by configuration key *hover for types*
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const key = sortConfig.key as keyof UserType;
        const aVal = a[key] ?? '';
        const bVal = b[key] ?? '';
      
        // sort by direction if asc or desc
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [searchTerm, roleFilter, statusFilter, sortConfig, users]);

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
    <UserTableContent
      filteredUsers={currentUsers}
      rowsPerPage={rowsPerPage}
      totalPages={totalPages}
      setRowsPerPage={setRowsPerPage}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      handleSort={handleSort}
      getSortIcon={getSortIcon}
      totalRows={totalRows}
      setCurrentPage={setCurrentPage}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      roleFilter={roleFilter}
      setRoleFilter={setRoleFilter}
      dateFilter={dateFilter}
      setDateFilter={setDateFilter}
      startIndex={startIndex}
      endIndex={endIndex}
      users={users}
      currentPage={currentPage}
    />
  );
};