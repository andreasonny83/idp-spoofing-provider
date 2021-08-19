import axios, { AxiosError } from 'axios';

export const retryInterceptor = async (
  error: AxiosError,
  retryCallBack?: (retryMessage: string) => void,
): Promise<void> => {
  const config = error.config;
  const { max, current } = error.config.retry;
  const currentTry = current ? current : 1;

  if (error) {
    if (config.method && config.url && config.data && currentTry <= max) {
      await new Promise((response) => setTimeout(response, 1000));
      config.retry.current = currentTry + 1;
      if (retryCallBack) {
        retryCallBack(`Retrying... [${currentTry}/${max}]`);
      }
      await axios(config);
    } else {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  }
};
