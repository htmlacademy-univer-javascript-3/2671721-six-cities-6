import { createAsyncThunk } from '@reduxjs/toolkit';
import { City, IPlaceCard } from '../common/types/app.ts';
import { AxiosInstance } from 'axios';
import { Path} from '../common/const.ts';
import { AppDispatch, AppRootStateType } from './types.ts';
import {
  setActiveCityPlaceCards,
  setAuthorizationStatus,
  setLoading,
  setUserData,
} from './action.ts';
import { AuthRequest, AuthResponse } from '../common/types/auth.ts';
import { dropToken, saveToken } from '../common/utils.ts';

export const fetchOffers = createAsyncThunk<
  void,
  City,
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }
>('GET_OFFERS', async (city, { dispatch, extra: api }) => {
  const response = await api.get<IPlaceCard[]>(Path.OFFERS);
  dispatch(setActiveCityPlaceCards(response.data.filter((el) => el.city.name === city.toString())));
});

export const fetchFavoritesOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }
>('GET_FAVORITES_OFFERS', async (_, { dispatch, extra: api }) => {
  dispatch(setLoading(true));
  const response = await api.get<IPlaceCard[]>(Path.FAVORITE);
  dispatch(setActiveCityPlaceCards(response.data));
  dispatch(setLoading(false));
});

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
  }>('LOGOUT', async (_arg, { dispatch, extra: api }) => {
    await api.delete<void>(Path.LOGIN);
    dropToken();
    dispatch(setUserData(null));
    dispatch(setAuthorizationStatus(false));
  });
