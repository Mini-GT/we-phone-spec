import type { Request, Response } from "express"
import type { User } from "@prisma/client"
import prisma from "@/prismaClient"
import bcrypt from "bcryptjs";
import { addUserSchema, changeNameSchema, changePasswordSchema } from "@/schemas/user.schema";
import * as z from "zod";

const addNewUser = async (req: Request, res: Response) => {
  const result = await addUserSchema.safeParseAsync(req.body);
  if (!result.success) {
    return res.status(400).json({ 
      result: "Failed",
      error: result.error,
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
    id: user.id,
    createdAt: user.createdAt,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    status: user.status,
    role: user.role,
  })
} 

const updateUser = async (req: Request, res: Response) => {
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

const changeName = async (req: Request, res: Response) => {
  const { userId } = req.params
  const { name } = req.body

  // validate name
  const changeNameResult = await changeNameSchema.safeParseAsync(name)
  if(!changeNameResult.success) {
    const issue = changeNameResult.error?.issues[0]
    return res.status(400).json({ result: "failed", message: issue?.message })
  }
  if(!userId) return res.json({ message: "userId is empty" });

  const user = await prisma.user.findUnique({ 
    where: { 
      id: userId 
    } 
  })

  if (!user) {
    return res.status(400).json({ message: "User doesn't exists" });
  } 

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      name
    }
  })

  res.status(200).json({ result: "success", message: "Username updated" });
}

const changePassword = async (req: Request, res: Response) => {
  const { userId } = req.params
  const { currentPassword, newPassword, confirmPassword } = req.body
  // validate password inputs
  const changePasswordResult = await changePasswordSchema.safeParseAsync({ currentPassword, newPassword, confirmPassword})
  if(changePasswordResult.error) {
    const flattened = z.flattenError(changePasswordResult.error)
    const currentPasswordError = flattened.fieldErrors["currentPassword"]?.[0] ?? ""
    const newPasswordError = flattened.fieldErrors["newPassword"]?.[0] ?? ""
    const confirmPasswordError = flattened.fieldErrors["confirmPassword"]?.[0] ?? ""

    return res.status(400).json({ currentPasswordError, newPasswordError, confirmPasswordError })
  }
  if (!userId) {
    return res.status(400).json({ result: "failed", message: "userId is missing"});
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ result: "failed", message: "New password and confirm password do not match" });
  }

  const user = await prisma.user.findUnique({ 
    where: { 
      id: userId 
    } 
  })

  if (!user) {
    return res.status(404).json({ result: "failed", message: "User doesn't exists" });
  } 
  
  // for users who are signed-in using gmail OAuth
  if(!user.password) {
    const hashedPassword = await bcrypt.hash(newPassword, 8)

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        password: hashedPassword 
      }
    })

    return res.status(200).json({ result: "success", message: "Password change successfully" });
  }

  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
  
  if (!isCurrentPasswordValid) {
    return res.status(400).json({ result: "failed", message: "Current password is incorrect" });
  }

  const isSamePassword = await bcrypt.compare(newPassword, user.password);
  
  if (isSamePassword) {
    return res.status(400).json({ result: "failed", message: 'New password must be different from current password'});
  }

  const hashedPassword = await bcrypt.hash(newPassword, 8)

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      password: hashedPassword,
      updatedAt: new Date()
    }
  })

  res.status(200).json({ result: "success", message: "Password changed successfully" });
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
  updateUser,
  deleteUser,
  getMe,
  addNewUser,
  changeName,
  changePassword,
}