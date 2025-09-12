import axios, { type AxiosInstance } from 'axios';

class UsersService {
  private api: AxiosInstance;

  constructor(accessToken?: string) {
    this.api = axios.create({
      baseURL: `${process.env.SMARTPHONE_API_URL || import.meta.env.VITE_SMARTPHONE_API_URL}`,
      withCredentials: true,
    });

    this.api.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
  }

  // get all users
  async getUsers() {
    try {
      const response = await this.api.get("/users");

      if (!response) {
        throw new Error("Failed to fetch users");
      }

      return response;
    } catch (error) {
      console.error(error)
    } 
  }

}

export default UsersService;