import type { AxiosInstance } from "axios";
import axios from "axios";
import type { AvatarTypes } from "~/components/avatarPicker";
import type { ApiResponse, ChangePasswordType, Smartphone, UserType } from "~/types/globals.type";

class UserService {
  private api: AxiosInstance;

  constructor(accessToken?: string) {
    const isServer = typeof window === 'undefined'
    const baseURL = isServer ? process.env.SMARTPHONE_API_URL : import.meta.env.VITE_SMARTPHONE_API_URL
    this.api = axios.create({
      baseURL: `${baseURL}/user`,
      withCredentials: true,
    });

    this.api.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
  }

  private handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          statusCode: error.response.status,
          message: error.response.data || 'An error occurred',
        };
      } else if (error.request) {
        return {
          statusCode: 0,
          message: 'No response from server'
        };
      }
    }
    return {
      statusCode: 500,
      message: 'Unexpected error occurred'
    };
  }

  async addNewUser(userFormData: UserType) {
    try {
      const response = await this.api.post("/new", userFormData)
      return response.data;
    } catch (error) {
      this.handleError(error)
    }
  }
  
  async getMe() {
    try {
      const response = await this.api.get("/me")
      return response.data;
    } catch (error) {
      this.handleError(error)
    }
  }

  async getUserById(userId: string) {
    try {
      const response = await this.api.get(`/${userId}`)
      return response.data;
    } catch (error) {
      this.handleError(error)
    }
  }

  async updatetUser(updatedForm: Partial<UserType>, userId: string) {
    try {
      const response = await this.api.patch(`/${userId}`, updatedForm)
      return response.data;
    } catch (error) {
      this.handleError(error)
    }
  } 

  async deleteUser(userId: string) {
    try {
      const response = await this.api.delete(`/${userId}`)
      return response.data;
    } catch (error) {
      this.handleError(error)
    }
  }

  async changePassword(passwordFormData: ChangePasswordType, userId: string) {
    try {
      const response = await this.api.patch(`/change-password/${userId}`, passwordFormData)
      const result = {
        status: response.status,
        message: response.data
      }
      return result;
    } catch (error) {
      return this.handleError(error)
    }
  }

  async changeName(name: string, userId: string) {
    try {
      const response = await this.api.patch(`/change-name/${userId}`, { name })
      return response.data;
    } catch (error) {
      return this.handleError(error)
    }
  }

  async addToLikes(deviceId: Smartphone["_id"]): Promise<ApiResponse> {
    try {
      const response = await this.api.post("/add-to-likes", { deviceId });

      const result = {
        statusCode: response.status,
        message: response.data 
      }
      return result;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getUserLikes(): Promise<ApiResponse> {
    try {
      const response = await this.api.get("/likes");

      const result = {
        statusCode: response.status,
        message: response.data
      }
      return result;
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  async getUserLikeListSmartphoneData(smartphoneIds: string[]): Promise<ApiResponse> {
    try {
      const response = await this.api.post("/like-list", { smartphoneIds });

      const result = {
        statusCode: response.status,
        message: response.data
      }
      return result;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateProfileImage(profileImage: AvatarTypes): Promise<ApiResponse> {
    try {
      const response = await this.api.patch("/update-profile-image", { profileImage });

      const result = {
        statusCode: response.status,
        message: response.data
      }
      return result;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteLikedDevice(smartphoneId: string): Promise<ApiResponse> {
    try {
      const response = await this.api.delete(`/${smartphoneId}`);

      const result = {
        statusCode: response.status,
        message: response.data
      }
      return result;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export default UserService;