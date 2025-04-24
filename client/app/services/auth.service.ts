import axios, { type AxiosInstance } from "axios";
import type { RegisterFormType } from "~/types/globals.type";

class AuthService {
  private api: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}/auth`,
    withCredentials: true, // if using cookies
  });;

  async login(email: string, password: string) {
    const response = await this.api.post("/login", { email, password });
    return response.data;
  }

  async register(registerFormData: RegisterFormType) {
    const response = await this.api.post("/register", {
      ...registerFormData
    });
    return response.data;
  }

  async logout() {
    const response = await this.api.post("/logout");
    return response.data;
  }

  // get current user
  async getMe() {
    const response = await this.api.get("/me");
    return response.data;
  }
}

export default new AuthService();
