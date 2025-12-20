import { IReview } from '../../types/app';
import { createSelector } from '@reduxjs/toolkit';
import { AppRootStateType } from '../types';
import { Reducer } from '../../utils/const';

export const selectReviews = (state: Pick<AppRootStateType, Reducer.Reviews>): IReview[] => state.reviews.reviews;
export const selectReviewLoading = (state: Pick<AppRootStateType, Reducer.Reviews>): boolean => state.reviews.isLoading;
export const selectReviewError = (state: Pick<AppRootStateType, Reducer.Reviews>): boolean => state.reviews.isError;

export const getReviews = createSelector(
  [selectReviews],
  (reviews): IReview[] => reviews
);

export const getReviewLoading = createSelector(
  [selectReviewLoading],
  (isLoading): boolean => isLoading
);

export const getReviewError = createSelector(
  [selectReviewError],
  (isError): boolean => isError
);
