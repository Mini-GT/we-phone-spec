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

  const userNotificationsFullData = await prisma.userNotification.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  
  const userNotifIds = userNotifications.map(n => n.globalNotificationId)

  const unseenGlobalNotifs = await prisma.globalNotification.findMany({
    where: {
      id: {
        notIn: userNotifIds
      },
      createdAt: {
        gte: user.createdAt  // ignore old notifs created before user registered
      }
    }
  })

  // check if there is an unseen global notifs when user logins
  if(unseenGlobalNotifs.length > 0) {
    // if true, add them to the user notification data
    const dataToInsert = unseenGlobalNotifs.map((notif) => ({
      userId: user.id,
      globalNotificationId: notif.id
    }))

    await prisma.userNotification.createMany({
      data: dataToInsert,
      skipDuplicates: true,
    })
  }

  const userGlobalNotifIds = userNotifications.map(notif => notif.globalNotificationId);

  // use user's global notifs id to fetch the full data in globalnotification
  const notifications = await prisma.globalNotification.findMany({
    where: {
      id: {
        in: userGlobalNotifIds 
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return res.status(200).json({ result: "success", notifications, userNotificationsFullData})
}

const addNotificationToUser = async (req: Request, res: Response) => {
  const newNotification = req.body as NewDeviceNotificationType
  const user = req.user as User

  const newUserNotif = await prisma.userNotification.create({
    data: {
      userId: user.id,
      globalNotificationId: newNotification.id,
    }
  })
  // console.log(newUserNotif)

  return res.status(200).json({ result: "success", message: "Notification Added" })
}

export {
  getUserNotifications,
  addNotificationToUser,
}
