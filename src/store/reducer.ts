import { City, IPlaceCard, SortingType } from '../common/types.ts';
import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../common/const.ts';
import {
  fillActiveCityPlaceCards,
  setActiveCityAction,
  setActivePlaceCardId,
  setActiveSortingTypeAction
} from './action.ts';

interface StoreState {
  activeCity: City;
  placeCards: IPlaceCard[];
  activeSortingType: SortingType;
  activePlaceCardId: IPlaceCard['id'] | null;
}

const initialState: StoreState = {
  activeCity: CITIES[0],
  placeCards: [],
  activeSortingType: SortingType.Popular,
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
    .addCase(fillActiveCityPlaceCards, (state, action) => {
      state.placeCards = action.payload;
    });
});
