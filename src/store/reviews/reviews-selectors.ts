import { IReview } from '../../common/types/app.ts';
import { createSelector } from '@reduxjs/toolkit';
import { AppRootStateType } from '../types.ts';

const selectReviews = (state: AppRootStateType): IReview[] => state.reviews.reviews;

export const getReviews = createSelector(
  [selectReviews],
  (reviews): IReview[] => reviews
);
