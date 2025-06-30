import axios, { type AxiosInstance } from 'axios';

class UsersService {
  private api: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}`,
  });

  // get all users
  async getUsers(token: string) {
    try {
      const response = await this.api.get("/users", {
      headers: {
        Cookie: token 
      }
    });

      if (!response) {
        throw new Error("Failed to fetch users");
      }

      return response;
    } catch (error) {
      console.error(error)
    } 
  }

}

export default new UsersService();