import { City, IPlaceCard, SortingType } from '../common/types/app.ts';
import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../common/const.ts';
import {
  setActiveCityPlaceCards,
  setActiveCityAction,
  setActivePlaceCardId,
  setActiveSortingTypeAction,
  setLoading,
  setAuthorizationStatus,
  setUserData,
} from './action.ts';
import { AuthResponse } from '../common/types/auth.ts';

interface StoreState {
  activeCity: City;
  placeCards: IPlaceCard[];
  activeSortingType: SortingType;
  isLoading: boolean;
  activePlaceCardId: IPlaceCard['id'] | null;
  authorizationStatus: boolean;
  userData: AuthResponse | null;
}

const initialState: StoreState = {
  activeCity: CITIES[0],
  placeCards: [],
  activeSortingType: SortingType.POPULAR,
  isLoading: false,
  activePlaceCardId: null,
  authorizationStatus: false,
  userData: null,
};

export const reducer = createReducer(initialState, (builder) => {
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
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setActiveCityPlaceCards, (state, action) => {
      state.placeCards = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});
