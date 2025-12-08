import axios, { AxiosError, AxiosInstance } from 'axios';
import { dropToken, getToken, isResponseCode } from './utils.ts';
import { ResponseCode } from './const.ts';
import { AuthError } from './types/auth.ts';
import { useAppDispatch } from '../store/hooks.ts';
import { setAuthorizationStatus } from '../store/action.ts';

export const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
export const TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<AuthError>) => {
      if (error.response) {
        if (isResponseCode(error.response.status)
          && error.response.status === ResponseCode.UNAUTHORIZED) {
          dropToken();
          const dispatch = useAppDispatch();
          dispatch(setAuthorizationStatus(false));
        }
      }

      throw error;
    });

  return api;
};


