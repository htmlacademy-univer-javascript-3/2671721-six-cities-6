import { createSelector } from '@reduxjs/toolkit';
import { City, IOffer, IPlaceCard, SortingType } from '../../common/types/app.ts';
import { AppRootStateType } from '../types.ts';
import { Reducer } from '../../common/utils/const.ts';

export const selectActiveCity = (state: Pick<AppRootStateType, Reducer.OFFERS>): City => state.offers.activeCity;
export const selectPlaceCards = (state: Pick<AppRootStateType, Reducer.OFFERS>): IPlaceCard[] => state.offers.placeCards;
export const selectFavoritePlaceCards = (state: Pick<AppRootStateType, Reducer.OFFERS>): IPlaceCard[] => state.offers.favoritePlaceCards;
export const selectActiveSortingType = (state: Pick<AppRootStateType, Reducer.OFFERS>): SortingType => state.offers.activeSortingType;
export const selectIsLoading = (state: Pick<AppRootStateType, Reducer.OFFERS>): boolean => state.offers.isLoading;
export const selectActivePlaceCardId = (state: Pick<AppRootStateType, Reducer.OFFERS>): IPlaceCard['id'] | null => state.offers.activePlaceCardId;
export const selectOfferId = (state: Pick<AppRootStateType, Reducer.OFFERS>): string | null => state.offers.offerId;
export const selectOfferData = (state: Pick<AppRootStateType, Reducer.OFFERS>): IOffer | null => state.offers.offerData;
export const selectNearbyOffers = (state: Pick<AppRootStateType, Reducer.OFFERS>): IPlaceCard[] => state.offers.nearbyOffers;

export const getActiveCity = createSelector(
  [selectActiveCity],
  (activeCity): City => activeCity
);

export const getPlaceCards = createSelector(
  [selectPlaceCards],
  (placeCards): IPlaceCard[] => placeCards
);

export const getFavoritePlaceCards = createSelector(
  [selectFavoritePlaceCards],
  (favoritePlaceCards): IPlaceCard[] => favoritePlaceCards
);

export const getActiveSortingType = createSelector(
  [selectActiveSortingType],
  (activeSortingType): SortingType => activeSortingType
);

export const getIsLoading = createSelector(
  [selectIsLoading],
  (isLoading): boolean => isLoading
);

export const getActivePlaceCardId = createSelector(
  [selectActivePlaceCardId],
  (activePlaceCardId): IPlaceCard['id'] | null => activePlaceCardId
);

export const getOfferId = createSelector(
  [selectOfferId],
  (offerId): string | null => offerId
);

export const getOfferData = createSelector(
  [selectOfferData],
  (offerData): IOffer | null => offerData
);

export const getNearbyOffers = createSelector(
  [selectNearbyOffers],
  (nearbyOffers): IPlaceCard[] => nearbyOffers
);

export const getCurrentOffer = createSelector(
  [getOfferData, getOfferId],
  (offerData, offerId): IOffer | null =>
    offerData && offerId ? offerData : null
);

