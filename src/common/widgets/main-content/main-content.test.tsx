import {render, screen, waitFor} from '@testing-library/react';
import { MainContent } from './main-content';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { fetchOffers } from '../../../store/offers/offers-api-actions';
import { MemorizedPlaceCardList } from '../place-card-list/place-card-list';
import { MemorizedMap } from '../../components/map/map';
import { City, SortingType } from '../../types/app';
import { mockPlaceCard } from '../../utils/mocks';
import { Selector } from '../../../store/types';
import {
  getActiveCity,
  getActiveSortingType,
  getIsLoading,
  getPlaceCards
} from '../../../store/offers/offers-selectors';

vi.mock('../../../store/hooks/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn()
}));

vi.mock('../../../store/offers/offers-api-actions', () => ({
  fetchOffers: vi.fn()
}));

vi.mock('../../components/spinner/spinner', () => ({
  Spinner: vi.fn(() => <div data-testid="spinner">Loading...</div>)
}));

vi.mock('../../components/sorted-select/sorted-select', () => ({
  MemorizedSortedSelect: vi.fn(() => <div data-testid="sorted-select">Sorted Select</div>)
}));

vi.mock('../place-card-list/place-card-list', () => ({
  MemorizedPlaceCardList: vi.fn(() => <div data-testid="place-card-list">Place Card List</div>)
}));

vi.mock('../../components/map/map', () => ({
  MemorizedMap: vi.fn(() => <div data-testid="map">Map</div>)
}));

vi.mock('../location-list/location-list', () => ({
  LocationList: vi.fn(() => <div data-testid="location-list">Location List</div>)
}));

describe('MainContent Component', () => {
  const mockDispatch = vi.fn();
  const mockPlaceCards = [
    mockPlaceCard,
    { ...mockPlaceCard, id: '2', title: 'place2' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);

    vi.mocked(useAppSelector).mockImplementation((selector: Selector) => {
      if (selector === getActiveCity) {
        return City.PARIS;
      } else if (selector === getActiveSortingType) {
        return SortingType.POPULAR;
      } else if (selector === getIsLoading) {
        return false;
      } else if (selector === getPlaceCards) {
        return mockPlaceCards;
      }
      return null;
    });
  });

  it('should render loading spinner when isLoading is true', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === getIsLoading) {
        return true;
      } else if (selector === getPlaceCards) {
        return [];
      }
      return null;
    });

    render(<MainContent />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should fetch offers on component mount', () => {
    render(<MainContent />);

    expect(fetchOffers).toHaveBeenCalledWith({
      city: City.PARIS,
      activeSortingType: SortingType.POPULAR
    });

    waitFor(() => {
      expect(screen.getByTestId('location-list')).toBeInTheDocument();
      expect(screen.getByTestId('sorted-select')).toBeInTheDocument();
      expect(screen.getByText(`${mockPlaceCards.length} places to stay in ${City.PARIS}`)).toBeInTheDocument();
      expect(MemorizedPlaceCardList).toHaveBeenCalledWith(
        { placeCardList: mockPlaceCards, isMain: true }
      );
      expect(MemorizedMap).toHaveBeenCalledWith(
        { placeCardList: mockPlaceCards, isMain: true }
      );
    });
  });

  it('should render empty state', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === getIsLoading) {
        return false;
      } else if (selector === getPlaceCards) {
        return [];
      } else if (selector === getActiveCity) {
        return City.PARIS;
      }
      return null;
    });
    render(<MainContent />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in/i)).toBeInTheDocument();
    expect(screen.queryByTestId('sorted-select')).not.toBeInTheDocument();
    expect(screen.queryByTestId('place-card-list')).not.toBeInTheDocument();
    expect(screen.queryByTestId('map')).not.toBeInTheDocument();
  });
});
