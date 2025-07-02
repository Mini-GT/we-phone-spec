import type { Request, Response } from "express"
import type { User } from "@prisma/client"
import prisma from "@/prismaClient"

const getMe = async (req: Request, res: Response) => {
  const user = req.user as User

  res.status(200).json({
    createdAt: user.createdAt,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    status: user.status,
    role: user.role,
  })
} 
const updatetUser = async (req: Request, res: Response) => {
  const { userId } = req.params

  console.log(userId)
}

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params

  if(!userId) return res.status(400)

  const result = await prisma.user.delete({
    where: {
      id: userId 
    }
  })

  if(!result) return res.status(404).json({ result: "Cannot find user" })

  res.status(200).json({ result: "Success" })
}

const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params

  const user = await prisma.user.findUnique({
    where: { 
      id: userId 
    },
    select: {
      createdAt: true,
      name: true,
      email: true,
      profileImage: true,
      status: true,
      role: true
    }
  })

  if(!user) return res.status(404).json({ result: "Cannot find user" })

  res.status(200).json({ result: "success", user })
}

export {
  getUserById, 
  updatetUser,
  deleteUser,
  getMe 
}