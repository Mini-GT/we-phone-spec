import axios, { type AxiosInstance } from "axios";
import type { loginFormType, RegisterFormType } from "~/types/globals.type";

class AuthService {
  private api: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}/auth`,
    withCredentials: true, // if using cookies
  });

  private handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          status: error.response.status,
          message: error.response.data || 'An error occurred',
        };
      } else if (error.request) {
        return {
          status: 0,
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
