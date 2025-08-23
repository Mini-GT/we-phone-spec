import jwt from "jsonwebtoken";

const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET!;
const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET!;
if (!ACCESS_JWT_SECRET || !REFRESH_JWT_SECRET) throw new Error("Missing JWT_SECRET");

export function signJwt(payload: object, expiresIn: object, secretKey: string) {
  return jwt.sign(
      payload,
      secretKey,
      expiresIn
    )
}

export function verifyJwt(token: string, secretKey: string) {
  return jwt.verify(token, secretKey);
}