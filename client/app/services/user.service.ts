import type { AxiosInstance } from "axios";
import axios from "axios";

class UserService {
  private api: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}/user`,
    withCredentials: true,
  });

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('API Error:', error.response.data);
        throw {
          status: error.response.status,
          message: error.response.data.message || 'An error occurred',
          details: error.response.data
        };
      } else if (error.request) {
        throw {
          status: 0,
          message: 'No response from server'
        };
      }
    }
    throw {
      status: 500,
      message: 'Unexpected error occurred'
    };
  }
  
  async getMe() {
  try {
    const response = await this.api.get("/me");
    return response.data;
  } catch (error) {
    this.handleError(error)
  }
}
  
  async updatetUser() {
    try {
      const response = await this.api.patch("/:userId")
      return response.data;
    } catch (error) {
      this.handleError(error)
    }
  } 
}

export default new UserService();