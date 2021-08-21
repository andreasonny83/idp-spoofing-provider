import axios, { AxiosRequestConfig } from 'axios';
import { SamlResponse } from '../../types';
import { retryInterceptor } from '../helpers/axios';

const extractJwt = (url: string): string => {
  const re = new RegExp(/(?<=Token=).*/);
  const match = url.match(re);

  if (!match || !match[0]) {
    throw new Error('Url does not contain JWT token');
  }

  return match[0];
};
interface SendResponseConfig {
  maxRetry?: number;
  maxRedirects?: number;
  validateStatus?: (status: number) => boolean;
}

export const sendResponse = async (
  destinationUrl: string,
  data: unknown,
  config?: SendResponseConfig,
  retryCallBack?: (retryMessage: string) => void,
): Promise<SamlResponse> => {
  const interceptorId = axios.interceptors.response.use(
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

  const response: { data: { redirect_to: string } } = await axios(requestOptions);
  axios.interceptors.response.eject(interceptorId);

  return {
    url: response.data.redirect_to,
    jwt: extractJwt(response.data.redirect_to),
  };
};
