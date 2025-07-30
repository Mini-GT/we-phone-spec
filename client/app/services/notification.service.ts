import type { AxiosInstance } from "axios";
import axios from "axios";
import type { ApiResponse, ChangePasswordType, NewDeviceNotificationType, Smartphone, UserType } from "~/types/globals.type";

class NotificationService {
  private api: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}/user`,
    withCredentials: true
  });

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

  async getNotifications(token?: string): Promise<ApiResponse> {
    try {
      const response = await this.api.get(
        "/notification", {
        headers: {
          Cookie: token
        }
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
    console.log(notifId)
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

  async deleteNotification(token: string, notifId: string): Promise<ApiResponse> {
    try {
      const response = await this.api.delete(
        `/notification/${notifId}`, {
        headers: {
          Cookie: token
        }
      })

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

export default new NotificationService();