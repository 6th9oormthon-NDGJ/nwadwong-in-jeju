import { useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export default function useAxios<T>(): [
  boolean,
  (
    config: AxiosRequestConfig,
    handleResponse?: (response: AxiosResponse<T>) => void
  ) => void
] {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = (
    config: AxiosRequestConfig,
    handleResponse?: (response: AxiosResponse<T>) => void
  ) => {
    axios
      .request(config)
      .then((response: AxiosResponse<T>) => {
        setLoading(true);
        handleResponse && handleResponse(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return [loading, fetchData];
}
