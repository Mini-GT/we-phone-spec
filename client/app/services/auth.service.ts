import axios, { type AxiosInstance } from "axios";
import type { loginFormType, RegisterFormType } from "~/types/globals.type";
import { isTokenValid } from "~/utils/tokenValidator";

class AuthService {
  private api: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}/auth`,
    withCredentials: true, // if using cookies
  });

  private handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          statusCode: error.response.status,
          message: error.response.data || 'An error occurred',
        };
      } else if (error.request) {
        return {
          statusCode: 0,
          message: 'No response from server'
        };
      }
    }
    return {
      statusCode: 500,
      message: 'Unexpected error occurred'
    };
  }

  async login(loginFormData: loginFormType) {
      const response = await this.api.post("/login", { ...loginFormData });
      return response.data;
  }

  async register(registerFormData: RegisterFormType) {
    const response = await this.api.post("/register", { ...registerFormData });
    return response;
  }

  async logout() {
    const response = await this.api.get("/logout");
    return response;
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
