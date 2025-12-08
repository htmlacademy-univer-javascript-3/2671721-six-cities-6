import { createAsyncThunk } from '@reduxjs/toolkit';
import { City, IOffer, IPlaceCard, IReview } from '../common/types/app.ts';
import { AxiosInstance } from 'axios';
import {Path, ResponseCode} from '../common/const.ts';
import { AppDispatch, AppRootStateType } from './types.ts';
import {
  setActiveCityPlaceCards,
  setAuthorizationStatus,
  setLoading,
  setNearbyOffers,
  setOfferData,
  setReviews,
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
>('FETCH_OFFERS', async (city, { dispatch, extra: api }) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get<IPlaceCard[]>(Path.OFFERS);
    dispatch(setActiveCityPlaceCards(response.data.filter((el) => el.city.name === city.toString())));
  } finally {
    dispatch(setLoading(false));
  }
});

export const fetchFavoritesOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }
>('FETCH_FAVORITES_OFFERS', async (_, { dispatch, extra: api }) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get<IPlaceCard[]>(Path.FAVORITE);
    dispatch(setActiveCityPlaceCards(response.data));
  } finally {
    dispatch(setLoading(false));
  }
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
  }>('LOGOUT', async (_, { dispatch, extra: api }) => {
    await api.delete<void>(Path.LOGIN);
    dropToken();
    dispatch(setUserData(null));
    dispatch(setAuthorizationStatus(false));
  });

export const fetchOfferData = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }>('FETCH_OFFER_DATA', async (offerId, { dispatch, extra: api }) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get<IOffer>(`${Path.OFFERS}/${offerId}`);
      dispatch(setOfferData(response.data));
    } finally {
      dispatch(setLoading(false));
    }
  });

export const fetchReviews = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }>('FETCH_REVIEWS', async (offerId, { dispatch, extra: api }) => {
    const response = await api.get<IReview[]>(`${Path.COMMENTS}/${offerId}`);
    dispatch(setReviews(response.data));
  });

export const postReview = createAsyncThunk<
  void,
  { offerId: string; comment: string; rating: number },
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }>('POST_REVIEWS', async ({ offerId, comment, rating }, { dispatch: dispatch, extra: api }) => {
    const response = await api.post<IReview[]>(`${Path.COMMENTS}/${offerId}`, {
      comment: comment,
      rating: rating,
    });
    if (response.status as ResponseCode === ResponseCode.CREATED) {
      dispatch(fetchReviews(offerId));
    }
  });

export const fetchNearbyOffers = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }>('FETCH_NEARBY_OFFER', async (offerId, { dispatch, extra: api }) => {
    const response = await api.get<IPlaceCard[]>(`${Path.OFFERS}/${offerId}/nearby`);
    dispatch(setNearbyOffers(response.data.slice(0, 3)));
  });
