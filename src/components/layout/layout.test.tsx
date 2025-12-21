import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Action } from '@reduxjs/toolkit';
import { Layout } from './layout';
import * as userApiActions from '../../store/user/user-api-actions';
import { createAPI } from '../../utils/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppDispatch, AppRootStateType } from '../../store/types';
import { mockInitialState } from '../../utils/mocks';

vi.mock('../../store/user/user-api-actions');

vi.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet">Outlet Component</div>
}));

vi.mock('../spinner/spinner', () => ({
  Spinner: vi.fn(() => <div data-testid="spinner">Loading...</div>)
}));

const mockCheckAuthorizationStatus = vi.mocked(userApiActions.checkAuthorizationStatus);

describe('layout Component', () => {
  const axios = createAPI();
  const middlewares = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<AppRootStateType, Action<string>, AppDispatch>(middlewares);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      user: mockInitialState.user
    });
    vi.clearAllMocks();
    mockCheckAuthorizationStatus.mockReturnValue({ type: 'user/checkAuthorizationStatus' } as unknown as ReturnType<typeof mockCheckAuthorizationStatus>);
  });

  it('should dispatch checkAuthorizationStatus on mount', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );

    expect(getByTestId('spinner')).toBeInTheDocument();

    expect(mockCheckAuthorizationStatus).toHaveBeenCalledTimes(1);
  });

  it('should render Outlet component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );

    waitFor(() => {
      expect(getByTestId('outlet')).toBeInTheDocument();
    });
  });
});
