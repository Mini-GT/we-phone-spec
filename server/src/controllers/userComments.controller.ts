import type { Request, Response } from "express"
import prisma from "@/prismaClient"

const getSmartphoneComments = async (req: Request, res: Response)=> {
  const { smartphoneId, skip, take } = req.query
  
  const skipNum = Number(skip) || 0
  const takeNum = Number(take) || 5

  const comments = await prisma.smartphoneComments.findMany({
    skip: skipNum,
    take: takeNum,
    where: {
      deviceId: smartphoneId as string
    },
    orderBy: {
      likes: "desc"
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