// api/smartphoneService.ts
import axios, { type AxiosInstance } from 'axios';
import type { Smartphone } from '~/types/globals.type';

class SmartphoneService {
  private api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SMARTPHONE_API_URL || 'http://localhost:3000/api/v1',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // error handler
  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('API Error:', error.response.data);
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

  // fetch all smartphones with optional filters
  async getSmartphones(): Promise<Smartphone[]> {
    try {
      const response = await this.api.get('/smartphones');
      return response.data.msg;
    } catch (error) {
      this.handleError(error);
    }
  }

  // get a specific smartphone by ID
  async getSmartphoneById(id: string): Promise<Smartphone> {
    try {
      const response = await this.api.get(`/smartphones/${id}`);
      return response.data.msg;
    } catch (error) {
      this.handleError(error);
    }
  }

  // create a new smartphone
  async createSmartphone(smartphoneData: Omit<Smartphone, 'id'>): Promise<Smartphone> {
    try {
      const response = await this.api.post('/smartphones', smartphoneData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // update an existing smartphone
  async updateSmartphone(id: string, updateData: Partial<Smartphone>): Promise<Smartphone> {
    try {
      const response = await this.api.patch(`/smartphones/${id}`, updateData);
      return response.data;
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
  async getSmartphonesByBrand(brand: string): Promise<Smartphone[]> {
    try {
      const response = await this.api.get(`/smartphones/brand-list/${brand}`);
      return response.data.result;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Price range filter
  // async getSmartphonesByPriceRange(minPrice: number, maxPrice: number): Promise<Smartphone[]> {
  //   return this.getSmartphones({ minPrice, maxPrice });
  // }
}

export default new SmartphoneService();