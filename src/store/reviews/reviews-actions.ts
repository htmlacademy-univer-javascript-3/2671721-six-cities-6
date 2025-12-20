import { createAction } from '@reduxjs/toolkit';
import { IReview } from '../../types/app';

export const setReviews = createAction<IReview[]>('SET_REVIEWS');
export const setReviewLoading = createAction<boolean>('SET_REVIEW_LOADING');
export const setReviewError = createAction<boolean>('SET_REVIEW_ERROR');
