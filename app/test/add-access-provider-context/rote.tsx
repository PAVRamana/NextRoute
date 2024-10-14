/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const baseURL = window.location.origin;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

function createAxiosResponseInterceptor(axiosInstance: any) {
  const interceptor = axiosInstance.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error?.response?.status === 401) {
        window.open('/identityiq/home.jsf', '_self');
      }
      axiosInstance.interceptors.response.eject(interceptor);
    }
  );
}

createAxiosResponseInterceptor(api);

export default api;
