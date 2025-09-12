import axios, { type AxiosInstance } from 'axios';
import type { ApiTopDeviceResponse, PaginationQuery, Smartphone } from '~/types/globals.type';

class SmartphoneService {
  private api: AxiosInstance;

  constructor(accessToken?: string) {
    const isServer = typeof window === 'undefined'
    const baseURL = isServer ? process.env.SMARTPHONE_API_URL : import.meta.env.VITE_SMARTPHONE_API_URL
    this.api = axios.create({
      baseURL: `${baseURL}`,
      withCredentials: true,
    });

    this.api.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
  }

  // error handler
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

  // fetch all smartphones with optional filters
  async getSmartphones(take?: number, skip?: number)  {
    try {
      const { data } = await this.api.get("/smartphones", {
        params: {skip, take, }
      })
      return data 
    } catch (error) {
      this.handleError(error);
    }
  }

  // get a specific smartphone by ID
  async getSmartphoneById(id: string) {
    try {
      const response = await this.api.get(`/smartphones/${id}`);
      return response.data.msg;
    } catch (error) {
      this.handleError(error);
    }
  }

  // create a new smartphone
  async createSmartphone(smartphoneData: Omit<Smartphone, 'id'>) {
    try {
      const response = await this.api.post('/smartphones', smartphoneData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // update an existing smartphone
async updateSmartphone(id: string, updatedForm: Partial<Smartphone>) {
    try {
      const response = await this.api.patch(`/smartphones/${id}`, updatedForm)
      return response.data
    } catch (error) {
      this.handleError(error);
    }
  }

  // delete a smartphone
  async deleteSmartphone(id: string): Promise<void> {
    try {
      await this.api.delete(`/smartphones/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  // get smartphone by brand
  async getSmartphonesByBrand(brand: string, take?: number, skip?: number) {
    try {
      const { data } = await this.api.get(`/smartphones/brand-list/${brand}`, {
        params: { skip, take }
      });
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // get smartphone by search
  async searchSmartphone(query: string) {
    try {
      const response = await this.api.get("/smartphones/search", {
        params: { q: query }
      });
      return response.data
    } catch (error) {
      this.handleError(error);
    }
  }

  // get smartphone by search
  async viewSmartphone(devicecId: string) {
    try {
      const response = await this.api.patch(`/smartphones/view/${devicecId}`);
      return response.data
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTopDevicesByViewStats(): Promise<ApiTopDeviceResponse | undefined> {
    try {
      const response = await this.api.get("/smartphones/top-view-stats");
      return response.data
    } catch (error) {
      this.handleError(error);
    }
  }
  
  async getTopAllTimeViewedSmartphones(skip?: number, take?: number): Promise<ApiTopDeviceResponse | undefined> {
    try {
      const response = await this.api.get(`/smartphones/views/top`, {
        params: { skip, take }
      });
      return response.data
    } catch (error) {
      this.handleError(error);
    }
  }
  
  async getTopLikedSmartphones(skip?: number, take?: number): Promise<ApiTopDeviceResponse | undefined> {
    try {
      const response = await this.api.get(`/smartphones/likes/top`, {
        params: { skip, take }
      });
      return response.data
    } catch (error) {
      this.handleError(error);
    }
  }

  async getNewAddedSmartphones(skip?: number, take?: number): Promise<ApiTopDeviceResponse | undefined> {
    try {
      const response = await this.api.get(`/smartphones/new-added`, {
        params: { skip, take }
      });
      return response.data
    } catch (error) {
      this.handleError(error);
    }
  }


  // Price range filter
  // async getSmartphonesByPriceRange(minPrice: number, maxPrice: number): Promise<Smartphone[]> {
  //   return this.getSmartphones({ minPrice, maxPrice });
  // }
}

export default SmartphoneService;