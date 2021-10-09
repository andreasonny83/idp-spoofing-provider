import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { retryInterceptor } from '../helpers/axios.js';
interface SendResponseConfig {
  maxRetry?: number;
  maxRedirects?: number;
  validateStatus?: (status: number) => boolean;
}

export const sendResponse = async <T>(
  destinationUrl: string,
  data: unknown,
  config?: SendResponseConfig,
  retryCallBack?: (retryMessage: string) => void,
): Promise<AxiosResponse<T>> => {
  axios.interceptors.response.use(
    (res) => res,
    (err) => retryInterceptor(err, retryCallBack),
  );

  const requestOptions: AxiosRequestConfig = {
    method: 'POST',
    url: destinationUrl,
    ...(config?.validateStatus
      ? {
          validateStatus(status: number) {
            return Boolean(config?.validateStatus && config?.validateStatus(status));
          },
        }
      : {
          validateStatus(status: number) {
            return status === 303;
          },
        }),
    retry: {
      max: config?.maxRetry || 1,
    },
    maxRedirects: config?.maxRedirects || 0,
    data,
  };

  return axios(requestOptions);
};
