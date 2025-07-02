
import { jwtDecode } from "jwt-decode";

export const isTokenValid = (cookie: string | null): boolean => {
  const token = cookie?.split("=")[1] || ""
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