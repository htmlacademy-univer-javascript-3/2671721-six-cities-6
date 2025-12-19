import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { checkAuthorizationStatus, login, logout } from './user-api-actions';
import { Path } from '../../common/utils/const';
import { setAuthorizationStatus, setUserData } from './user-actions';
import * as tokenUtils from '../../common/utils/utils';
import { createAPI } from '../../common/utils/api';
import { AppDispatch, AppRootStateType } from '../types';
import { Action } from '@reduxjs/toolkit';
import {
  extractActionsTypes,
  mockAuthRequest,
  mockAuthResponse
} from '../../common/utils/mocks';

describe('User Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<AppRootStateType, Action<string>, AppDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      user: {
        authorizationStatus: false,
        userData: null
      }
    });
  });

  describe('checkAuthorizationStatus', () => {
    it('should dispatch "setUserData" and "setAuthorizationStatus" when server response 200', async () => {
      mockAxiosAdapter.onGet(Path.LOGIN).reply(200, mockAuthResponse);

      await store.dispatch(checkAuthorizationStatus());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthorizationStatus.pending.type,
        setUserData.type,
        setAuthorizationStatus.type,
        checkAuthorizationStatus.fulfilled.type,
      ]);
    });

    it('should dispatch correct user data', async () => {
      mockAxiosAdapter.onGet(Path.LOGIN).reply(200, mockAuthResponse);

      await store.dispatch(checkAuthorizationStatus());

      const emittedActions = store.getActions();
      const setUserDataAction = emittedActions.find((action) => action.type === setUserData.type);

      expect((setUserDataAction as ReturnType<typeof setUserData>)?.payload).toEqual(mockAuthResponse);
    });
  });

  describe('login', () => {
    it('should call "saveToken" with received token', async () => {
      mockAxiosAdapter.onPost(Path.LOGIN).reply(200, mockAuthResponse);
      const mockSaveToken = vi.spyOn(tokenUtils, 'saveToken');

      await store.dispatch(login(mockAuthRequest));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(mockAuthResponse.token);
    });

    it('should dispatch "setUserData" and "setAuthorizationStatus" when server response 200', async () => {
      mockAxiosAdapter.onPost(Path.LOGIN).reply(200, mockAuthResponse);

      await store.dispatch(login(mockAuthRequest));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        login.pending.type,
        setUserData.type,
        setAuthorizationStatus.type,
        login.fulfilled.type,
      ]);
    });

    it('should dispatch reject when server response 400', async () => {
      mockAxiosAdapter.onPost(Path.LOGIN).reply(400);

      await store.dispatch(login(mockAuthRequest));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        login.pending.type,
        login.rejected.type,
      ]);
    });
  });

  describe('logout', () => {
    it('should call "dropToken" once', async () => {
      mockAxiosAdapter.onDelete(Path.LOGIN).reply(204);
      const mockDropToken = vi.spyOn(tokenUtils, 'dropToken');

      await store.dispatch(logout());

      expect(mockDropToken).toBeCalledTimes(1);
    });

    it('should dispatch "setUserData" and "setAuthorizationStatus" when server response 204', async () => {
      mockAxiosAdapter.onDelete(Path.LOGIN).reply(204);

      await store.dispatch(logout());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logout.pending.type,
        setUserData.type,
        setAuthorizationStatus.type,
        logout.fulfilled.type,
      ]);
    });
  });
});
