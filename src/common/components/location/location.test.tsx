import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Action } from '@reduxjs/toolkit';
import { Location } from './location';
import * as offersActions from '../../../store/offers/offers-actions';
import { createAPI } from '../../utils/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppDispatch, AppRootStateType } from '../../../store/types';
import { City, SortingType } from '../../types/app';

vi.mock('../../../store/offers/offers-actions');
const mockSetActiveCityAction = vi.mocked(offersActions.setActiveCityAction);

describe('location Component', () => {
  const axios = createAPI();
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<AppRootStateType, Action<string>, AppDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  const defaultProps = {
    isActive: false,
    city: City.PARIS
  };

  beforeEach(() => {
    store = mockStoreCreator({
      offers: {
        activeCity: City.PARIS,
        placeCards: [],
        favoritePlaceCards: [],
        activeSortingType: SortingType.POPULAR,
        isLoading: false,
        activePlaceCardId: null,
        offerId: null,
        offerData: null,
        nearbyOffers: []
      }
    });
    vi.clearAllMocks();
    mockSetActiveCityAction.mockReturnValue({ type: 'SET_ACTIVE_CITY', payload: City.PARIS } as unknown as ReturnType<typeof mockSetActiveCityAction>);
  });

  it('should display city name', () => {
    render(
      <Provider store={store}>
        <Location {...defaultProps} />
      </Provider>
    );

    expect(screen.getByText(defaultProps.city)).toBeInTheDocument();
  });

  it('should have correct CSS classes when not active', () => {
    render(
      <Provider store={store}>
        <Location {...defaultProps} />
      </Provider>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('locations__item-link', 'tabs__item');
    expect(link).not.toHaveClass('tabs__item--active');
  });

  it('should have correct CSS classes when active', () => {
    const props = {
      ...defaultProps,
      isActive: true,
    };

    render(
      <Provider store={store}>
        <Location {...props} />
      </Provider>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('locations__item-link', 'tabs__item', 'tabs__item--active');
  });

  it('should dispatch setActiveCityAction when clicked', () => {
    render(
      <Provider store={store}>
        <Location {...defaultProps} />
      </Provider>
    );

    const listItem = screen.getByRole('listitem');
    fireEvent.click(listItem);

    expect(mockSetActiveCityAction).toHaveBeenCalledTimes(1);
    expect(mockSetActiveCityAction).toHaveBeenCalledWith(defaultProps.city);
  });
});
