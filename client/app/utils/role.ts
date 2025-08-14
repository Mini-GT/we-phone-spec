import type { UserRole } from "~/types/globals.type";

const getRole = (role: Omit<UserRole, "USER"> | undefined) => {
  switch (role?.toLowerCase()) {
    case "admin": return "admin";
    case "moderator": return "moderator";
    default: return null;
  }
}

export {
  getRole
}