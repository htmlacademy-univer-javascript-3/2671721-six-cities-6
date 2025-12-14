import { IReview } from '../../common/types/app.ts';
import { createReducer } from '@reduxjs/toolkit';
import { setReviews } from './reviews-actions.ts';

export interface ReviewsState {
  reviews: IReview[];
}

const initialState: ReviewsState = {
  reviews: [],
};

export const reviewsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    });
});
