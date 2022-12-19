import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'localhost:8000',
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers
  };

  return config;
}, (error) => Promise.reject(error));

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;