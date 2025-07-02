import type { AxiosInstance } from "axios";
import axios from "axios";

class UserService {
  private api: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}/user`,
  });

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      if (error.response) {
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
  
  async getMe(token: string) {
    try {
      const response = await this.api.get("/me", {
        headers: {
          Cookie: token
        }
      })
      return response.data;
    } catch (error) {
      this.handleError(error)
    }
  }

  async getUserById(token: string, userId: string) {
    try {
      const response = await this.api.get(`/${userId}`, {
        headers: {
          Cookie: token
        }
      })
      return response.data;
    } catch (error) {
      this.handleError(error)
    }
  }

  async updatetUser(token: string, userId: string) {
    try {
      const response = await this.api.patch(`/${userId}`, {
      headers: {
        Cookie: token
      }
    })
      return response.data;
    } catch (error) {
      this.handleError(error)
    }
  } 

  async deleteUser(token: string, userId: string) {
    try {
      const response = await this.api.delete(`/${userId}`, {
      headers: {
        Cookie: token
      }
    })
      return response.data;
    } catch (error) {
      this.handleError(error)
    }
  }
}

export default new UserService();