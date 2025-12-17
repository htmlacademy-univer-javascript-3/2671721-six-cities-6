import { combineReducers } from '@reduxjs/toolkit';
import { Reducer } from '../common/utils/const.ts';
import { reviewsReducer } from './reviews/reviews-reducer.ts';
import { offersReducer } from './offers/offers-reducer.ts';
import { userReducer } from './user/user-reducer.ts';

export const rootReducer = combineReducers({
  [Reducer.OFFERS]: offersReducer,
  [Reducer.REVIEWS]: reviewsReducer,
  [Reducer.USER]: userReducer,
});
