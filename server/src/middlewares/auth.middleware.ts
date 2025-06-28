import type { Request, Response, NextFunction } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { CustomAPIError } from "@/errors/customError";
import { verifyJwt } from "@/utils/jwt";
import prisma from "@/prismaClient";
import { jwtDecode } from "jwt-decode";

const jwtSecretKey = process.env.JWT_SECRET
if(!jwtSecretKey) throw new Error("JWT secret key is empty")

interface DecodedToken {
  id: string;
  exp: number;
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  // if(req.isAuthenticated()) {
  //   return next()
  // }
  console.log("Cookies:", req.cookies);
  console.log("Headers:", req.headers);

    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ message: "No access token" });
    }

    // get token expiration time
    const { exp } = jwtDecode<DecodedToken>(token)

    // check if token is expired
    if(exp * 1000 <= Date.now()) {
      // if expired clear token to logout user
      return res.status(401).clearCookie("token").json({ message: "Token expired" });
    }

    // verify token
    const decoded = verifyJwt(token) as DecodedToken

    const user = await prisma.user.findUnique({ where: { id: decoded.id } })
    
    if (!user) return res.status(401).json({ message: "User not found" })

    req.user = user
    next()
}