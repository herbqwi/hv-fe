import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
});

export const setAuthToken = (token: string): void => {
  apiClient.defaults.headers.common['Authorization'] = `${token}`;
};

export const clearAuthToken = (): void => {
  delete apiClient.defaults.headers.common['Authorization'];
};

export default apiClient;