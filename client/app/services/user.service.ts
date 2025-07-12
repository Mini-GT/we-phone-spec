import type { AxiosInstance } from "axios";
import axios from "axios";
import type { UserType } from "~/types/globals.type";

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

  async addNewUser(userFormData: UserType, token: string) {
    try {
      const response = await this.api.post(
        "/new", 
        userFormData, {
        headers: {
          Cookie: token
        }
      })
      return response.data;
    } catch (error) {
      this.handleError(error)
    }
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

  async updatetUser(token: string, updatedForm: Partial<UserType>, id: string) {
    try {
      const response = await this.api.patch(
        `/${id}`,
        updatedForm, {
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

  async changePassword(token: string, formData: string) {
    try {
      const response = await this.api.patch("/change-password", {
      headers: {
        Cookie: token
      }
    })
      return response.data;
    } catch (error) {
      this.handleError(error)
    }
  }

  async changeName(token: string, name: string, id: string) {
    try {
      const response = await this.api.patch(`/change-name/${id}`, { name }, {
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