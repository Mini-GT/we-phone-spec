import type { AxiosInstance } from "axios";
import axios from "axios";
import type { ChangePasswordType, Smartphone, UserType } from "~/types/globals.type";

class UserService {
  private api: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}/user`,
  });

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

  async updatetUser(token: string, updatedForm: Partial<UserType>, userId: string) {
    try {
      const response = await this.api.patch(
        `/${userId}`,
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

  async changePassword(token: string, passwordFormData: ChangePasswordType, userId: string) {
    try {
      const response = await this.api.patch(`/change-password/${userId}`, passwordFormData, {
        headers: {
          Cookie: token
        }
      })
      const result = {
        status: response.status,
        message: response.data
      }
      return result;
    } catch (error) {
      return this.handleError(error)
    }
  }

  async changeName(token: string, name: string, userId: string) {
    try {
      const response = await this.api.patch(`/change-name/${userId}`, { name }, {
        headers: {
          Cookie: token
        }
      })
      return response.data;
    } catch (error) {
      return this.handleError(error)
    }
  }

  async addToLikes(token: string, deviceId: Smartphone["_id"]) {
    try {
      const response = await this.api.post(
        "/add-to-likes", { deviceId }, {
          headers: {
            Cookie: token
          }
        }
      );

      const result = {
        status: response.status,
        message: response.data 
      }
      return result;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getUserLikes(token: string) {
    try {
      const response = await this.api.get(
        "/likes", {
          headers: {
            Cookie: token
          }
        }
      );

      const result = {
        status: response.status,
        message: response.data 
      }
      return result;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export default new UserService();