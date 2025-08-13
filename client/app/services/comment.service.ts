import axios, { type AxiosInstance } from "axios";

class CommentsService {
  private api: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}/comments`,
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

  async getSmartphoneComments(smartphoneId: string, skip: number, take: number) {
    try {
      const response = await this.api.get("/", {
        params: { smartphoneId, skip, take }
      })
      return response.data
    } catch (error) {
      this.handleError(error);
    }
  }

  async addLikeToComment(commentId: string) {
    try {
      const response = await this.api.get(`/like/${commentId}`)
      return response.data
    } catch (error) {
      this.handleError(error);
    }
  }

  async dislikeToComment(commentId: string) {
    try {
      const response = await this.api.get(`/dislike/${commentId}`)
      return response.data
    } catch (error) {
      this.handleError(error);
    }
  }

  async editComment(commentId: string, newText: string) {
    try {
      const response = await this.api.patch(`/edit/${commentId}`, {
        text: newText
      })
      return response.data
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteComment(commentId: string) {
    try {
      const response = await this.api.delete(`/${commentId}`)
      return response.data
    } catch (error) {
      this.handleError(error);
    }
  }

  async sortComment(sortOrder: "asc" | "desc") {
    try {
      const response = await this.api.get(`/sort/${sortOrder}`)
      return response.data
    } catch (error) {
      this.handleError(error);
    }
  }


}

export default new CommentsService();