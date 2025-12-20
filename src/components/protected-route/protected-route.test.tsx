import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Action } from '@reduxjs/toolkit';
import { ProtectedRoute } from './protected-route';
import * as userSelectors from '../../store/user/user-selectors';
import { createAPI } from '../../utils/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppDispatch, AppRootStateType } from '../../store/types';
import { Path } from '../../utils/const';
import { mockInitialState } from '../../utils/mocks.ts';

vi.mock('../../store/user/user-selectors');
vi.mock('react-router-dom', async () => {
  const actual: object = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: ({ to, state, replace }: { to: string; state?: object; replace?: boolean }) => (
      <div data-testid="navigate" data-to={to} data-state={JSON.stringify(state)} data-replace={replace}>
        Redirect to {to}
      </div>
    ),
    Outlet: () => <div data-testid="outlet">Outlet Component</div>,
    useLocation: () => ({ pathname: '/protected', search: '', hash: '', state: null, key: 'default' })
  };
});

const mockGetAuthorizationStatus = vi.mocked(userSelectors.getAuthorizationStatus);

describe('ProtectedRoute Component', () => {
  const axios = createAPI();
  const middlewares = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<AppRootStateType, Action<string>, AppDispatch>(middlewares);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      user: mockInitialState.user
    });
  });

  it('should render Outlet component when user is authenticated', () => {
    mockGetAuthorizationStatus.mockReturnValue(true);
    const container = render(
      <Provider store={store}>
        <ProtectedRoute />
      </Provider>
    );

    const outlet = container.getByTestId('outlet');
    expect(outlet).toBeInTheDocument();
    expect(outlet).toHaveTextContent('Outlet Component');
    expect(container.queryByTestId('navigate')).not.toBeInTheDocument();
  });

  it('should render Navigate component when user is not authenticated', () => {
    mockGetAuthorizationStatus.mockReturnValue(false);
    const container = render(
      <Provider store={store}>
        <ProtectedRoute />
      </Provider>
    );
    const navigate = container.getByTestId('navigate');
    expect(navigate).toBeInTheDocument();
    expect(navigate).toHaveAttribute('data-to', Path.Login);
    expect(navigate).toHaveAttribute('data-replace', 'true');
    expect(container.queryByTestId('outlet')).not.toBeInTheDocument();
  });
});
