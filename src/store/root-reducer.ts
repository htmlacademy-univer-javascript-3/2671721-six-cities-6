import { combineReducers } from '@reduxjs/toolkit';
import { Reducer } from '../utils/const';
import { reviewsReducer } from './reviews/reviews-reducer';
import { offersReducer } from './offers/offers-reducer';
import { userReducer } from './user/user-reducer';

export const rootReducer = combineReducers({
  [Reducer.Offers]: offersReducer,
  [Reducer.Reviews]: reviewsReducer,
  [Reducer.User]: userReducer,
});
