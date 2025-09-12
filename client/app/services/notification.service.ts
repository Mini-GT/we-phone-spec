import type { AxiosInstance } from "axios";
import axios from "axios";
import type { ApiResponse, NewDeviceNotificationType, NotificationType } from "~/types/globals.type";

class NotificationService {
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

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`API Error ${error.response.status}: ${error.response.data || 'An error occurred'}`);
      } else if (error.request) {
        throw new Error('No response from server');
      }
    }
    throw new Error('Unexpected error occurred');
  }

  async addNotification(notification: NewDeviceNotificationType): Promise<ApiResponse> {
    try {
      const response = await this.api.post(
        "/notification", notification
      );

      const result = {
        statusCode: response.status,
        message: response.data
      }
      return result;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getNotifications(take?: number, skip?: number): Promise<ApiResponse> {
    try {
      const response = await this.api.get("/notification", {
        params: {skip, take, }
      });

      const result = {
        statusCode: response.status,
        message: response.data
      }
      return result;
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  async markNotificationAsRead(notifId: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post(
        "/notification/mark-read", { notifId }
      );

      const result = {
        statusCode: response.status,
        message: response.data
      }
      return result;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteNotification(notifId: string): Promise<ApiResponse> {
    try {
      const response = await this.api.delete(`/notification/${notifId}`)

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

export default NotificationService;