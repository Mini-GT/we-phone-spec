import { Edit2, Trash2 } from "lucide-react";
import type { TableSortConfig, UserMenuProps } from "~/types/globals.type";
import { toReadableDate } from "~/utils/formatDate";
import _ from "lodash";

type UsersTableProps = {
  getSortIcon: (iconTpe: TableSortConfig["key"]) => React.ReactNode;
  getStatusColor: (isVerified: boolean) => string;
  handleSort: (sortType: TableSortConfig["key"]) => void;
  currentUsers: UserMenuProps[];
};

export default function UsersTable({
  getSortIcon,
  getStatusColor,
  handleSort,
  currentUsers,
}: UsersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left p-4">
              <input type="checkbox" className="rounded border-gray-300" />
            </th>
            <th 
              className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('id')}
            >
              ID <span className="text-xs ml-1">{getSortIcon('id')}</span>
            </th>
            <th 
              className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('name')}
            >
              Full Name <span className="text-xs ml-1">{getSortIcon('name')}</span>
            </th>
            <th 
              className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('email')}
            >
              Email <span className="text-xs ml-1">{getSortIcon('email')}</span>
            </th>
            <th 
              className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              Status
            </th>
            <th 
              className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              Role
            </th>
            <th 
              className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              Joined Date
            </th>
            {/* <th 
              className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('lastActive')}
            >
              Last Active <span className="text-xs ml-1">{getSortIcon('lastActive')}</span>
            </th> */}
            <th className="text-left p-4 font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-4">
                <input type="checkbox" className="rounded border-gray-300" />
              </td>
              <td className="p-4 text-gray-700">{user.id}</td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={user.profileImage ?? "/userIcon.svg"} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-900">{user.name}</span>
                </div>
              </td>
              <td className="p-4 text-gray-700">{user.email}</td>
              {/* <td className="p-4 text-gray-700">{user.username}</td> */}
              <td className="p-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.isVerified)}`}>
                  {user.isVerified ? 'Verified' : 'Unverified'}
                </span>
              </td>
              <td className="p-4 text-gray-700">{_.capitalize(user.role)}</td>
              <td className="p-4 text-gray-700">{toReadableDate(user.createdAt)}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button className="p-1 text-gray-500 hover:text-blue-600 transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-red-600 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}