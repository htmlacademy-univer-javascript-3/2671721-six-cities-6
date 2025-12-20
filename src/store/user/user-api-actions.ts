import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppRootStateType } from '../types';
import { AxiosInstance } from 'axios';
import { Path } from '../../utils/const';
import { AuthRequest, AuthResponse } from '../../types/auth';
import {
  setAuthorizationStatus,
  setUserData,
  setUserError
} from './user-actions';
import { dropToken, saveToken } from '../../utils/utils';

export const checkAuthorizationStatus = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }
  >('CHECK_AUTHORIZATION_STATUS', async (_, { dispatch, extra: api }) => {
    dispatch(setAuthorizationStatus(null));
    try {
      const response = await api.get<AuthResponse>(Path.Login);
      dispatch(setAuthorizationStatus(true));
      dispatch(setUserData(response.data));
    } catch (e) {
      dispatch(setAuthorizationStatus(false));
      dispatch(setUserData(null));
    }
  });

export const login = createAsyncThunk<
  void,
  AuthRequest,
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }>('LOGIN', async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<AuthResponse>(Path.Login, { email, password });
      saveToken(data.token);
      dispatch(setUserData(data));
      dispatch(setAuthorizationStatus(true));
      dispatch(setUserError(false));
    } catch {
      dispatch(setUserError(true));
    }
  });

export const logout = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }>('LOGOUT', async (_, { dispatch, extra: api }) => {
    try {
      await api.delete<void>(Path.Login);
    } catch {
      dispatch(setAuthorizationStatus(false));
    } finally {
      dropToken();
      dispatch(setUserData(null));
      dispatch(setAuthorizationStatus(false));
    }
  });
