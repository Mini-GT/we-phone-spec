import { redirect } from "react-router";
import { isTokenValid } from "./tokenValidator";

export async function requireAuthCookie(request: Request) {
  const userCookie = request.headers.get("Cookie");

  // check token expiration
  const token = isTokenValid(userCookie || "");

  // If the token is expired, redirect to unauthorized page
  if (!token) {
    throw redirect("/unauthorized");
  }

  return userCookie
}
