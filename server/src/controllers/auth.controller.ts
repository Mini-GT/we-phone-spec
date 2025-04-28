import type { Request, Response } from "express"
import bcrypt from "bcryptjs"
import prisma from "@/prismaClient";
import jwt from "jsonwebtoken"
import { loginSchema, registerSchema } from "@/schemas/auth.schemas";

const jwtSecretKey = process.env.JWT_SECRET
if(!jwtSecretKey) throw new Error("JWT secret key is empty")

const register = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.format(),
    });
  }

  const { name, email, password } = result.data;
  console.log(name, email, password)

  const existingUser = await prisma.user.findUnique({ 
    where: { 
      email 
    } 
  })

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  const token = jwt.sign(
    { id: user.id },
    jwtSecretKey, 
    { expiresIn: "24h" }
  )

  res.status(201).json({ message: "User created", token });
}

const login = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: result.error.format(),
    });
  }
  const { email, password } = result.data;
  console.log(email, password)

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if(!user) {
    return res.status(404).send({ message: "User not found" })
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password)

  if(!passwordIsValid) {
    return res.status(401).send({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    { id: user.id },
    jwtSecretKey,
    { expiresIn: "24h" }
  )

  res.status(200).json({ message: "Logged in", token });
}

export {
  register,
  login,
}