import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET!;
const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET!;
if (!ACCESS_JWT_SECRET || !REFRESH_JWT_SECRET) throw new Error("Missing JWT_SECRET");

export function signJwt(payload: object, secretKey: string, expiresIn: object) {
  return jwt.sign(
      payload,
      secretKey,
      expiresIn
    )
}

export function verifyJwt(token: string, secretKey: string) {
  return jwt.verify(token, secretKey);
}

export const isTokenValid = (token?: string): boolean => {
  // const token = cookie?.split("=")[1] || ""
  if (!token) return false

  try {
    const { exp } = jwtDecode(token)

    // if invalid token structure
    if (typeof exp !== "number") {
      return false;
    }

    return exp * 1000 > Date.now()
  } catch {
    return false;
  }
};