import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

instance.interceptors.request.use(
  (req) => {
    return {
      ...req,
      headers: {
        ...req.headers,
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
  },
  (error) => error,
);

instance.interceptors.response.use(
  (res) => res,
  (error) => error,
);

export const Http = {
  get: (url, config) => instance.get(url, config),
  post: (url, data, config) => instance.post(url, data, config),
  delete: (url, config) => instance.delete(url, config),
  option: (url, config) => instance.option(url, config),
  put: (url, data, config) => instance.put(url, data, config),
  patch: (url, data, config) => instance.patch(url, data, config),
  head: (url, config) => instance.head(url, config),
};
