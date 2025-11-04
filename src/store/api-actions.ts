import { createAsyncThunk } from '@reduxjs/toolkit';
import { City, IPlaceCard } from '../common/types.ts';
import { AxiosInstance } from 'axios';
import { Path} from '../common/const.ts';
import { AppDispatch, AppRootStateType } from './types.ts';
import { setActiveCityPlaceCards, setLoading } from './action.ts';

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
