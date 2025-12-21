import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {
  City,
  IOffer,
  IPlaceCard,
  SortingType,
  Status
} from '../../types/app';
import { AppDispatch, AppRootStateType } from '../types';
import { Path } from '../../utils/const';
import {
  setFavoriteStatus,
  setLoading,
  setNearbyOffers,
  setOfferData,
  setPlaceCards,
  setFavoritePlaceCards,
  setOfferError, setFavoriteStatusError
} from './offers-actions';
import { getSortingFunction } from '../../utils/utils';

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
>('offers/fetchOffers', async ({ city, activeSortingType }, { dispatch, extra: api }) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get<IPlaceCard[]>(Path.Offers);
    const placeCards = response.data
      .filter((el) => el.city.name === city.toString())
      .toSorted(getSortingFunction(activeSortingType));
    dispatch(setPlaceCards(placeCards));
    dispatch(setOfferError(false));
  } catch {
    dispatch(setOfferError(true));
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
>('offers/fetchFavoritesOffers', async (_, { dispatch, extra: api }) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get<IPlaceCard[]>(Path.Favorite);
    dispatch(setFavoritePlaceCards(response.data));
    dispatch(setOfferError(false));
  } catch {
    dispatch(setOfferError(true));
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
  }>('offers/fetchOfferData', async (offerId, { dispatch, extra: api }) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get<IOffer>(`${Path.Offers}/${offerId}`);
      dispatch(setOfferData(response.data));
      dispatch(setOfferError(false));
    } catch {
      dispatch(setOfferError(true));
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
  }>('offers/fetchNearbyOffers', async (offerId, { dispatch, extra: api }) => {
    try {
      const response = await api.get<IPlaceCard[]>(`${Path.Offers}/${offerId}/nearby`);
      dispatch(setNearbyOffers(response.data.slice(0, 3)));
      dispatch(setOfferError(false));
    } catch {
      dispatch(setOfferError(true));
    }
  });

export const changeFavoriteStatus = createAsyncThunk<
  void,
  {
    offerId: string;
    status: Status;
  },
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }>(
    'offers/changeFavoriteStatus',
    async ({ offerId, status }, { dispatch, extra: api, getState }) => {
      try {
        const response = await api.post<IOffer>(`${Path.Favorite}/${offerId}/${status}`);
        dispatch(setFavoriteStatus(response.data));
        dispatch(fetchFavoritesOffers());

        if (getState().offers.offerData?.id !== null) {
          dispatch(fetchOfferData(offerId));
          dispatch(fetchNearbyOffers(offerId));
        }
        dispatch(setFavoriteStatusError(false));
      } catch {
        dispatch(setFavoriteStatusError(true));
      }
    }
  );
