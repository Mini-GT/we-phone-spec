import { type Request, type Response } from "express"
import bcrypt from "bcryptjs"
import prisma from "@/prismaClient"
import { loginSchema, registerSchema } from "@/schemas/auth.schemas"
import passport from "../services/passport"
import type { User } from "@prisma/client"
import { signJwt, verifyJwt } from "@/utils/jwt"
import type { DecodedToken } from "@/middlewares/auth.middleware"
import z from "zod"

const refreshJWTSecretKey = process.env.REFRESH_JWT_SECRET
const accessJWTSecretKey = process.env.ACCESS_JWT_SECRET
const socketJWTSecretKey = process.env.SOCKET_JWT_SECRET
if(!refreshJWTSecretKey || !accessJWTSecretKey || !socketJWTSecretKey) throw new Error("JWT secret key is empty")

type PassportInfo = {
  message: string;
}

const register = async (req: Request, res: Response) => {
  const result = await registerSchema.safeParseAsync(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.format(),
    });
  }

  const { name, email, password } = result.data;

  const existingUser = await prisma.user.findUnique({ 
    where: { 
      email, 
    } 
  })

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 8)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "USER",
    }
  })

  if(!user) {
    res.status(500).json({ message: "Cannot create an account" })
  }

  // const token =  

  // const token = signJwt(
  //   { id: user.id },
  //   { expiresIn: "7d" }
  // )

  // const token = jwt.sign(
  //   { id: user.id },
  //   jwtSecretKey, 
  //   { expiresIn: "24h" }
  // )

  res.status(201).json({ message: "User created" });
}

const login = async (req: Request, res: Response) => {
  const result = await loginSchema.safeParseAsync(req.body)
  if (!result.success) {
    const flattened = z.flattenError(result.error)
    console.log(flattened.fieldErrors)
    return res.status(400).json({
      message: flattened.fieldErrors
    });
  }

  passport.authenticate(
    "local",
    { session: false }, 
    (error: Error | null, user: User, info: PassportInfo) => {
    if(error) {
      console.error("Authentication error:", error);
      return res.status(500).json({ message: "Server error" })
    }

    if (!user) {
      return res.status(401).json({ message: info?.message || "Authentication failed" });
    }
    
    // req.logIn(user, (error) => {
    //   if(error) return res.status(500).json({ message: "Login failed" })

    //   return res.status(200).json({ message: "Logged In" })
    // })

    // const accessToken = jwt.sign(
    //   { id: user.id, role: user.role },
    //   accessJWTSecretKey, 
    //   { expiresIn: "5mins" }
    // )

    const refreshToken = signJwt(
      { id: user.id },
      refreshJWTSecretKey,
      { expiresIn: "7d" }
    )

    const accessToken = signJwt(
      { id: user.id },
      accessJWTSecretKey,
      { expiresIn: "15s" }
    )

    const socketToken = signJwt(
      { id: user.id },
      socketJWTSecretKey,
      { expiresIn: "7d" }
    )

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      status: user.status,
      role: user.role,
      createdAt: user.createdAt,
    } 

    // res
    //   .cookie("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    //     maxAge: 40 * 60 * 1000, // 7 days 
    //   })
    //   .cookie("accessToken", accessToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    //     maxAge: 10 * 1000
    //   })
    res
      .cookie("socketToken", socketToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .status(200)
      .json({ accessToken, refreshToken, userData });
  })(req, res)
}

const getCurrentUser = async (req: Request, res: Response) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(401).json({ message: 'Not authenticated' });
  // }
  const user = req.user as User;

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  return res.status(200).json({
    createdAt: user.createdAt,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    status: user.status,
    role: user.role,
  });
  // res.json(req.isAuthenticated())
}

const logout = async (req: Request, res: Response) => {
  res.clearCookie("token").json({ message: "Logged out" })
}

const refresh = async (req: Request, res: Response) => {
  const payload = req.headers.authorization
  const refreshToken = payload?.split(" ")[1]

  if (!refreshToken) return res.status(401).json({ message: "No refresh token" })

  // check if refresh token is still available
  const decoded = verifyJwt(refreshToken, refreshJWTSecretKey) as DecodedToken

  const user = await prisma.user.findUnique({ where: { id: decoded.id } })

  if (!user) return res.status(401).json({ message: "User not found" })

  const newAccessToken = signJwt(
    { id: user.id },
    accessJWTSecretKey,
    { expiresIn: "15s" }
  )

  // res.cookie("accessToken", newAccessToken, { 
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  //   maxAge: 10 * 1000,
  // })
  return res.status(200).json({ newAccessToken })
}

export {
  register,
  login,
  getCurrentUser,
  logout,
  refresh,
}