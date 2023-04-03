import axios, { InternalAxiosRequestConfig } from 'axios';
import { localStorageTokenKey } from '../../constants/auth';

export const API_URL = process.env.REACT_APP_API_URL;

export const $api = axios.create({
  baseURL: API_URL,
});

export const $authApi = axios.create({
  baseURL: API_URL,
});

const authInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(localStorageTokenKey)}`;
  return config;
};

$authApi.interceptors.request.use(authInterceptor);
