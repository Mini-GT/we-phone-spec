import axios, { type AxiosInstance } from "axios";
import type { loginFormType, RegisterFormType } from "~/types/globals.type";

class AuthService {
  isServer = typeof window === 'undefined'
  baseURL = this.isServer ? process.env.SMARTPHONE_API_URL : import.meta.env.VITE_SMARTPHONE_API_URL
  // baseURL = import.meta.env.VITE_SMARTPHONE_API_URL

  private api: AxiosInstance = axios.create({
    baseURL: `${this.baseURL}/auth`,
    withCredentials: true,
  });

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`API Error ${error.response.status}: ${error.response.data || 'An error occurred'}`);
      } else if (error.request) {
        throw new Error('No response from server');
      }
    }
    throw new Error('Unexpected error occurred');
  }

  async login(loginFormData: loginFormType) {
    try {
      const response = await this.api.post("/login", { ...loginFormData });
      return response.data;
    } catch (error) {
      return this.handleError(error)
    }
  }

  async register(registerFormData: RegisterFormType) {
    try {
      const response = await this.api.post("/register", { ...registerFormData });
      return response; 
    } catch (error) {
      this.handleError(error)
    }
  }

  async logout() {
    try {
      const response = await this.api.get("/logout");
      return response; 
    } catch (error) {
      this.handleError(error)
    }
  }
  
  async refresh(refreshToken: string) {
    try {
      const response = await this.api.get("/refreshToken", {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      return response.data;
    } catch (error) {
      this.handleError(error) 
    }
  }
}

export default new AuthService();
