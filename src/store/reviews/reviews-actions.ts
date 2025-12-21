import { createAction } from '@reduxjs/toolkit';
import { IReview } from '../../types/app';

export const setReviews = createAction<IReview[]>('reviews/setReviews');
export const setReviewLoading = createAction<boolean>('reviews/setReviewLoading');
export const setReviewError = createAction<boolean>('reviews/setReviewError');
