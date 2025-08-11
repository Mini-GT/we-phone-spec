import type { Request, Response } from "express"
import prisma from "@/prismaClient"

const getSmartphoneComments = async (req: Request, res: Response)=> {
  const { smartphoneId } = req.params

  const comments = await prisma.smartphoneComments.findMany({
    take: 5,
    where: {
      deviceId: smartphoneId
    },
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      createdAt: true,
      likes: true,
      dislikes: true,
      isDeleted: true,
      message: true,
      name: true
    }
  })

  return res.status(200).json({ result: "success", comments })
}

export {
  getSmartphoneComments,
}