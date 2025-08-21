import { Plus, Search } from "lucide-react";
import type { TableSortConfig, UserRole, UserStatus, UserType } from "~/types/globals.type";
import StatusFilter from "./statusFilter";
import RoleFilter from "./roleFilter";
import UsersTableLayout from "./userTableLayout";
import PaginationComponent from "~/components/pagination/paginationComponent";
import DateFilter from "./dateFilter";
import { NavLink } from "react-router";
import { Spinner } from "~/components/spinner";
import { useUser } from "~/context/userContext";

type UserTableContentProps = {
  filteredUsers: UserType[];
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
  statusFilter: UserStatus | '';
  setStatusFilter: (status: UserStatus) => void;
  roleFilter: UserRole | '';
  setRoleFilter: (role: UserRole) => void;
  dateFilter: string;
  setDateFilter: (date: string) => void
  startIndex: number;
  endIndex: number;
  users: UserType[];
};

export default function UserTableContent({
  filteredUsers,
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
  statusFilter,
  setStatusFilter,
  roleFilter,
  setRoleFilter,
  dateFilter,
  setDateFilter,
  startIndex,
  endIndex,
  users
}: UserTableContentProps) {
  const { setUser } = useUser()
  function handleAddUser() {
    // Logic to add a new user
    setUser({
      name: "",
      email: "",
      status: "unverified",
      role: "USER"
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
          {/* Join Date Filter */}
          <DateFilter
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />

          <div className="flex gap-2 ml-auto items-center h-full">
            {/* Add User Button */}
            <NavLink
              to="/user/new"
              className="flex items-center w-35 h-full text-nowrap gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              onClick={handleAddUser}
              children={({ isPending }: { isPending: boolean }) =>
                isPending ? (
                  <Spinner parentClassName="w-full h-full" spinSize="ml-1 w-5 h-5" />
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add User
                  </>
                )
              }
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <UsersTableLayout
        handleSort={handleSort}
        getSortIcon={getSortIcon}
        currentUsers={filteredUsers}
      />
      {/* <UsersTable

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <PaginationComponent
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          items={users}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalRows={totalRows}
        />
      </div>
    </div>
  );
};