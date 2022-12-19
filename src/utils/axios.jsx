import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'master-7rqtwti-zcfkoh3mlrnng.eu-5.platformsh.site',
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