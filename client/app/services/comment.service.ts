import axios, { type AxiosInstance } from "axios";

class CommentsService {
  private api: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}`,
    withCredentials: true,  });
  
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

  async getSmartphoneComments(smartphoneId: string) {
    try {
      const response = await this.api.get(`/comments/${smartphoneId}`);
      return response.data
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default new CommentsService();