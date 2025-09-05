import type { Request, Response, NextFunction } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { CustomAPIError } from "@/errors/customError";
import { verifyJwt } from "@/utils/jwt";
import prisma from "@/prismaClient";
import { jwtDecode } from "jwt-decode";
import type { User } from "@prisma/client";

const refreshJWTSecretKey = process.env.REFRESH_JWT_SECRET
const accessJWTSecretKey = process.env.ACCESS_JWT_SECRET
if(!refreshJWTSecretKey || !accessJWTSecretKey) throw new Error("JWT secret key is empty")


export interface DecodedToken {
  id: string;
  exp: number;
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1]
  if (!accessToken) {
    return res.status(401).json({ message: "No access token" });
  }

  // get token expiration time
  const { exp } = jwtDecode<DecodedToken>(accessToken)

  // check if token is expired
  if(exp * 1000 <= Date.now()) {
    // if expired clear token to logout user
    return res.status(401).clearCookie("token").json({ message: "Token expired" });
  }

  // verify token
  const decoded = verifyJwt(accessToken, accessJWTSecretKey) as DecodedToken

  const user = await prisma.user.findUnique({ where: { id: decoded.id } })
  
  if (!user) return res.status(401).json({ message: "User not found" })

  req.user = user
  next()
}

export const actionAuth = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User

  if(user.role === "USER" || user.role === "DEMO") {
    return res.status(403).json({ message: "Action Not allowed" })
  }
  next()
}