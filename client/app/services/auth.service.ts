import axios, { type AxiosInstance } from "axios";
import { redirect } from "react-router";
import type { loginFormType, RegisterFormType } from "~/types/globals.type";
import { isTokenValid } from "~/utils/tokenValidator";

class AuthService {
  private api: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}/auth`,
    withCredentials: true, // if using cookies
  });

  async login(loginFormData: loginFormType) {
      const response = await this.api.post("/login", { ...loginFormData });
      return response;
  }

  async register(registerFormData: RegisterFormType) {
    const response = await this.api.post("/register", { ...registerFormData });
    return response;
  }

  async logout() {
    const response = await this.api.get("/logout");
    return response;
  }
  
  publicRoute(request: Request): string | null {
    const userCookieToken = request.headers.get("Cookie")
    if(!userCookieToken) return null
    // check token expiration
    const valid = isTokenValid(userCookieToken);

    return valid ? userCookieToken : null
  }
  
  privateRoute(request: Request): string | null {
    const userCookieToken = request.headers.get("Cookie")
    if(!userCookieToken) return null
    const valid = isTokenValid(userCookieToken);

    if(!valid) throw redirect("unauthorized")

    return userCookieToken
  } 
}

export default new AuthService();
