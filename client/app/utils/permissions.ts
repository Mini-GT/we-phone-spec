import type { UserRole } from "~/types/globals.type";

const PERMISSIONS = {
  // user management
  DELETE_USER: 'delete_user',
  ADD_USER: 'add_user',
  VIEW_USERS: 'view_users',

  // device management
  DELETE_DEVICE: 'delete_device',
  ADD_DEVICE: 'add_device',
  VIEW_DEVICES: 'view_devices',
} as const

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: [
    PERMISSIONS.DELETE_USER, 
    PERMISSIONS.DELETE_DEVICE, 
    PERMISSIONS.ADD_USER, 
    PERMISSIONS.ADD_DEVICE, 
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_DEVICES,
  ],
  MODERATOR: [
    PERMISSIONS.ADD_USER, 
    PERMISSIONS.ADD_DEVICE, 
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_DEVICES
  ],
  USER: [
    PERMISSIONS.VIEW_DEVICES
  ],
}

function hasPermission(userRole: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[userRole].includes(permission)
}

function canDeleteUsers(userRole: UserRole): boolean {
  return hasPermission(userRole, PERMISSIONS.DELETE_USER)
}

function canAddUsers(userRole: UserRole): boolean {
  return hasPermission(userRole, PERMISSIONS.ADD_USER)
}

export {
  PERMISSIONS,
  hasPermission,
  canDeleteUsers,
  canAddUsers,
}