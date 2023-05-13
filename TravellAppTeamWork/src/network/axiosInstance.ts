import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://645ed14ef9c0732c3430413d.mockapi.io/',
  timeout: 1000,
});
