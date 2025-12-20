import { render, screen, waitFor } from '@testing-library/react';
import { Offer } from './offer';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import {
  getIsLoading,
  getNearbyOffers,
  getOfferData
} from '../../store/offers/offers-selectors';
import { getAuthorizationStatus } from '../../store/user/user-selectors';
import { getReviews } from '../../store/reviews/reviews-selectors';
import { mockOffer, mockPlaceCard, mockReview } from '../../utils/mocks';
import { Mock } from 'vitest';
import { Selector } from '../../store/types';
import { changeFavoriteStatus } from '../../store/offers/offers-api-actions';
import userEvent from '@testing-library/user-event';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn()
}));

vi.mock('../../store/hooks/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn()
}));

vi.mock('../../store/offers/offers-api-actions', () => ({
  fetchOfferData: vi.fn(),
  fetchNearbyOffers: vi.fn(),
  changeFavoriteStatus: vi.fn()
}));

vi.mock('../../store/reviews/reviews-api-actions', () => ({
  fetchReviews: vi.fn()
}));

vi.mock('../../components/header/header', () => ({
  Header: vi.fn(() => <header data-testid="header">Header</header>)
}));

vi.mock('../../components/review-card-list/review-card-list', () => ({
  MemorizedReviewCardList: vi.fn(() => <div data-testid="review-card-list">Review Card List</div>)
}));

vi.mock('../../components/review-form/review-form', () => ({
  MemorizedReviewForm: vi.fn(() => <div data-testid="review-form">Review Form</div>)
}));

vi.mock('../../components/map/map', () => ({
  MemorizedMap: vi.fn(() => <div data-testid="map">Map</div>)
}));

vi.mock('../../components/place-card-list/place-card-list', () => ({
  MemorizedPlaceCardList: vi.fn(() => <div data-testid="place-card-list">Place Card List</div>)
}));

vi.mock('../../components/spinner/spinner', () => ({
  Spinner: vi.fn(() => <div data-testid="spinner">Loading...</div>)
}));

vi.mock('../not-found/not-found', () => ({
  NotFound: vi.fn(() => <div data-testid="not-found">Not Found</div>)
}));

vi.mock('../../utils/utils', () => ({
  calculateRatingPercent: vi.fn(() => '80%')
}));

describe('Offer Component', () => {
  const mockDispatch = vi.fn();
  const mockUseSelector = vi.fn();

  const mockNearbyOffers = [ mockPlaceCard ];
  const mockReviews = [ mockReview ];

  beforeEach(() => {
    vi.clearAllMocks();

    (useParams as Mock).mockReturnValue({ id: mockOffer.id });
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockReturnValue(mockUseSelector);

    mockUseSelector.mockImplementation((selector: Selector) => {
      if (selector === getAuthorizationStatus) {
        return true;
      } else if (selector === getIsLoading) {
        return false;
      } else if (selector === getOfferData) {
        return mockOffer;
      } else if (selector === getNearbyOffers) {
        return mockNearbyOffers;
      } else if (selector === getReviews) {
        return mockReviews;
      }
      return null;
    });
  });

  it('should render loading spinner when isLoading is true', () => {
    mockUseSelector.mockImplementation((selector: Selector) => {
      if (selector === getIsLoading) {
        return true;
      }
      return null;
    });

    render(<Offer />);

    waitFor(() => {
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('should render NotFound when offerData is null', () => {
    mockUseSelector.mockImplementation((selector) => {
      if (selector === getIsLoading) {
        return false;
      } else if (selector === getOfferData) {
        return null;
      }
      return null;
    });

    render(<Offer />);

    waitFor(() => {
      expect(screen.getByTestId('not-found')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('should render offer data correctly', () => {
    render(<Offer />);

    waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
      expect(screen.getByText(mockOffer.description)).toBeInTheDocument();
      expect(screen.getByText(mockOffer.host.name)).toBeInTheDocument();
      expect(screen.getByText('Premium')).toBeInTheDocument();
      expect(screen.getByText(`${mockOffer.rating}`)).toBeInTheDocument();
      expect(screen.getByText(`${mockOffer.bedrooms} Bedrooms`)).toBeInTheDocument();
      expect(screen.getByText(`Max ${mockOffer.maxAdults} adults`)).toBeInTheDocument();
      expect(screen.getByTestId('review-card-list')).toBeInTheDocument();
      expect(screen.getByTestId('map')).toBeInTheDocument();
      expect(screen.getByTestId('place-card-list')).toBeInTheDocument();
      mockOffer.goods.forEach((good) => {
        expect(screen.getByText(good)).toBeInTheDocument();
      });

      const images = screen.getAllByAltText('Photo studio');
      expect(images).toHaveLength(mockOffer.images.length);
    }, { timeout: 1000 });
  });

  it('should render ReviewForm when user is authenticated', () => {
    mockUseSelector.mockImplementation((selector) => {
      if (selector === getAuthorizationStatus) {
        return true;
      } else if (selector === getIsLoading) {
        return false;
      } else if (selector === getOfferData) {
        return mockOffer;
      }
      return null;
    });

    render(<Offer />);

    waitFor(() => {
      expect(screen.getByTestId('review-form')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('should not render ReviewForm when user is not authenticated', () => {
    mockUseSelector.mockImplementation((selector) => {
      if (selector === getAuthorizationStatus) {
        return false;
      } else if (selector === getIsLoading) {
        return false;
      } else if (selector === getOfferData) {
        return mockOffer;
      }
      return null;
    });

    render(<Offer />);

    waitFor(() => {
      expect(screen.queryByTestId('review-form')).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('should call correct changeFavoriteStatus', () => {
    const mockChangeFavoriteAction = vi.fn();
    (changeFavoriteStatus as unknown as Mock).mockReturnValue(mockChangeFavoriteAction);

    mockUseSelector.mockImplementation((selector) => {
      if (selector === getAuthorizationStatus) {
        return true;
      } else if (selector === getIsLoading) {
        return false;
      } else if (selector === getOfferData) {
        return mockOffer;
      }
      return null;
    });

    render(<Offer />);

    waitFor(async () => {
      const bookmarkButton = screen.getByRole('button', { name: /to bookmarks/i });

      await userEvent.click(bookmarkButton);

      expect(changeFavoriteStatus).toHaveBeenCalledWith({
        offerId: mockOffer.id,
        status: 1
      });

      expect(mockDispatch).toHaveBeenCalledWith(mockChangeFavoriteAction);
    });
  });
});
