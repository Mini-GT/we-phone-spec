import { type Request, type Response } from "express"
import type { User } from "@prisma/client"
import prisma from "@/prismaClient"
import { hasRequiredRole } from "@/utils/roles"

const getAllUsers = async (req: Request, res: Response) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(401).json({ message: 'Not authenticated' });
  // }
  const user = req.user as User

  // check if the user has the required role to access this endpoint
  if (!hasRequiredRole(['ADMIN', 'MODERATOR'], user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      profileImage: true,
      isVerified: true,
      role: true,
    },
  })

  if (!allUsers) {
    return res.status(404).json({ message: 'No users found' });
  }

  res.status(200).json(allUsers)
}

export {
  getAllUsers
}