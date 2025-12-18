import {
  City,
  IOffer,
  IPlaceCard,
  SortingType
} from '../../common/types/app';
import { createReducer } from '@reduxjs/toolkit';
import {
  setActiveCityAction,
  setActivePlaceCardId,
  setActiveSortingTypeAction,
  setFavoritePlaceCards,
  setFavoriteStatus,
  setLoading,
  setNearbyOffers,
  setOfferData,
  setPlaceCards
} from './offers-actions';

export interface OffersState {
  activeCity: City;
  placeCards: IPlaceCard[];
  favoritePlaceCards: IPlaceCard[];
  activeSortingType: SortingType;
  isLoading: boolean;
  activePlaceCardId: IPlaceCard['id'] | null;
  offerId: string | null;
  offerData: IOffer | null;
  nearbyOffers: IPlaceCard[];
}

const initialState: OffersState = {
  activeCity: City.PARIS,
  favoritePlaceCards: [],
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
