import {
  City,
  IOffer,
  IPlaceCard,
  SortingType
} from '../../common/types/app.ts';
import { createReducer } from '@reduxjs/toolkit';
import {
  setActiveCityAction,
  setActivePlaceCardId,
  setActiveSortingTypeAction,
  setFavoriteStatus,
  setLoading,
  setNearbyOffers,
  setOfferData,
  setPlaceCards
} from './offers-actions.ts';

export interface OffersState {
  activeCity: City;
  placeCards: IPlaceCard[];
  activeSortingType: SortingType;
  isLoading: boolean;
  activePlaceCardId: IPlaceCard['id'] | null;
  offerId: string | null;
  offerData: IOffer | null;
  nearbyOffers: IPlaceCard[];
}

const initialState: OffersState = {
  activeCity: City.PARIS,
  placeCards: [],
  activeSortingType: SortingType.POPULAR,
  isLoading: false,
  activePlaceCardId: null,
  offerId: null,
  offerData: null,
  nearbyOffers: [],
};

export const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCityAction, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(setActiveSortingTypeAction, (state, action) => {
      state.activeSortingType = action.payload;
    })
    .addCase(setActivePlaceCardId, (state, action) => {
      state.activePlaceCardId = action.payload;
    })
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setPlaceCards, (state, action) => {
      state.placeCards = action.payload;
    })
    .addCase(setOfferData, (state, action) => {
      state.offerData = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setFavoriteStatus, (state, action) => {
      const { id, isFavorite } = action.payload;

      const index = state.placeCards.findIndex((card) => card.id === id);

      if (index !== -1) {
        const newPlaceCards = [...state.placeCards];
        newPlaceCards[index] = {
          ...newPlaceCards[index],
          isFavorite: isFavorite
        };

        state.placeCards = newPlaceCards;
      }
    });
});
