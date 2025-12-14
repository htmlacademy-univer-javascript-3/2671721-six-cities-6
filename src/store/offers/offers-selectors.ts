import { createSelector } from '@reduxjs/toolkit';
import { City, IOffer, IPlaceCard, SortingType } from '../../common/types/app.ts';
import { AppRootStateType } from '../types.ts';

export const selectActiveCity = (state: AppRootStateType): City => state.offers.activeCity;
export const selectPlaceCards = (state: AppRootStateType): IPlaceCard[] => state.offers.placeCards;
export const selectActiveSortingType = (state: AppRootStateType): SortingType => state.offers.activeSortingType;
export const selectIsLoading = (state: AppRootStateType): boolean => state.offers.isLoading;
export const selectActivePlaceCardId = (state: AppRootStateType): IPlaceCard['id'] | null => state.offers.activePlaceCardId;
export const selectOfferId = (state: AppRootStateType): string | null => state.offers.offerId;
export const selectOfferData = (state: AppRootStateType): IOffer | null => state.offers.offerData;
export const selectNearbyOffers = (state: AppRootStateType): IPlaceCard[] => state.offers.nearbyOffers;

export const getActiveCity = createSelector(
  [selectActiveCity],
  (activeCity): City => activeCity
);

export const getPlaceCards = createSelector(
  [selectPlaceCards],
  (placeCards): IPlaceCard[] => placeCards
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

