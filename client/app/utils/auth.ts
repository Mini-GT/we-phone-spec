import { redirect } from "react-router";
import { isTokenValid } from "./tokenValidator";

export async function requireAuthCookie(request: Request) {
  const userCookieToken = request.headers.get("Cookie")?.split("=")[1];

  // check token expiration
  const token = isTokenValid(userCookieToken || "");

  // If the token is expired, redirect to unauthorized page
  if (!token) {
    throw redirect("/unauthorized");
  }

  return userCookieToken
}
