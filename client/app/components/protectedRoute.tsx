import { useAuth } from "~/context/authContext";
import type { ProtectedRouteProps } from "~/types/globals.type";
import { hasPermission } from "~/utils/permissions";

export function ProtectedRoute({
  children, 
  requiredPermission, 
  requiredRoles, 
  fallback = null
}: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return fallback
  }

  // check role-based access
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return fallback
  }

  // check permission-based access
  if (requiredPermission && !hasPermission(user.role, requiredPermission)) {
    return fallback
  }

  return <>{children}</>;
}