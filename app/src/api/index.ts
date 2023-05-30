import axios, {AxiosRequestConfig} from 'axios';

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:8080',
};

export const customAxiosInstance = axios.create(config);
