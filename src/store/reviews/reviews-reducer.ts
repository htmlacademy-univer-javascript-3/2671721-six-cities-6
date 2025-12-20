import { IReview } from '../../types/app';
import { createReducer } from '@reduxjs/toolkit';
import { setReviews, setReviewLoading, setReviewError } from './reviews-actions';

export interface ReviewsState {
  reviews: IReview[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  isError: false,
};

export const reviewsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setReviewLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setReviewError, (state, action) => {
      state.isError = action.payload;
    });
});
