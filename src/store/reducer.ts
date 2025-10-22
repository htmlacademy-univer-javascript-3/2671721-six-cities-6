import { City, IPlaceCard, SortingType } from '../common/types.ts';
import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../common/const.ts';
import {
  setActiveCityPlaceCards,
  setActiveCityAction,
  setActivePlaceCardId,
  setActiveSortingTypeAction, setLoading
} from './action.ts';

interface StoreState {
  activeCity: City;
  placeCards: IPlaceCard[];
  activeSortingType: SortingType;
  isLoading: boolean;
  activePlaceCardId: IPlaceCard['id'] | null;
}

const initialState: StoreState = {
  activeCity: CITIES[0],
  placeCards: [],
  activeSortingType: SortingType.POPULAR,
  isLoading: false,
  activePlaceCardId: null,
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
    .addCase(setActiveCityPlaceCards, (state, action) => {
      state.placeCards = action.payload;
    });
});
