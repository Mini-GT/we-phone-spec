import prisma from "@/prismaClient"
import type { NewDeviceNotificationType } from "@/types/types"
import type { User } from "@prisma/client"
import type { Request, Response } from "express"

const getUserNotifications = async (req: Request, res: Response) => {
  const user = req.user as User

  const userNotifications = await prisma.userNotification.findMany({
    where: {
      userId: user.id
    },
    select: {
      globalNotificationId: true
    }
  })
  
  const userNotifIds = userNotifications.map(n => n.globalNotificationId)
  
  // find global notifs data thats not in userNotif's Id (we do this to see if user has missed some notifications)
  const unseenGlobalNotifs = await prisma.globalNotification.findMany({
    where: {
      globalNotificationId: {
        notIn: userNotifIds as string[]
      },
      createdAt: {
        gte: user.createdAt  // ignore old notifs created before user registered
      }
    }, 
  })
  
  // check if there is an unseen global notifs when user logins
  if(unseenGlobalNotifs.length > 0) {
    // if true, add them to the user notification data
    const dataToInsert = unseenGlobalNotifs.map((notif) => ({
      userId: user.id,
      globalNotificationId: notif.globalNotificationId,
      name: notif.name,
      title: notif.title,
      image: notif.image,
      createdAt: notif.createdAt,
    }))
    
    await prisma.userNotification.createMany({
      data: dataToInsert,
      skipDuplicates: true,
    })
  }

  const notifications = await prisma.userNotification.findMany({
    where: {
      userId: user.id
    }, 
    orderBy: {
      createdAt: "desc"
    },
    select: {
      globalNotificationId: true,
      name: true,
      title: true,
      type: true,
      image: true,
      isRead: true,
      createdAt: true
    }
  })
  
  return res.status(200).json({ result: "success", notifications })
}

const addNotificationToUser = async (req: Request, res: Response) => {
  const newNotification = req.body as NewDeviceNotificationType
  const user = req.user as User

  const newUserNotif = await prisma.userNotification.create({
    data: {
      userId: user.id,
      globalNotificationId: newNotification.globalNotificationId,
      name: newNotification.name,
      title: newNotification.title,
      image: newNotification.image,
      createdAt: newNotification.createdAt,
    }
  })

  return res.status(200).json({ result: "success", message: "Notification Added" })
}

export {
  getUserNotifications,
  addNotificationToUser,
}
