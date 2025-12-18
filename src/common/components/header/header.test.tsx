import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Action } from '@reduxjs/toolkit';
import { Header } from './header';
import * as userSelectors from '../../../store/user/user-selectors';
import * as userApiActions from '../../../store/user/user-api-actions';
import * as offersSelectors from '../../../store/offers/offers-selectors';
import { Path } from '../../utils/const';
import { createAPI } from '../../utils/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppDispatch, AppRootStateType } from '../../../store/types';
import { mockAuthResponse, mockPlaceCard } from '../../utils/mocks';
import { ReactNode } from 'react';

let mockLocation = { pathname: '/' };
vi.mock('../../../store/user/user-selectors');
vi.mock('../../../store/offers/offers-selectors');
vi.mock('../../../store/user/user-api-actions');
vi.mock('../../utils/utils.ts', () => ({
  isPath: vi.fn(() => true)
}));
vi.mock('react-router-dom', async () => {
  const actual: object = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Link: ({ to, children, ...props }: { to: string; children: ReactNode }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
    useLocation: vi.fn(() => mockLocation)
  };
});

const mockGetAuthorizationStatus = vi.mocked(userSelectors.getAuthorizationStatus);
const mockGetUserData = vi.mocked(userSelectors.getUserData);
const mockGetFavoritePlaceCards = vi.mocked(offersSelectors.getFavoritePlaceCards);
const mockLogout = vi.mocked(userApiActions.logout);


describe('header Component', () => {
  const mockFavoritePlaceCards = [mockPlaceCard];
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
    mockLocation = { pathname: '/' };
    mockGetUserData.mockReturnValue(null);
    mockGetAuthorizationStatus.mockReturnValue(false);
    mockGetFavoritePlaceCards.mockReturnValue(mockFavoritePlaceCards);
  });

  it('should render correct', () => {
    const { container } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(container.querySelector('header')).toHaveClass('header');
    expect(container.querySelector('.container')).toBeInTheDocument();
    expect(container.querySelector('.header__wrapper')).toBeInTheDocument();
    expect(container.querySelector('.header__left')).toBeInTheDocument();

    const logoLink = screen.getByRole('link', { name: /6 cities logo/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', Path.MAIN);
    expect(logoLink).toHaveClass('header__logo-link');

    const logoImage = screen.getByAltText('6 cities logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'img/logo.svg');
    expect(logoImage).toHaveAttribute('width', '81');
    expect(logoImage).toHaveAttribute('height', '41');
    expect(logoImage).toHaveClass('header__logo');
  });

  it('should not show navigation on login page', () => {
    mockLocation = { pathname: Path.LOGIN };
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('should not show user profile link', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const signInLink = screen.getByRole('link', { name: 'Sign in' });
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', Path.LOGIN);
    expect(screen.queryByText('@')).not.toBeInTheDocument();
  });

  it('should show user email, sign out and favorite count when user is authenticated', () => {
    mockGetAuthorizationStatus.mockReturnValue(true);
    mockGetUserData.mockReturnValue(mockAuthResponse);
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const signOutLink = screen.getByRole('link', { name: 'Sign out' });
    expect(signOutLink).toBeInTheDocument();
    expect(signOutLink).toHaveAttribute('href', Path.MAIN);
    expect(screen.getByText(mockAuthResponse.email)).toBeInTheDocument();
    expect(screen.getByText(mockFavoritePlaceCards.length)).toBeInTheDocument();
  });

  it('should dispatch logout action when Sign out is clicked', () => {
    mockGetAuthorizationStatus.mockReturnValue(true);
    mockLogout.mockReturnValue({ type: 'LOGOUT' } as unknown as ReturnType<typeof mockLogout>);
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const signOutLink = screen.getByRole('link', { name: 'Sign out' });
    fireEvent.click(signOutLink);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
