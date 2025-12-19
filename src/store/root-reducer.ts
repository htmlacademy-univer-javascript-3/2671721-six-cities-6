import { combineReducers } from '@reduxjs/toolkit';
import { Reducer } from '../common/utils/const';
import { reviewsReducer } from './reviews/reviews-reducer';
import { offersReducer } from './offers/offers-reducer';
import { userReducer } from './user/user-reducer';

export const rootReducer = combineReducers({
  [Reducer.OFFERS]: offersReducer,
  [Reducer.REVIEWS]: reviewsReducer,
  [Reducer.USER]: userReducer,
});
