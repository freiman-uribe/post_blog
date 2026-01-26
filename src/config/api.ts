import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: Number(import.meta.env.VITE_API_TIMEOUT),
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors(): void {
    this.client.interceptors.response.use(
      this.handleResponse as any,
      this.handleError,
    );
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  private handleError(error: AxiosError): never {
    if (error.response) {
      const message =
        (error.response.data as any)?.message ||
        `Error ${error.response.status}`;

      throw new Error(message);
    }

    if (error.request) {
      throw new Error("No se recibió respuesta del servidor");
    }

    throw new Error(error.message);
  }

  get<T>(url: string, params?: any): Promise<T> {
    return this.client.get<T>(url, { params }) as Promise<T>;
  }
}

export const httpClient = new HttpClient();