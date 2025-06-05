import type { HasRoleType, UserRole } from "@/types/types";

const hasRequiredRole = (requiredRoles: UserRole[], userRole: UserRole) => {
  return requiredRoles.includes(userRole);
}

export {
  hasRequiredRole,
}