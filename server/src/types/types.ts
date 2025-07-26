import type { Types } from "mongoose"

type UserRole = 'ADMIN' | 'MODERATOR' | 'USER' | 'DEMO'

type HasRoleType = {
  roles: UserRole[]
}

type LikedSmartphoneIds = {
  smartphoneId: string 
}

type SocketData = {
  name: string
}

type ServerToClientEvents = {
  newDeviceNotification: (newDeviceNotification: NewDeviceNotificationType) => void
}

type NewDeviceNotificationType = {
  id: Types.ObjectId,
  title: string,
  image: string,
  date: NativeDate,
  description: string,
  isRead: boolean,
}

export type { 
  UserRole, 
  HasRoleType,
  LikedSmartphoneIds,
  SocketData,
  ServerToClientEvents, 
}