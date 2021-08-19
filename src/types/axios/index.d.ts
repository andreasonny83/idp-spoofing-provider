import 'axios';

interface Retry {
  max: number;
  current?: number;
}

declare module 'axios' {
  export interface AxiosRequestConfig extends AxiosRequestConfig {
    retry: Retry;
  }
}
