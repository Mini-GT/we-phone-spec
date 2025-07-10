import type { Request, Response } from "express"
import type { User } from "@prisma/client"
import prisma from "@/prismaClient"
import { addUserSchema } from "@/schemas/auth.schemas";
import bcrypt from "bcryptjs";

const addNewUser = async (req: Request, res: Response) => {
  const result = addUserSchema.safeParse(req.body);
  console.log(result)
  if (!result.success) {
    return res.status(400).json({ 
      result: "Failed",
      error: result.error.format(),
    });
  }

  const { name, email, password, role, status } = result.data;

  const existingUser = await prisma.user.findUnique({ 
    where: { 
      email, 
    } 
  })

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 8)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      status,
    }
  })

  res.status(201).json({ result: "success",  message: "User created" });
}


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
  const { name, status, role } = req.body
  
  if(!userId) return res.status(400).json({ message: "userId is empty" });

  const user = await prisma.user.findUnique({ 
    where: { 
      id: userId 
    } 
  })

  if (!user) {
    return res.status(400).json({ message: "User doesn't exists" });
  } 

  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      name,
      status: status.toLowerCase(),
      role: role.toUpperCase() 
    },
    select: {
      id: true,
      updatedAt: true,
      name: true,
      email: true,
      profileImage: true,
      status: true,
      role: true
    }
  })

  res.status(200).json({ result: "success", updatedUser });
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
      id: true, 
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
  getMe,
  addNewUser 
}