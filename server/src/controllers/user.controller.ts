import type { Request, Response } from "express"
import type { User } from "@prisma/client"

const getUser = async (req: Request, res: Response) => {
  const user = req.user as User

  console.log(user)
} 
const updatetUser = async (req: Request, res: Response) => {
  const userId = req.params.userId

  console.log(userId)
}

export {
  getUser,
  updatetUser,
}