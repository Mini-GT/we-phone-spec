import type { SmartphoneComments } from "@prisma/client"

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
  "add-comment": (comment: SmartphoneCommentType, smartphoneId: string) => void
  joinSmartphoneRoom: (smartphoneId: string) => void
  "new-comment": (newComment: Omit<SmartphoneComments, "deviceId" | "updatedAt">) => void
}

type NewDeviceNotificationType = {
  globalNotificationId: string,
  title: string,
  image: string,
  createdAt: NativeDate,
  name: string | null
  description: string
}

type SmartphoneCommentType = {
  id: string
  name: string
  userId: string
  message: string
  createdAt: Date
  updatedAt?: Date
  likes: number
  dislikes: number
  isDeleted: boolean,
  user: {
    name: string 
    role: UserRole
  }
}

export type { 
  UserRole, 
  HasRoleType,
  LikedSmartphoneIds,
  SocketData,
  ServerToClientEvents, 
  NewDeviceNotificationType,
  SmartphoneCommentType,
}