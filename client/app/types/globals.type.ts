import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { FetcherWithComponents } from "react-router";
import type { Permission } from "~/utils/permissions";

type LoginRegisterFormProps = {
  handleAuthMode: Dispatch<SetStateAction<"login" | "register" | "verify">>;
}

type Smartphone = {
  _id: string;
  name: string;
  brand: string;
  views: number;
  likes: number;
  description: string;
  image: string;
  launch: {
    announced: string;
    released: string;
  };
  specs: Specs;
  createdAt?: string;
  updatedAt?: string;
}

type Specs = {
  body: {
    dimensions: string;
    weight: string;
    build: string;
    sim: string;
    resistance: string;
  };
  display: {
    type: string;
    size: string;
    resolution: string;
    protection: string;
  };
  platform: {
    os: string;
    chipset: string;
    cpu: string;
    gpu: string;
  };
  memory: {
    cardSlot: string;
    internal: string;
  };
  camera: {
    main: {
      triple: string;
      features: string;
      video: string;
    };
    selfie: {
      single: string;
      features: string;
      video: string;
    };
  };
  sound: {
    loudspeaker: string;
    jack: string;
  };
  connection: {
    wlan: string;
    bluetooth: string;
    nfc: string;
    infraredPort: string;
    radio: string;
    USB: string;
  };
  features: {
    sensors: string;
  };
  battery: {
    type: string;
    charging: string;
  };
  misc: {
    colors: string;
    models: string;
  };
}

type TopViewStatsType = {
  topToday: Smartphone[]
  topWeek: Smartphone[] 
  topMonth: Smartphone[]
}

type SpecItem = {
  label: string;
  value: string | boolean | string[] | undefined;
};

type DeviceSpecProps = {
  title: string;
  data: SpecItem[];
}

interface loginFormType {
  email: string;
  password: string;
}

interface RegisterFormType extends loginFormType {
  name: string;
  confirmPassword: string;
}

type ApiError = {
  message: string;
  statusCode?: number;
  error?: string;
}

type ApiResponse = {
  statusCode: number
  message: {
    result: "success" | "failed" 
  }
}

type PaginationQuery = {
  skip: number
  take: number
}

type ApiTopDeviceResponse = {
  result: "success" | "failed"
  topToday: Smartphone[]
  topWeek: Smartphone[] 
  topMonth: Smartphone[]
  topViewed: Smartphone[]
  topLiked: Smartphone[]
  newAddedSmartphones: Smartphone[]
}

type ContextProviderProps = {
  children: ReactNode;
}

type UserType = {
  id?: string;
  name: string;
  email: string;
  profileImage: string;
  createdAt?: Date;
  status: UserStatus;
  role: UserRole;
}

type UserStatus = 'verified' | 'unverified' | 'banned' | 'pending' | 'suspended'

type DeviceGridLayoutProps = {
  items: Smartphone[] | undefined;
  title: string;
}

type ProtectedRouteProps = {
  children: ContextProviderProps["children"];
  requiredPermission?: Permission;
  requiredRoles?: UserRole[];
  fallback?: React.ReactNode | null;
}

type TableSortConfig = {
  key: '_id' | 'id' | 'name' | 'email' | 'status' | 'role' | 'joinedDate' | 'brand' | null; 
  direction: 'asc' | 'desc';
}

type UserFormPath = 'name' | 'email' | 'role' | 'password'

type UserMenuNavProps = {
  name: string | undefined
  tab: MenuNav
}

type ChangePasswordType = {
  currentPassword: string
  newPassword: string
  confirmPassword: string  
}

type ErrorContentProps = {
  details: ApiError["error"];
  message: ApiError["message"];
}

type NotFoundProps = ErrorContentProps

type UserRole = "USER" | "ADMIN" | "MODERATOR"

type MenuNav = "profile" | "likelist" | "notificaton" | "settings" | "users" | "devices"

type SelectedTabType = 'Today' | 'Week' | 'Month'

type FormPath = 
  | 'name'
  | 'brand' 
  | 'views'
  | 'likes'
  | 'description'
  | 'launch.announced'
  | 'launch.released'
  | 'specs.body.dimensions'
  | 'specs.body.weight'
  | 'specs.body.build'
  | 'specs.body.sim'
  | 'specs.body.resistance'
  | 'specs.display.type'
  | 'specs.display.size'
  | 'specs.display.resolution'
  | 'specs.display.protection'
  | 'specs.platform.os'
  | 'specs.platform.chipset'
  | 'specs.platform.cpu'
  | 'specs.platform.gpu'
  | 'specs.memory.cardSlot'
  | 'specs.memory.internal'
  | 'specs.camera.main.triple'
  | 'specs.camera.main.features'
  | 'specs.camera.main.video'
  | 'specs.camera.selfie.single'
  | 'specs.camera.selfie.features'
  | 'specs.camera.selfie.video'
  | 'specs.sound.loudspeaker'
  | 'specs.sound.jack'
  | 'specs.connection.wlan'
  | 'specs.connection.bluetooth'
  | 'specs.connection.nfc'
  | 'specs.connection.infraredPort'
  | 'specs.connection.radio'
  | 'specs.connection.USB'
  | 'specs.features.sensors'
  | 'specs.battery.type'
  | 'specs.battery.charging'
  | 'specs.misc.colors'
  | 'specs.misc.models';

type KebabMenuProps = {
  deviceId: string 
  action: string
  setNotifications?: Dispatch<SetStateAction<NewDeviceNotificationType[]>>
  fetcher?: FetcherWithComponents<any>
}

type DropDownProps = {
  isProfileMenu: boolean
  isNotificationDropdown: boolean
}

type NotificationType = ApiResponse["message"] & {
  notifications: NewDeviceNotificationType[]
  unreadCount: number
  totalNotifications: number
}

type SmartphoneCommentType = {
  id: string 
  userId?: string
  deviceId?: string
  name: string
  message: string
  createdAt: Date
  updatedAt?: Date
  likes: number
  dislikes: number
  isDeleted: boolean
  user?: {
    name: string
    role: UserRole
    profileImage?: UserType["profileImage"]
  }
}

type SmartphoneCommentsDataType = {
  smartphoneId: SmartphoneCommentType["id"]
  skip: number,
  take: number,
  orderBy: "createdAt" | "updatedAt" | "likes"
  sortDirection: "desc" | "asc"
}

type SortOrderType = "newest" | "oldest" | "mostLiked"

type NewDeviceNotificationType = {
  globalNotificationId: string,
  title: string,
  image: string,
  createdAt: Date,
  name: string,
  isRead: boolean,
  description: string,
  isDeleted: boolean
}

export const queryKeysType = {
  me: ["me"] as const,
  smartphones: ["smartphones"] as const,
  smartphone: (_id: Smartphone["_id"]) => ["smartphone", _id] as const,
  topDevicesByViewStats: ["smartphones", "topDevicesByViewStats"] as const,
  topAllTimeViewed: ["smartphones", "topAllTimeViewed"] as const,
  topAllTimeLiked: ["smartphones", "topAllTimeLiked"] as const,
  newAddedSmartphones: ["smartphones", "newAddedSmartphones"] as const,
  smartphonesByBrand: (brandName: Smartphone["brand"]) => ["smartphones", brandName] as const, 
  notifications: ["notifications"] as const, 
  markNotificationAsRead: (notificationId: NewDeviceNotificationType["globalNotificationId"]) => ["smartphones", notificationId] as const, 
}

export type {
  LoginRegisterFormProps,
  Smartphone,
  DeviceSpecProps,
  Specs,
  SpecItem,
  RegisterFormType,
  loginFormType,
  ApiError,
  ContextProviderProps,
  MenuNav,
  UserRole,
  ProtectedRouteProps,
  UserMenuNavProps,
  ErrorContentProps,
  NotFoundProps,
  TableSortConfig,
  DeviceGridLayoutProps,
  FormPath,
  ApiResponse,
  UserType,
  UserStatus,
  UserFormPath,
  ChangePasswordType, 
  KebabMenuProps,
  DropDownProps,
  NewDeviceNotificationType,
  NotificationType,
  SelectedTabType,
  ApiTopDeviceResponse,
  SmartphoneCommentType,
  SmartphoneCommentsDataType,
  TopViewStatsType,
  SortOrderType,
  PaginationQuery,
}