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
      globalNotificationId: true,
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
      description: notif.description,
    }))
    
    await prisma.userNotification.createMany({
      data: dataToInsert,
      skipDuplicates: true,
    })
  }

  // only fetch those notifs that are not deleted
  const notifications = await prisma.userNotification.findMany({
    where: {
      userId: user.id,
      isDeleted: false
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
      createdAt: true,
      description: true
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
      description: newNotification.description
    }
  })

  return res.status(200).json({ result: "success", message: "Notification Added" })
}

const markNotificationAsRead = async (req: Request, res: Response) => {
  const { notifId } = req.body
  const user = req.user as User
  
  const existingNotification = await prisma.userNotification.findUnique({
    where: {
      userId_globalNotificationId: {
        userId: user.id,
        globalNotificationId: notifId
      }
    }
  })

  if(existingNotification) {
    await prisma.userNotification.update({
      where: {
        userId_globalNotificationId: {
          userId: user.id,
          globalNotificationId: notifId
        }
      }, 
      data: {
        isRead: true
      }
    })
  }

  return res.status(200)
}

const deleteNotification = async (req: Request, res: Response) => {
  const { notifId } = req.params
  const user = req.user as User

  if(!notifId) return res.status(403).json({ result: "failed", message: "No notification Id provide" })
  
  const resu = await prisma.userNotification.update({
    where: {
      userId_globalNotificationId: {
        userId: user.id,
        globalNotificationId: notifId
      }
    },
    data: {
      isDeleted: true
    }
  })
}

export {
  getUserNotifications,
  addNotificationToUser,
  markNotificationAsRead,
  deleteNotification,
}
