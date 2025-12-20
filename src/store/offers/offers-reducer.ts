import {
  City,
  IOffer,
  IPlaceCard,
  SortingType
} from '../../types/app';
import { createReducer } from '@reduxjs/toolkit';
import {
  setActiveCity,
  setActivePlaceCardId,
  setActiveSortingTypeAction,
  setFavoritePlaceCards,
  setFavoriteStatus,
  setFavoriteStatusError,
  setLoading,
  setNearbyOffers,
  setOfferData,
  setOfferError,
  setPlaceCards
} from './offers-actions';

export interface OffersState {
  activeCity: City;
  placeCards: IPlaceCard[];
  favoritePlaceCards: IPlaceCard[];
  activeSortingType: SortingType;
  isLoading: boolean;
  isError: boolean;
  isFavoriteStatusError: boolean;
  activePlaceCardId: IPlaceCard['id'] | null;
  offerId: string | null;
  offerData: IOffer | null;
  nearbyOffers: IPlaceCard[];
}

const initialState: OffersState = {
  activeCity: City.Paris,
  favoritePlaceCards: [],
  placeCards: [],
  activeSortingType: SortingType.Popular,
  isLoading: false,
  isError: false,
  isFavoriteStatusError: false,
  activePlaceCardId: null,
  offerId: null,
  offerData: null,
  nearbyOffers: [],
};

export const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
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
    .addCase(setOfferError, (state, action) => {
      state.isError = action.payload;
    })
    .addCase(setFavoriteStatusError, (state, action) => {
      state.isFavoriteStatusError = action.payload;
    })
    .addCase(setPlaceCards, (state, action) => {
      state.placeCards = action.payload;
    })
    .addCase(setFavoritePlaceCards, (state, action) => {
      state.favoritePlaceCards = action.payload;
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
