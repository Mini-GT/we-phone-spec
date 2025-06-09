import type { Request, Response, NextFunction } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { CustomAPIError } from "@/errors/customError";
import { verifyJwt } from "@/utils/jwt";
import prisma from "@/prismaClient";
import { jwtDecode } from "jwt-decode";

const jwtSecretKey = process.env.JWT_SECRET
if(!jwtSecretKey) throw new Error("JWT secret key is empty")

// Define a custom type for the Request with user property
interface AuthenticatedRequest extends Request {
  userId: JwtPayload;
}

interface DecodedToken {
  id: string;
  exp: number;
}

export const authentication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"]
    if(!token) return res.status(401).json({ message: "No token provided" })

    // Verify token
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        throw new CustomAPIError("Not authorized", 403)
      }

      if(!decoded) throw new CustomAPIError("Invalid Token", 404)
      
      const { id } = decoded as JwtPayload;
      req.userId = { id }
    });
    next()
  } catch (error) {
    next(error)
  }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  // if(req.isAuthenticated()) {
  //   return next()
  // }

  // res.status(401).json({ message: "Unauthorized"})
    const token = req.cookies.token || req.headers.cookie
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
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