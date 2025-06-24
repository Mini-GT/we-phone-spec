import type { AxiosInstance } from "axios";
import axios from "axios";


class UserService {
  private api: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}`,
    withCredentials: true,
  });

  // get all users
  async getUsers(headers?: Record<string, string>) {
    try {
      const response = await this.api.get("/users", {
        headers,
      });

      if (!response || !response.data) {
        throw new Error("Failed to fetch users");
      }

      return response;
    } catch (error) {
      console.error(error)
    } 
  }

}

export default new UserService();