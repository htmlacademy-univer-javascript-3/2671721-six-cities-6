import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppRootStateType } from '../types';
import { AxiosInstance } from 'axios';
import { IReview } from '../../common/types/app';
import { isResponseCode } from '../../common/utils/utils';
import { Path, ResponseCode } from '../../common/utils/const';
import { setReviews } from './reviews-actions';

export const fetchReviews = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }>('FETCH_REVIEWS', async (offerId, { dispatch, extra: api }) => {
    const response = await api.get<IReview[]>(`${Path.COMMENTS}/${offerId}`);
    dispatch(setReviews(response.data));
  });

export const postReview = createAsyncThunk<
  void,
  { offerId: string; comment: string; rating: number },
  {
    dispatch: AppDispatch;
    state: AppRootStateType;
    extra: AxiosInstance;
  }>('POST_REVIEWS', async ({ offerId, comment, rating }, { dispatch: dispatch, extra: api }) => {
    const response = await api.post<IReview[]>(`${Path.COMMENTS}/${offerId}`, {
      comment: comment,
      rating: rating,
    });
    if (isResponseCode(response.status) && response.status === ResponseCode.CREATED) {
      dispatch(fetchReviews(offerId));
    }
  });
