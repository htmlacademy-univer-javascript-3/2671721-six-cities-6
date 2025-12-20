import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {
  fetchOffers,
  fetchFavoritesOffers,
  fetchOfferData,
  fetchNearbyOffers,
  changeFavoriteStatus
} from './offers-api-actions';
import { City, SortingType, Status } from '../../types/app';
import {
  setLoading,
  setOfferData,
  setNearbyOffers,
  setFavoriteStatus,
  setFavoritePlaceCards,
  setOfferError,
  setFavoriteStatusError
} from './offers-actions';
import { createAPI } from '../../utils/api';
import { AppDispatch, AppRootStateType } from '../types';
import {
  mockInitialState,
  mockOffer,
  mockPlaceCard
} from '../../utils/mocks';
import { Path } from '../../utils/const';
import { Action } from '@reduxjs/toolkit';
import { extractActionsTypes } from '../../utils/utils';

describe('Offers Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middlewares = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<AppRootStateType, Action<string>, AppDispatch>(middlewares);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      offers: mockInitialState.offers
    });
  });

  describe('fetchOfferData', () => {
    const offerId = 'test-offer-id';

    it('should dispatch "setLoading(true)", "setOfferData", "setLoading(false)" when server response 200', async () => {
      mockAxiosAdapter.onGet(`${Path.Offers}/${offerId}`).reply(200, mockOffer);

      await store.dispatch(fetchOfferData(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferData.pending.type,
        setLoading.type,
        setOfferData.type,
        setOfferError.type,
        setLoading.type,
        fetchOfferData.fulfilled.type,
      ]);
    });

    it('should dispatch correct offer data', async () => {
      mockAxiosAdapter.onGet(`${Path.Offers}/${offerId}`).reply(200, mockOffer);

      await store.dispatch(fetchOfferData(offerId));

      const emittedActions = store.getActions();
      const setOfferDataAction = emittedActions.find((action) => action.type === setOfferData.type);

      expect(setOfferDataAction).toBeDefined();
      expect((setOfferDataAction as ReturnType<typeof setOfferData>)?.payload).toEqual(mockOffer);
    });

    it('should dispatch "setLoading(true)", "setLoading(false)" and reject when server response 404', async () => {
      mockAxiosAdapter.onGet(`${Path.Offers}/${offerId}`).reply(404);

      await store.dispatch(fetchOfferData(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferData.pending.type,
        setLoading.type,
        setOfferError.type,
        setLoading.type,
        fetchOfferData.fulfilled.type,
      ]);
    });
  });

  describe('fetchOffers', () => {
    it('should dispatch "setLoading(true)", "setLoading(false)" and reject when server response 400', async () => {
      const params = {
        city: City.Paris,
        activeSortingType: SortingType.HighToLow
      };

      mockAxiosAdapter.onGet(Path.Offers).reply(400);

      await store.dispatch(fetchOffers(params));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffers.pending.type,
        setLoading.type,
        setOfferError.type,
        setLoading.type,
        fetchOffers.fulfilled.type,
      ]);
    });
  });

  describe('fetchFavoritesOffers', () => {
    it('should dispatch "setLoading(true)", "setPlaceCards", "setLoading(false)" when server response 200', async () => {
      const mockFavorites = [mockPlaceCard];
      mockAxiosAdapter.onGet(Path.Favorite).reply(200, mockFavorites);

      await store.dispatch(fetchFavoritesOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesOffers.pending.type,
        setLoading.type,
        setFavoritePlaceCards.type,
        setOfferError.type,
        setLoading.type,
        fetchFavoritesOffers.fulfilled.type,
      ]);
    });

    it('should dispatch "setLoading(true)", "setLoading(false)" and reject when server response 400', async () => {
      mockAxiosAdapter.onGet(Path.Favorite).reply(400);

      await store.dispatch(fetchFavoritesOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesOffers.pending.type,
        setLoading.type,
        setOfferError.type,
        setLoading.type,
        fetchFavoritesOffers.fulfilled.type,
      ]);
    });
  });

  describe('fetchNearbyOffers', () => {
    const offerId = 'test-offer-id';

    it('should dispatch "setNearbyOffers" with first 3 offers when server response 200', async () => {
      const mockNearbyOffers = [
        mockPlaceCard,
        mockPlaceCard,
        mockPlaceCard,
        mockPlaceCard,
      ];
      mockAxiosAdapter.onGet(`${Path.Offers}/${offerId}/nearby`).reply(200, mockNearbyOffers);

      await store.dispatch(fetchNearbyOffers(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearbyOffers.pending.type,
        setNearbyOffers.type,
        setOfferError.type,
        fetchNearbyOffers.fulfilled.type,
      ]);
    });

    it('should dispatch reject when server response 404', async () => {
      mockAxiosAdapter.onGet(`${Path.Offers}/${offerId}/nearby`).reply(404);

      await store.dispatch(fetchNearbyOffers(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearbyOffers.pending.type,
        setOfferError.type,
        fetchNearbyOffers.fulfilled.type,
      ]);
    });
  });

  describe('changeFavoriteStatus', () => {
    const offerId = 'test-offer-id';
    const status: Status = 1;

    it('should dispatch updated offer data', async () => {
      const params = { offerId, status };

      mockAxiosAdapter.onPost(`${Path.Favorite}/${offerId}/${status}`).reply(200, mockOffer);

      await store.dispatch(changeFavoriteStatus(params));

      const emittedActions = store.getActions();
      const setFavoriteStatusAction = emittedActions.find((action) => action.type === setFavoriteStatus.type);

      expect(setFavoriteStatusAction).toBeDefined();
      expect((setFavoriteStatusAction as ReturnType<typeof setFavoriteStatus>)?.payload).toEqual(mockOffer);
    });

    it('should dispatch reject when server response 400', async () => {
      const params = { offerId, status };
      mockAxiosAdapter.onPost(`${Path.Favorite}/${offerId}/${status}`).reply(400);

      await store.dispatch(changeFavoriteStatus(params));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteStatus.pending.type,
        setFavoriteStatusError.type,
        changeFavoriteStatus.fulfilled.type,
      ]);
    });
  });
});
