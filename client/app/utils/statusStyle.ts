import type { UserRole, UserStatus } from "~/types/globals.type";

const getStatusColor = (status: UserStatus) => {
  switch (status) {
    case "verified": return "bg-green-100 text-green-800";
    case "banned": return "bg-gray-300 text-gray-900";
    case "unverified": return "bg-red-100 text-red-800";
    case "pending": return "bg-blue-100 text-blue-800";
    case "suspended": return "bg-orange-100 text-orange-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getRoleColor = (status: Omit<UserRole, "USER"> | undefined) => {
  switch (status?.toLocaleLowerCase()) {
    case "moderator": return "bg-yellow-100 text-green-800";
    case "admin": return "bg-blue-300 text-black";
    default: return null;
  }
};

export {
  getStatusColor,
  getRoleColor,
}
