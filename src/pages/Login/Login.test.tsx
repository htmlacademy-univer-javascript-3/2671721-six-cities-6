import { render, screen } from '@testing-library/react';
import { Login } from './Login';
import { Provider } from 'react-redux';
import { createAPI } from '../../common/utils/api.ts';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppDispatch, AppRootStateType } from '../../store/types.ts';
import { Action } from '@reduxjs/toolkit';
import * as userSelectors from '../../store/user/user-selectors';
import { MockedFunction } from 'vitest';

vi.mock('../../common/components/Header/Header', () => ({
  Header: vi.fn(() => <div data-testid="mock-header">Header Component</div>)
}));

vi.mock('../../common/components/LoginForm/LoginForm', () => ({
  LoginForm: vi.fn(() => <div data-testid="mock-login-form">LoginForm Component</div>)
}));

vi.mock('../../store/user/user-selectors', () => ({
  getAuthorizationStatus: vi.fn()
}));

vi.mock('react-router-dom', () => ({
  Navigate: ({ to }: { to: string }) => <div>Redirecting to {to}</div>,
  useLocation: () => ({ pathname: '/login' })
}));

const mockGetAuthorizationStatus = userSelectors.getAuthorizationStatus as MockedFunction<typeof userSelectors.getAuthorizationStatus>;

describe('Login Component', () => {
  const axios = createAPI();
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<AppRootStateType, Action<string>, AppDispatch>(middleware);
  const store = mockStoreCreator({
    user: {
      authorizationStatus: false,
      userData: null
    }
  });

  it('should show login form', () => {
    mockGetAuthorizationStatus.mockReturnValue(false);

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(screen.queryByText('Redirecting to /')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-login-form')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should redirect on auth user', () => {
    mockGetAuthorizationStatus.mockReturnValue(true);

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(screen.getByText('Redirecting to /')).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });
});
