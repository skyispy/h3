declare namespace axios {
    interface AxiosRequestConfig {
      url?: string;
      method?: string;
      baseURL?: string;
      headers?: any;
      params?: any;
      data?: any;
      timeout?: number;
      responseType?: string;
    }
  
    interface AxiosResponse<T = any> {
      data: T;
      status: number;
      statusText: string;
      headers: any;
      config: AxiosRequestConfig;
      request?: any;
    }
  
    interface AxiosInstance {
      (config: AxiosRequestConfig): Promise<AxiosResponse>;
      (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  
      get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
      delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
      post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
      put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
      patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  
      create(config?: AxiosRequestConfig): AxiosInstance;
    }
  
  }
    
  declare const axios: axios.AxiosInstance;
  
  declare module "axios" {
    export = axios;
  }