import type { AxiosInstance } from "axios";
import axios from "axios";


class EmailService {
  private api: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}/user`,
    withCredentials: true,
  });

  // get current user
  async sendEmailVerification() {
    const response = await this.api.post("/send-email-verification");
    return response.data;
  }
}

export default new EmailService();