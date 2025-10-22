import axios, { AxiosInstance } from 'axios';

export const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
export const TIMEOUT = 5000;

export const createAPI = (): AxiosInstance =>
  axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });


