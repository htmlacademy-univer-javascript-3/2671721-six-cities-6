import { IReview } from '../../common/types/app.ts';
import { createSelector } from '@reduxjs/toolkit';
import { AppRootStateType } from '../types.ts';
import { Reducer } from '../../common/utils/const.ts';

export const selectReviews = (state: Pick<AppRootStateType, Reducer.REVIEWS>): IReview[] => state.reviews.reviews;

export const getReviews = createSelector(
  [selectReviews],
  (reviews): IReview[] => reviews
);
