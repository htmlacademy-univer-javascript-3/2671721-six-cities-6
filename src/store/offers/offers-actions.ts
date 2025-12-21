import { createAction } from '@reduxjs/toolkit';
import { City, IOffer, IPlaceCard, SortingType } from '../../types/app';

export const setActiveCity = createAction<City>('offers/setActiveCity');
export const setActiveSortingTypeAction = createAction<SortingType>('offers/setActiveSortingType');
export const setActivePlaceCardId = createAction<IPlaceCard['id'] | null>('offers/setActivePlaceCard');
export const setLoading = createAction<boolean>('offers/setLoading');
export const setPlaceCards = createAction<IPlaceCard[]>('offers/setPlaceCards');
export const setFavoritePlaceCards = createAction<IPlaceCard[]>('offers/setFavoritePlaceCards');
export const setFavoriteStatusError = createAction<boolean>('offers/setFavoriteStatusError');
export const setOfferData = createAction<IOffer | null>('offer/setOfferData');
export const setNearbyOffers = createAction<IPlaceCard[]>('offer/setNearbyOffers');
export const setFavoriteStatus = createAction<IOffer>('offer/setFavoriteStatus');
export const setOfferError = createAction<boolean>('offer/setOfferError');
