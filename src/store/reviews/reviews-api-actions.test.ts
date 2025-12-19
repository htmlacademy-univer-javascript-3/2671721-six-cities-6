import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { fetchReviews, postReview } from './reviews-api-actions';
import { Path } from '../../common/utils/const';
import { setReviews } from './reviews-actions';
import { createAPI } from '../../common/utils/api';
import { AppDispatch, AppRootStateType } from '../types';
import { extractActionsTypes, mockReview } from '../../common/utils/mocks';
import { Action } from '@reduxjs/toolkit';

describe('Reviews Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<AppRootStateType, Action<string>, AppDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      reviews: {
        reviews: []
      }
    });
  });

  describe('fetchReviews', () => {
    const offerId = 'test-offer-id';

    it('should dispatch "setReviews" when server response 200', async () => {
      const mockReviews = [mockReview];
      mockAxiosAdapter.onGet(`${Path.COMMENTS}/${offerId}`).reply(200, mockReviews);

      await store.dispatch(fetchReviews(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        setReviews.type,
        fetchReviews.fulfilled.type,
      ]);
    });

    it('should dispatch correct reviews data', async () => {
      const mockReviews = [mockReview];
      mockAxiosAdapter.onGet(`${Path.COMMENTS}/${offerId}`).reply(200, mockReviews);

      await store.dispatch(fetchReviews(offerId));

      const emittedActions = store.getActions();
      const setReviewsAction = emittedActions.find((action) => action.type === setReviews.type);

      expect((setReviewsAction as ReturnType<typeof setReviews>)?.payload).toEqual(mockReviews);
    });

    it('should dispatch reject when server response 404', async () => {
      mockAxiosAdapter.onGet(`${Path.COMMENTS}/${offerId}`).reply(404);

      await store.dispatch(fetchReviews(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        fetchReviews.rejected.type,
      ]);
    });
  });

  describe('postReview', () => {
    const offerId = 'test-offer-id';
    const reviewData = {
      comment: 'Great place!',
      rating: 5,
    };

    it('should dispatch "fetchReviews" when server response 201', async () => {
      mockAxiosAdapter.onPost(`${Path.COMMENTS}/${offerId}`).reply(201, []);
      mockAxiosAdapter.onGet(`${Path.COMMENTS}/${offerId}`).reply(200, []);

      await store.dispatch(postReview({ offerId, ...reviewData }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReview.pending.type,
        fetchReviews.pending.type,
        postReview.fulfilled.type,
      ]);
    });

    it('should dispatch reject when server response 400', async () => {
      mockAxiosAdapter.onPost(`${Path.COMMENTS}/${offerId}`).reply(400);

      await store.dispatch(postReview({ offerId, ...reviewData }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReview.pending.type,
        postReview.rejected.type,
      ]);
    });
  });
});
