import { createAction } from '@reduxjs/toolkit';
import { IReview } from '../../common/types/app';

export const setReviews = createAction<IReview[]>('SET_REVIEWS');
