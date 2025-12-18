import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Action } from '@reduxjs/toolkit';
import { Layout } from './layout';
import * as userApiActions from '../../../store/user/user-api-actions';
import { createAPI } from '../../utils/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppDispatch, AppRootStateType } from '../../../store/types';

vi.mock('../../../store/user/user-api-actions');
vi.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet">Outlet Component</div>
}));

const mockCheckAuthorizationStatus = vi.mocked(userApiActions.checkAuthorizationStatus);

describe('layout Component', () => {
  const axios = createAPI();
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
    vi.clearAllMocks();
    mockCheckAuthorizationStatus.mockReturnValue({ type: 'CHECK_AUTHORIZATION_STATUS' } as unknown as ReturnType<typeof mockCheckAuthorizationStatus>);
  });
  it('should dispatch checkAuthorizationStatus on mount', () => {
    render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );

    expect(mockCheckAuthorizationStatus).toHaveBeenCalledTimes(1);
  });

  it('should render Outlet component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );

    expect(getByTestId('outlet')).toBeInTheDocument();
    expect(getByTestId('outlet')).toHaveTextContent('Outlet Component');
  });
});
