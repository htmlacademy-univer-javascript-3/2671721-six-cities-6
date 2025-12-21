import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { checkAuthorizationStatus, login, logout } from './user-api-actions';
import { Path } from '../../utils/const';
import {
  setAuthorizationStatus,
  setUserData,
  setUserError
} from './user-actions';
import { createAPI } from '../../utils/api';
import { AppDispatch, AppRootStateType } from '../types';
import { Action } from '@reduxjs/toolkit';
import {
  mockAuthRequest,
  mockAuthResponse,
  mockInitialState
} from '../../utils/mocks';
import { extractActionsTypes, dropToken, saveToken } from '../../utils/utils';
import { Mock } from 'vitest';

vi.mock('../../utils/utils', async () => {
  const actual: object = await vi.importActual('../../utils/utils');
  return {
    ...actual,
    dropToken: vi.fn<[], void>(),
    saveToken: vi.fn<[string], void>(),
  };
});

describe('User Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middlewares = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<AppRootStateType, Action<string>, AppDispatch>(middlewares);
  let store: ReturnType<typeof mockStoreCreator>;
  const mockDropToken = dropToken as Mock<[], void>;
  const mockSaveToken = saveToken as Mock<[string], void>;

  beforeEach(() => {
    store = mockStoreCreator({
      user: mockInitialState.user
    });
    vi.clearAllMocks();
  });

  describe('checkAuthorizationStatus', () => {
    it('should dispatch "setUserData" and "setAuthorizationStatus" when server response 200', async () => {
      mockAxiosAdapter.onGet(Path.Login).reply(200, mockAuthResponse);

      await store.dispatch(checkAuthorizationStatus());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthorizationStatus.pending.type,
        setAuthorizationStatus.type,
        setAuthorizationStatus.type,
        setUserData.type,
        checkAuthorizationStatus.fulfilled.type,
      ]);
    });

    it('should dispatch correct user data', async () => {
      mockAxiosAdapter.onGet(Path.Login).reply(200, mockAuthResponse);

      await store.dispatch(checkAuthorizationStatus());

      const emittedActions = store.getActions();
      const setUserDataAction = emittedActions.find((action) => action.type === setUserData.type);

      expect((setUserDataAction as ReturnType<typeof setUserData>)?.payload).toEqual(mockAuthResponse);
    });
  });

  describe('login', () => {
    it('should call "saveToken" with received token', async () => {
      mockAxiosAdapter.onPost(Path.Login).reply(200, mockAuthResponse);

      await store.dispatch(login(mockAuthRequest));

      expect(mockSaveToken).toHaveBeenCalledTimes(1);
      expect(mockSaveToken).toHaveBeenCalledWith(mockAuthResponse.token);
    });

    it('should dispatch "setUserData" and "setAuthorizationStatus" when server response 200', async () => {
      mockAxiosAdapter.onPost(Path.Login).reply(200, mockAuthResponse);

      await store.dispatch(login(mockAuthRequest));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        login.pending.type,
        setUserData.type,
        setAuthorizationStatus.type,
        setUserError.type,
        login.fulfilled.type,
      ]);
    });

    it('should dispatch reject when server response 400', async () => {
      mockAxiosAdapter.onPost(Path.Login).reply(400);

      await store.dispatch(login(mockAuthRequest));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        login.pending.type,
        setUserError.type,
        login.fulfilled.type,
      ]);
    });
  });

  describe('logout', () => {
    it('should call "dropToken" once', async () => {
      mockAxiosAdapter.onDelete(Path.Login).reply(204);

      await store.dispatch(logout());

      expect(mockDropToken).toHaveBeenCalledTimes(1);
    });

    it('should dispatch "setUserData" and "setAuthorizationStatus" when server response 204', async () => {
      mockAxiosAdapter.onDelete(Path.Login).reply(204);

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
