import { IReview } from '../../common/types/app';
import { createSelector } from '@reduxjs/toolkit';
import { AppRootStateType } from '../types';
import { Reducer } from '../../common/utils/const';

export const selectReviews = (state: Pick<AppRootStateType, Reducer.REVIEWS>): IReview[] => state.reviews.reviews;

export const getReviews = createSelector(
  [selectReviews],
  (reviews): IReview[] => reviews
);
