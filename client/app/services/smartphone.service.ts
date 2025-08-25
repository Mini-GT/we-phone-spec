import axios, { type AxiosInstance } from 'axios';
import type { ApiTopDeviceResponse, Smartphone } from '~/types/globals.type';

class SmartphoneService {
  private api: AxiosInstance;

  constructor(accessToken?: string) {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}`,
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

  // fetch all smartphones with optional filters
  async getSmartphones()  {
    try {
      const { data } = await this.api.get("/smartphones")
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
  async getSmartphonesByBrand(brand: string) {
    try {
      const response = await this.api.get(`/smartphones/brand-list/${brand}`);
      return response.data.result;
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
  
  async getTopAllTimeViewedSmartphones(query: string): Promise<ApiTopDeviceResponse | undefined> {
    try {
      const response = await this.api.get(`/smartphones/views/top${query}`);
      return response.data
    } catch (error) {
      this.handleError(error);
    }
  }
  
  async getTopLikedSmartphones(query: string): Promise<ApiTopDeviceResponse | undefined> {
    try {
      const response = await this.api.get(`/smartphones/likes/top${query}`);
      return response.data
    } catch (error) {
      this.handleError(error);
    }
  }

  async getNewAddedSmartphones(query: string): Promise<ApiTopDeviceResponse | undefined> {
    try {
      const response = await this.api.get(`/smartphones/new-added${query}`);
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