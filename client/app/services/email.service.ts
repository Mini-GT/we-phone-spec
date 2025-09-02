import type { AxiosInstance } from "axios";
import axios from "axios";


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

  // get current user
  async sendEmailVerification() {
    const response = await this.api.post("/send-email-verification");
    return response.data;
  }

  async verifyEmail(verifyToken: string) {
    const response = await this.api.get("/verify-email", {
      params: { verifyToken }
    });
    return response
  }
}

export default EmailService;