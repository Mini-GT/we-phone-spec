import type { Request, Response } from "express"
import type { User } from "@prisma/client"
import prisma from "@/prismaClient"

const getUser = async (req: Request, res: Response) => {
  const user = req.user as User

  res.status(200).json({
    createdAt: user.createdAt,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    isVerified: user.isVerified,
    role: user.role,
  })
} 
const updatetUser = async (req: Request, res: Response) => {
  const userId = req.params.userId

  console.log(userId)
}

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId

  if(!userId) return res.status(400)

  const result = await prisma.user.delete({
    where: {
      id: userId 
    }
  })

  if(!result) return res.status(404).json({ result: "Cannot find user" })

  res.status(200).json({ result: "Success" })
}

export {
  getUser,
  updatetUser,
  deleteUser 
}