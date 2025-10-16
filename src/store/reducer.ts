import { City, IPlaceCard } from '../common/types.ts';
import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../common/const.ts';
import { fillActiveCityPlaceCards, setActiveCityAction } from './action.ts';

interface StoreState {
  activeCity: City;
  placeCards: IPlaceCard[];
}

const initialState: StoreState = {
  activeCity: CITIES[0],
  placeCards: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCityAction, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(fillActiveCityPlaceCards, (state, action) => {
      state.placeCards = action.payload;
    });
});
