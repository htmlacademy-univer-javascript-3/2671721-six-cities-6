import { createAction } from '@reduxjs/toolkit';
import { City, IPlaceCard } from '../common/types.ts';

export const setActiveCityAction = createAction<City>('SET_ACTIVE_CITY');
export const fillActiveCityPlaceCards = createAction<IPlaceCard[]>('FILL_ACTIVE_CITY_PLACE_CARDS');
