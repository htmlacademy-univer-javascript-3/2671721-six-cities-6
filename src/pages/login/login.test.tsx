import { render, screen } from '@testing-library/react';
import { Login } from './login';
import { Provider } from 'react-redux';
import { createAPI } from '../../utils/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppDispatch, AppRootStateType } from '../../store/types';
import { Action } from '@reduxjs/toolkit';
import * as userSelectors from '../../store/user/user-selectors';
import { MockedFunction } from 'vitest';
import { City } from '../../types/app';
import { getRandomCity } from '../../utils/utils';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import { setActiveCity } from '../../store/offers/offers-actions';
import { mockInitialState } from '../../utils/mocks';

vi.mock('../../components/header/header', () => ({
  Header: vi.fn(() => <div data-testid="mock-header">Header Component</div>)
}));

vi.mock('../../components/login-form/login-form', () => ({
  LoginForm: vi.fn(() => <div data-testid="mock-login-form">LoginForm Component</div>)
}));

vi.mock('../../store/user/user-selectors', () => ({
  getAuthorizationStatus: vi.fn()
}));

vi.mock('../../store/offers/offers-actions', () => ({
  setActiveCity: vi.fn()
}));

vi.mock('../../utils/utils', () => ({
  getRandomCity: vi.fn()
}));

vi.mock('react-router-dom', () => ({
  Navigate: ({ to }: { to: string }) => <div>Redirecting to {to}</div>,
  useNavigate: vi.fn(),
  useLocation: () => ({ pathname: '/login' })
}));

const mockGetAuthorizationStatus = userSelectors.getAuthorizationStatus as MockedFunction<typeof userSelectors.getAuthorizationStatus>;
const mockUseNavigate = useNavigate as MockedFunction<typeof useNavigate>;
const mockGetRandomCity = getRandomCity as MockedFunction<typeof getRandomCity>;
const mockSetActiveCity = setActiveCity as MockedFunction<typeof setActiveCity>;

describe('Login Component', () => {
  const axios = createAPI();
  const middlewares = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<AppRootStateType, Action<string>, AppDispatch>(middlewares);
  let store: ReturnType<typeof mockStoreCreator>;
  let mockNavigate: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockNavigate = vi.fn();
    mockUseNavigate.mockReturnValue(mockNavigate);

    store = mockStoreCreator({
      user: mockInitialState.user
    });
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

  it('should display random city from getRandomCity', async () => {
    mockGetRandomCity.mockReturnValue(City.Paris);
    mockGetAuthorizationStatus.mockReturnValue(false);
    mockSetActiveCity.mockReturnValue({ type: 'offers/setActiveCity', payload: City.Paris });

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(mockGetRandomCity).toHaveBeenCalled();
    expect(screen.getByText(City.Paris)).toBeInTheDocument();

    await userEvent.click(screen.getByText(City.Paris));

    expect(mockSetActiveCity).toHaveBeenCalledWith(City.Paris);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
