import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './app-routes';
import { Path } from '../common/utils/const';
import { Provider } from 'react-redux';
import { createAPI } from '../common/utils/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppDispatch, AppRootStateType } from '../store/types';
import { Action } from '@reduxjs/toolkit';
import { mockAuthResponse, mockInitialState } from '../common/utils/mocks';

vi.mock('../pages/main/main', () => ({
  Main: () => <div data-testid="main-page">Main Page</div>
}));

vi.mock('../pages/login/login', () => ({
  Login: () => <div data-testid="login-page">Login Page</div>
}));

vi.mock('../pages/offer/offer', () => ({
  Offer: () => <div data-testid="offer-page">Offer Page</div>
}));

vi.mock('../pages/favorites/favorites', () => ({
  Favorites: () => <div data-testid="favorites-page">Favorites Page</div>
}));

vi.mock('../pages/not-found/not-found', () => ({
  NotFound: () => <div data-testid="not-found-page">Not Found Page</div>
}));

describe('AppRoutes', () => {
  const axios = createAPI();
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<AppRootStateType, Action, AppDispatch>(middleware);

  const renderWithRouter = (initialRoute = '/', initialState?: Partial<AppRootStateType>) => {
    const store = mockStoreCreator({
      ...mockInitialState,
      ...initialState
    });

    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <AppRoutes />
        </MemoryRouter>
      </Provider>
    );
  };

  describe('Public routes', () => {
    it('should render "Main" screen when user navigates to "/"', () => {
      renderWithRouter('/');

      expect(screen.getByTestId('main-page')).toBeInTheDocument();
    });

    it('should render "Login" screen when user navigates to "/login"', () => {
      renderWithRouter(Path.LOGIN);

      expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });

    it('should render "Offer" screen when user navigates to "/offer/:id"', () => {
      renderWithRouter(`${Path.OFFER}/123`);

      expect(screen.getByTestId('offer-page')).toBeInTheDocument();
    });

    it('should render "NotFound" screen when user navigates to non-existent route', () => {
      renderWithRouter('/non-existent-route');

      expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    });
  });

  describe('Protected routes', () => {
    it('should redirect to "Login" screen when unauthorized user navigates to "/favorites"', () => {
      renderWithRouter(Path.FAVORITES);

      expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });

    it('should render "Favorites" screen when authorized user navigates to "/favorites"', () => {
      renderWithRouter(Path.FAVORITES, {
        user: {
          authorizationStatus: true,
          userData: mockAuthResponse,
        }
      });

      expect(screen.getByTestId('favorites-page')).toBeInTheDocument();
    });
  });
});
