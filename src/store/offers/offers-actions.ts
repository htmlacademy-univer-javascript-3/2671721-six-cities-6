import { createAction } from '@reduxjs/toolkit';
import { City, IOffer, IPlaceCard, SortingType } from '../../common/types/app';

export const setActiveCityAction = createAction<City>('SET_ACTIVE_CITY');
export const setActiveSortingTypeAction = createAction<SortingType>('SET_ACTIVE_SORTING_TYPE');
export const setActivePlaceCardId = createAction<IPlaceCard['id'] | null>('SET_ACTIVE_PLACE_CARD');
export const setLoading = createAction<boolean>('SET_LOADING');
export const setPlaceCards = createAction<IPlaceCard[]>('SET_PLACE_CARDS');
export const setFavoritePlaceCards = createAction<IPlaceCard[]>('SET_FAVORITE_PLACE_CARDS');
export const setOfferData = createAction<IOffer | null>('SET_OFFER_DATA');
export const setNearbyOffers = createAction<IPlaceCard[]>('SET_NEARBY_OFFERS');
export const setFavoriteStatus = createAction<IOffer>('SET_FAVORITE_STATUS');
