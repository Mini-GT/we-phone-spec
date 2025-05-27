import { redirect } from "react-router";

export async function requireAuthCookie(request: Request) {
  const userCookie = request.headers.get("Cookie");
  
  if (!userCookie) {
    throw redirect("/unauthorized");
  }

  return userCookie
}
