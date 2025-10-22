import { createAction } from '@reduxjs/toolkit';
import { City, IPlaceCard, SortingType } from '../common/types.ts';

export const setActiveCityAction = createAction<City>('SET_ACTIVE_CITY');
export const setActiveSortingTypeAction = createAction<SortingType>('SET_ACTIVE_SORTING_TYPE');
export const setActivePlaceCardId = createAction<IPlaceCard['id'] | null>('SET_ACTIVE_PLACE_CARD');
export const fillActiveCityPlaceCards = createAction<IPlaceCard[]>('FILL_ACTIVE_CITY_PLACE_CARDS');
