import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {City, IOffer, IPlaceCard, SortingType} from '../../common/types/app.ts';
import { AppDispatch, AppRootStateType } from '../types.ts';
import { Path } from '../../common/const.ts';
import {
  setLoading,
  setNearbyOffers,
  setOfferData,
  setPlaceCards
} from './offers-actions.ts';
import {getSortingFunction} from '../../common/utils.ts';

export const fetchOffers = createAsyncThunk<
  void,
  {
    city: City;
    activeSortingType: SortingType;
  },
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }
>('FETCH_OFFERS', async ({ city, activeSortingType }, { dispatch, extra: api }) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get<IPlaceCard[]>(Path.OFFERS);
    const placeCards = response.data
      .filter((el) => el.city.name === city.toString())
      .toSorted(getSortingFunction(activeSortingType));
    dispatch(setPlaceCards(placeCards));
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
    dispatch(setPlaceCards(response.data));
  } finally {
    dispatch(setLoading(false));
  }
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
