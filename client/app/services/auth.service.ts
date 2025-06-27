import axios, { type AxiosInstance } from "axios";
import type { loginFormType, RegisterFormType } from "~/types/globals.type";

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
}

export default new AuthService();
