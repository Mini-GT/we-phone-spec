import type { AxiosInstance } from "axios";
import axios from "axios";


class UserService {
  private api: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}`,
    withCredentials: true,
  });

  // get all users
  async getUsers(headers?: Record<string, string>) {
    const response = await this.api.get("/users", {
      headers,
    });
    return response;
  }

}

export default new UserService();