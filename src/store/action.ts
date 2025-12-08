import { createAction } from '@reduxjs/toolkit';
import {
  City,
  IOffer,
  IPlaceCard,
  IReview,
  SortingType
} from '../common/types/app.ts';
import { AuthResponse } from '../common/types/auth.ts';

export const setActiveCityAction = createAction<City>('SET_ACTIVE_CITY');
export const setActiveSortingTypeAction = createAction<SortingType>('SET_ACTIVE_SORTING_TYPE');
export const setActivePlaceCardId = createAction<IPlaceCard['id'] | null>('SET_ACTIVE_PLACE_CARD');
export const setLoading = createAction<boolean>('SET_LOADING');
export const setAuthorizationStatus = createAction<boolean>('SET_AUTHORIZATION_STATUS');
export const setActiveCityPlaceCards = createAction<IPlaceCard[]>('SET_ACTIVE_CITY_PLACE_CARDS');
export const setUserData = createAction<AuthResponse | null>('SET_USER_DATA');
export const setOfferData = createAction<IOffer | null>('SET_OFFER_DATA');
export const setReviews = createAction<IReview[]>('SET_REVIEWS');
export const setNearbyOffers = createAction<IPlaceCard[]>('SET_NEARBY_OFFERS');
