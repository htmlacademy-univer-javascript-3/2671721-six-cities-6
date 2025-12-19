import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Action } from '@reduxjs/toolkit';
import { LocationList } from './location-list';
import * as offersSelectors from '../../../store/offers/offers-selectors';
import { CITIES } from '../../utils/const';
import { createAPI } from '../../utils/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppDispatch, AppRootStateType } from '../../../store/types';
import { City, SortingType } from '../../types/app';

vi.mock('../../../store/offers/offers-selectors');
vi.mock('../../components/location/location', () => ({
  MemorizedLocation: vi.fn(({ city, isActive } : {
    city: City;
    isActive: boolean;
  }) => (
    <div data-testid="location-item" data-city={city} data-active={isActive}>
      {city} {isActive ? 'active' : ''}
    </div>
  ))
}));

const mockGetActiveCity = vi.mocked(offersSelectors.getActiveCity);

describe('LocationList Component', () => {
  const axios = createAPI();
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<AppRootStateType, Action<string>, AppDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

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
  });

  it('should render all cities from CITIES array', () => {
    render(
      <Provider store={store}>
        <LocationList />
      </Provider>
    );

    const locationItems = screen.getAllByTestId('location-item');
    expect(locationItems).toHaveLength(CITIES.length);

    CITIES.forEach((city, index) => {
      expect(locationItems[index]).toHaveAttribute('data-city', city);
    });
  });

  it('should mark Paris as active when activeCity is Paris', () => {
    mockGetActiveCity.mockReturnValue(City.PARIS);
    render(
      <Provider store={store}>
        <LocationList />
      </Provider>
    );

    const locationItems = screen.getAllByTestId('location-item');

    const parisItem = locationItems.find((item) => item.getAttribute('data-city') === 'Paris');
    expect(parisItem).toHaveAttribute('data-active', 'true');

    const otherCities = locationItems.filter((item) => item.getAttribute('data-city') !== 'Paris');
    otherCities.forEach((item) => {
      expect(item).toHaveAttribute('data-active', 'false');
    });
  });
});
