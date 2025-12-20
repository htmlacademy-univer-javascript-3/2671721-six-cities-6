import axios, { AxiosError, AxiosInstance } from 'axios';
import { dropToken, getToken, isResponseCode } from './utils';
import { BASE_URL, ResponseCode, TIMEOUT } from './const';
import { AuthError } from '../types/auth';
import { setAuthorizationStatus } from '../store/user/user-actions';
import { useAppDispatch } from '../store/hooks/hooks';

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
          && error.response.status === ResponseCode.Unauthorized) {
          dropToken();
          const dispatch = useAppDispatch();
          dispatch(setAuthorizationStatus(false));
        }
      }
      throw error;
    });

  return api;
};


