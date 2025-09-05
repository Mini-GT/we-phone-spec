import type { AxiosInstance } from "axios";
import axios from "axios";
import type { emailInput } from "~/schema/email.schema";
import type { passwordInput } from "~/schema/password.schema";


class EmailService {
  private api: AxiosInstance;

  constructor(accessToken?: string) {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}/email`,
    });

    this.api.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
  }

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
      status: 500,
      message: 'Unexpected error occurred'
    };
  }

  // get current user
  async sendEmailVerification() {
    try {
      const response = await this.api.post("/send-email-verification");
      return response.data;
    } catch (error) {
      return this.handleError(error) 
    }
  }
  
  async forgotPassword(email: emailInput) {
    try {
      const response = await this.api.get("/forgot-password", {
        params: { email }
      })
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async resetPassword(password: string, confirmPassword: string, email: string, resetToken: string) {
    try {
      const response = await this.api.patch("/reset-password", {
        password, 
        confirmPassword,
        email,
        resetToken
      })
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async verifyEmail(emailVerifyToken: string) {
    try {
      const response = await this.api.get("/verify-email", {
        params: { emailVerifyToken }
      });
      return response
    } catch (error) {
      return this.handleError(error) 
    }
  }
}

export default EmailService;