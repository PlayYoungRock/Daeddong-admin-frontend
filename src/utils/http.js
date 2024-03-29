import axios, { isAxiosError } from 'axios';

import { ERROR_PAGE } from '../routes';
import { ADMIN_TOKEN } from './signInAPI';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: '*/*',
  },
});

instance.interceptors.request.use(
  (req) => {
    const token = JSON.parse(localStorage.getItem(ADMIN_TOKEN) ?? '{}');

    if (!token?.accessToken) return req;

    req.headers.Authorization = `Bearer ${token.accessToken}`;

    return req;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (isAxiosError(error)) {
      switch (error.response.status) {
        case 403:
        case 500: {
          location.href = `${ERROR_PAGE}/${error.response.status}`;
          return;
        }
        default:
          return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export const Http = {
  get: (url, config) => instance.get(url, config),
  post: (url, data, config) => instance.post(url, data, config),
  delete: (url, config) => instance.delete(url, config),
  option: (url, config) => instance.options(url, config),
  put: (url, data, config) => instance.put(url, data, config),
  patch: (url, data, config) => instance.patch(url, data, config),
  head: (url, config) => instance.head(url, config),
};
