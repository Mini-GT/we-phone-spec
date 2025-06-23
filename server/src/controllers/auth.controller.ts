import { response, type NextFunction, type Request, type Response } from "express"
import bcrypt from "bcryptjs"
import prisma from "@/prismaClient"
import jwt from "jsonwebtoken"
import { loginSchema, registerSchema } from "@/schemas/auth.schemas"
import passport from "../services/passport"
import type { User } from "@prisma/client"
import { signJwt } from "@/utils/jwt"

const jwtSecretKey = process.env.JWT_SECRET
if(!jwtSecretKey) throw new Error("JWT secret key is empty")

type PassportInfo = {
  message: string;
}

const register = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);

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

  const token = signJwt(
    { id: user.id },
    { expiresIn: "7d" }
  )

  // const token = jwt.sign(
  //   { id: user.id },
  //   jwtSecretKey, 
  //   { expiresIn: "24h" }
  // )

  res.status(201).json({ message: "User created", token, id: user.id, name: user.name, email: user.email });
}

const login = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: result.error.format(),
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

    const token = jwt.sign(
      { id: user.id, role: user.role },
      jwtSecretKey, 
      { expiresIn: "7d" }
    )

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({ 
        message: "Logged in", 
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          profileImage: user.profileImage,
          createdAt: user.createdAt,
          isVerified: user.isVerified,
        }
      });
  })(req, res)

  // const result = loginSchema.safeParse(req.body)

  // if (!result.success) {
  //   return res.status(400).json({
  //     error: result.error.format(),
  //   });
  // }
  // const { email, password } = result.data;
  // console.log(email, password)

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email
  //   }
  // })

  // if(!user) {
  //   return res.status(404).json({ message: "User not found" })
  // }

  // const passwordIsValid = bcrypt.compare(password, user.password)

  // if(!passwordIsValid) {
  //   return res.status(401).json({ message: "Invalid credentials" })
  // }

  // const token = jwt.sign(
  //   { id: user.id },
  //   jwtSecretKey,
  //   { expiresIn: "24h" }
  // )

  // res.cookie('token', token, {
  //   httpOnly: false,
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'strict',
  //   maxAge: 24 * 60 * 60 * 1000 // 24 hours
  // });

  // res.status(200).json({ message: "Logged in", id: user.id, name: user.name, email: user.email });
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
    isVerified: user.isVerified,
    role: user.role,
  });
  // res.json(req.isAuthenticated())
}

const updateCurrentUser = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const user = req.user as User;

  // await prisma.user.update({
  //   where: { id: user.id },
  //   data: {
  //     isVerified: true,
  //     verifyToken: null,
  //     verifyTokenExpiry: null,
  //   },
  // });
  // console.log(user)
  // return res.status(200).json({
  //   createdAt: user.createdAt,
  //   name: user.name,
  //   email: user.email,
  //   profileImage: user.profileImage,
  //   isVerified: user.isVerified
  // });
  // res.json(req.isAuthenticated())
}

const logout = async (req: Request, res: Response) => {
  res.clearCookie("token").json({ message: "Logged out" })
  // req.logOut((error) => {
  //   if(error) return res.status(500).json({ message: "Something went wrong" })

      
  //   req.session?.destroy(() => {
  //     res.clearCookie("connect.sid", {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       secure: process.env.NODE_ENV === "production",
  //     });

  //     return res.status(204).send(); // No content
  //   });
  // })
}

export {
  register,
  login,
  getCurrentUser,
  logout,
  updateCurrentUser
}