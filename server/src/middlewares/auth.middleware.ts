import type { Request, Response, NextFunction } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { CustomAPIError } from "@/errors/customError";

const jwtSecretKey = process.env.JWT_SECRET
if(!jwtSecretKey) throw new Error("JWT secret key is empty")

// Define a custom type for the Request with user property
interface AuthenticatedRequest extends Request {
  userId: JwtPayload;
}

export const authentication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"]
    if(!token) return res.status(401).json({ message: "No token provided" })

    // Verify token
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        console.log(err)
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

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if(req.isAuthenticated()) {
    return next()
  }

  res.status(401).json({ message: "Unauthorized"})
}