import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppRootStateType } from '../types';
import { AxiosInstance } from 'axios';
import { Path } from '../../common/utils/const';
import { AuthRequest, AuthResponse } from '../../common/types/auth';
import { setAuthorizationStatus, setUserData } from './user-actions';
import { dropToken, saveToken } from '../../common/utils/utils';

export const checkAuthorizationStatus = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }
  >('CHECK_AUTHORIZATION_STATUS', async (_, { dispatch, extra: api }) => {
    const response = await api.get<AuthResponse>(Path.LOGIN);
    dispatch(setUserData(response.data));
    dispatch(setAuthorizationStatus(true));
  });

export const login = createAsyncThunk<
  void,
  AuthRequest,
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }>('LOGIN', async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<AuthResponse>(Path.LOGIN, { email, password });
    saveToken(data.token);
    dispatch(setUserData(data));
    dispatch(setAuthorizationStatus(true));
  });

export const logout = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }>('LOGOUT', async (_, { dispatch, extra: api }) => {
    await api.delete<void>(Path.LOGIN);
    dropToken();
    dispatch(setUserData(null));
    dispatch(setAuthorizationStatus(false));
  });
