import axios, { type AxiosInstance } from "axios";
import type { SmartphoneCommentsDataType } from "~/types/globals.type";

class CommentsService {
  private api: AxiosInstance;

  constructor(accessToken?: string) {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}/comments`,
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

  // async getSmartphoneComments(smartphoneId: string, skip: number, take: number) {
  //   try {
  //     const response = await this.api.get("/", {
  //       params: { smartphoneId, skip, take }
  //     })
  //     return response.data
  //   } catch (error) {
  //     this.handleError(error);
  //   }
  // }

  async getSmartphoneComments(
    smartphoneId: string, 
    skip: number, 
    take: number, 
    orderBy: SmartphoneCommentsDataType["orderBy"], 
    sortDirection: SmartphoneCommentsDataType["sortDirection"]
  ) {
    try {
      const response = await this.api.get("/", {
        params: { smartphoneId, skip, take, orderBy, sortDirection }
      })
      return response.data
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addLikeToComment(commentId: string) {
    try {
      const response = await this.api.get(`/like/${commentId}`)
      return response.data
    } catch (error) {
      return this.handleError(error);
    }
  }

  async dislikeToComment(commentId: string) {
    try {
      const response = await this.api.get(`/dislike/${commentId}`)
      return response.data
    } catch (error) {
      return this.handleError(error);
    }
  }

  async editComment(commentId: string, newText: string) {
    try {
      const response = await this.api.patch(`/edit/${commentId}`, {
        text: newText
      })
      return response.data
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addNewCommet(newComment: object) {
    try {
      const response = await this.api.post(`/new`, newComment)
      return response.data
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteComment(commentId: string) {
    try {
      const response = await this.api.delete(`/${commentId}`)
      return response
    } catch (error) {
      return this.handleError(error);
    }
  }

  async sortComment(sortOrder: "asc" | "desc") {
    try {
      const response = await this.api.get(`/sort/${sortOrder}`)
      return response.data
    } catch (error) {
      return this.handleError(error);
    }
  }


}

export default CommentsService;