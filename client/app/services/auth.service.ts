import axios, { type AxiosInstance } from "axios";
import type { loginFormType, RegisterFormType } from "~/types/globals.type";
import { isTokenValid } from "~/utils/tokenValidator";

class AuthService {
  private api: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}/auth`,
    withCredentials: true, // if using cookies
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

  async login(loginFormData: loginFormType) {
      const response = await this.api.post("/login", { ...loginFormData });
      return response.data;
  }

  async register(registerFormData: RegisterFormType) {
    const response = await this.api.post("/register", { ...registerFormData });
    return response;
  }

  async logout() {
    const response = await this.api.get("/logout");
    return response;
  }

  async refresh(refreshToken: string) {
    try {
      const response = await this.api.get("/refreshToken", {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      return response.data;
    } catch (error) {
      this.handleError(error) 
    }
  }
  
  // async refresh(cookieHeader: string): Promise<string | null> {
  //   try {
  //     console.log("🔄 Making refresh request with cookies:", cookieHeader);
      
  //     // Use axios instance but with manual cookie header
  //     const response = await axios.get('/refreshToken', {
  //       baseURL: `${import.meta.env.VITE_SMARTPHONE_API_URL}/auth`,
  //       withCredentials: true,
  //       headers: {
  //         'Cookie': cookieHeader
  //       }
  //     });

  //     console.log("✅ Refresh successful:", response.data);
  //     return response.data.accessToken;
  //   } catch (error) {
  //     console.error('❌ Refresh error:', error);
  //     throw error;
  //   }
  // }

  publicRoute(request: Request): string | null {
    const userCookieToken = request.headers.get("Cookie")
    if(!userCookieToken) return null
    // check token expiration
    const valid = isTokenValid(userCookieToken);
    return valid ? userCookieToken : null
  }
  
  async privateRoute(request: Request): Promise<object | null> {
    const cookieHeader = request.headers.get("Cookie")

    if (!cookieHeader) return null

    const accessCookie = cookieHeader
      .split(";")
      .find(c => c.trim().startsWith("accessToken="))

    const refreshCookie = cookieHeader
      .split(";")
      .find(c => c.trim().startsWith("refreshToken="))

    const accessToken = accessCookie?.split("=")[1]
    const refreshToken = refreshCookie?.split("=")[1]

    if (!isTokenValid(accessToken)) {
      const res = await this.refresh(refreshToken as string)
      console.log(res)
      return { accessToken }
    }
    // console.log(refreshCookie, accessCookie)
    // return
    // If access invalid, try refresh
    // if (refreshToken && isTokenValid(refreshToken)) {
    //   try {
    //     const { accessToken } = await this.refresh(refreshToken)
    //     console.log(accessToken)
    //   } catch {
    //     return null;
    //   }
    // }

    // if (refreshToken && isTokenValid(refreshToken)) {
    //   return { refreshToken }
    //   // try {
    //   //   const newAccessToken = await this.refresh(refreshToken);
    //   //   return newAccessToken;
    //   // } catch (error) {
    //   //   console.error("Token refresh failed:", error);
    //   //   return null;
    //   // }
    // }

    return { refreshToken, accessToken};
  }
}

export default new AuthService();
