import { render, screen, waitFor } from '@testing-library/react';
import { FavoriteContent } from './favorite-content';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { MemorizedFavoriteLocation } from '../favorite-location/favorite-location';
import {City, IPlaceCard} from '../../types/app';
import { mockPlaceCard } from '../../utils/mocks';
import { getFavoritePlaceCards, getIsLoading } from '../../../store/offers/offers-selectors';
import { Selector } from '../../../store/types';

vi.mock('../../../store/hooks/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn()
}));

vi.mock('../../../store/offers/offers-api-actions', () => ({
  fetchFavoritesOffers: vi.fn()
}));

vi.mock('../../components/spinner/spinner', () => ({
  Spinner: vi.fn(() => <div data-testid="spinner">Loading...</div>)
}));

vi.mock('../favorite-location/favorite-location', () => ({
  MemorizedFavoriteLocation: vi.fn(({ name, places } : { name: City; places: IPlaceCard[] }) => (
    <li data-testid="favorite-location" data-name={name}>
      {name} - {places.length} places
    </li>
  ))
}));

describe('FavoriteContent Component', () => {
  const mockDispatch = vi.fn();
  const mockFavoritePlaceCards = [
    mockPlaceCard,
    { ...mockPlaceCard, id: 'uuid-1', city: { name: City.AMSTERDAM } },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);

    vi.mocked(useAppSelector).mockImplementation((selector: Selector) => {
      if (selector === getIsLoading) {
        return false;
      } else if (selector === getFavoritePlaceCards) {
        return mockFavoritePlaceCards;
      }
      return null;
    });
  });

  it('should render loading spinner when isLoading is true', () => {
    vi.mocked(useAppSelector).mockImplementation((selector: Selector) => {
      if (selector === getIsLoading) {
        return true;
      } else if (selector === getFavoritePlaceCards) {
        return [];
      }
      return null;
    });

    render(<FavoriteContent />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render favorite locations when there are favorite places', () => {
    render(<FavoriteContent />);

    waitFor(() => {
      expect(screen.getByText('Saved listing')).toBeInTheDocument();

      const favoriteLocations = screen.getAllByTestId('favorite-location');
      expect(favoriteLocations).toHaveLength(2);
    });
  });

  it('should render empty state when there are no favorite places', () => {
    vi.mocked(useAppSelector).mockImplementation((selector: Selector) => {
      if (selector === getIsLoading) {
        return false;
      } else if (selector === getFavoritePlaceCards) {
        return [];
      }
      return null;
    });

    render(<FavoriteContent />);

    waitFor(() => {
      expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
      expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
      expect(screen.queryByText('Saved listing')).not.toBeInTheDocument();
      expect(screen.queryByTestId('favorite-location')).not.toBeInTheDocument();
      expect(MemorizedFavoriteLocation).not.toHaveBeenCalled();
    });
  });
});
