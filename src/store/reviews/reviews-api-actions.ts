import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppRootStateType } from '../types';
import { AxiosInstance } from 'axios';
import { IReview } from '../../types/app';
import { Path } from '../../utils/const';
import { setReviews, setReviewLoading, setReviewError } from './reviews-actions';

export const fetchReviews = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }>('reviews/fetchReviews', async (offerId, { dispatch, extra: api }) => {
    const response = await api.get<IReview[]>(`${Path.Comments}/${offerId}`);
    dispatch(setReviews(response.data));
  });

export const postReview = createAsyncThunk<
  void,
  { offerId: string; comment: string; rating: number },
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }>('reviews/postReviews', async ({ offerId, comment, rating }, { dispatch: dispatch, extra: api }) => {
    dispatch(setReviewLoading(true));
    try {
      await api.post<IReview[]>(`${Path.Comments}/${offerId}`, {
        comment: comment,
        rating: rating,
      });
      dispatch(fetchReviews(offerId));
      dispatch(setReviewError(false));
    } catch (e) {
      dispatch(setReviewError(true));
    } finally {
      dispatch(setReviewLoading(false));
    }
  });
