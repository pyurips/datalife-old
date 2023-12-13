import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';

const DEFAULT_URL = import.meta.env.PROD
  ? 'https://api.dataliferp.com'
  : 'http://localhost:3500';

type IUseFetcher = {
  resource: string;
  method: 'get' | 'post' | 'delete' | 'put' | 'patch';
  body?: any;
  configs?: AxiosRequestConfig<any>;
};

export default function useFetcher(options: IUseFetcher) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [error, setError] = useState<{
    message: string;
    internalCode: number;
    status: number;
  } | null>(null);

  const loadingHandler = (state: boolean) => setLoading(state);

  const fetchData = async () => {
    setLoading(true);
    try {
      let response: AxiosResponse;

      switch (options.method) {
        case 'get':
          response = await axios.get(
            DEFAULT_URL + options.resource,
            options.configs
          );
          break;
        case 'post':
          response = await axios.post(
            DEFAULT_URL + options.resource,
            options.body,
            options.configs
          );
          break;
        case 'delete':
          response = await axios.delete(
            DEFAULT_URL + options.resource,
            options.configs
          );
          break;
        case 'put':
          response = await axios.put(
            DEFAULT_URL + options.resource,
            options.body,
            options.configs
          );
          break;
        case 'patch':
          response = await axios.patch(
            DEFAULT_URL + options.resource,
            options.body,
            options.configs
          );
          break;
        default:
          throw new Error('Método HTTP não suportado');
      }

      setData(response.data);
      setStatus(response.status);
    } catch (e: any) {
      setError({
        message: e.response.data.message,
        internalCode: e.response.data.internalCode,
        status: e.response.status,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    status,
    loading,
    error,
    fetchData,
    loadingHandler,
  };
}
