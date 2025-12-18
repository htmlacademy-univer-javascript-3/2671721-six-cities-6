import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PlaceCard } from './place-card';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { setActivePlaceCardId } from '../../../store/offers/offers-actions';
import { changeFavoriteStatus } from '../../../store/offers/offers-api-actions';
import { getAuthorizationStatus } from '../../../store/user/user-selectors';
import { PlaceCardType } from '../../types/app';
import { Path } from '../../utils/const';
import { mockPlaceCard } from '../../utils/mocks';
import { Selector } from '../../../store/types';
import {ReactNode} from 'react';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  Link: vi.fn(({ to, children, ...props } : { to: string; children: ReactNode }) => (
    <a href={to} {...props} data-testid="link">
      {children}
    </a>
  ))
}));

vi.mock('../../../store/hooks/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn()
}));

vi.mock('../../../store/offers/offers-actions', () => ({
  setActivePlaceCardId: vi.fn()
}));

vi.mock('../../../store/offers/offers-api-actions', () => ({
  changeFavoriteStatus: vi.fn()
}));

vi.mock('../../utils/utils', () => ({
  calculateRatingPercent: vi.fn((rating) => `${rating * 20}%`)
}));

describe('PlaceCard Component', () => {
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();

  const defaultProps = {
    placeCard: mockPlaceCard,
    cardType: PlaceCardType.WIDE,
    isMain: false
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockImplementation((selector: Selector) => {
      if (selector === getAuthorizationStatus) {
        return true;
      }
      return null;
    });
    vi.mocked(changeFavoriteStatus).mockReturnValue(vi.fn());
  });

  it('should render place card with correct data', () => {
    render(<PlaceCard {...defaultProps} />);

    expect(screen.getByText(mockPlaceCard.title)).toBeInTheDocument();
    expect(screen.getByText(mockPlaceCard.type)).toBeInTheDocument();
    expect(screen.getByText(`€${mockPlaceCard.price}`)).toBeInTheDocument();
    expect(screen.getByText('/ night')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /to bookmarks/i })).not.toHaveClass('place-card__bookmark-button--active');
    expect(screen.getByAltText('Place image')).toHaveAttribute('src', mockPlaceCard.previewImage);

    const image = screen.getByAltText('Place image');
    expect(image).toHaveAttribute('width', '150');
    expect(image).toHaveAttribute('height', '110');
  });

  it('should not render premium badge when isPremium is false', () => {
    const props = {
      ...defaultProps,
      placeCard: {
        ...mockPlaceCard,
        isPremium: false
      }
    };
    render(<PlaceCard {...props} />);


    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render active bookmark button when isFavorite is true', () => {
    const props = {
      ...defaultProps,
      placeCard: {
        ...mockPlaceCard,
        isFavorite: true
      }
    };
    render(<PlaceCard {...props} />);

    const bookmarkButton = screen.getByRole('button', { name: /to bookmarks/i });
    expect(bookmarkButton).toHaveClass('place-card__bookmark-button--active');
  });

  it('should have correct image dimensions for REGULAR card type', () => {
    const props = {
      ...defaultProps,
      cardType: PlaceCardType.DEFAULT
    };
    render(<PlaceCard {...props} />);

    const image = screen.getByAltText('Place image');
    expect(image).toHaveAttribute('width', '260');
    expect(image).toHaveAttribute('height', '200');
  });

  it('should render links to offer page with correct href', () => {
    render(<PlaceCard {...defaultProps} />);

    screen.getAllByTestId('link').forEach((link) => {
      expect(link).toHaveAttribute('href', `${Path.OFFER}/${mockPlaceCard.id}`);
    });
  });

  it('should call setActivePlaceCardId on mouse over when isMain is true', () => {
    const props = {
      ...defaultProps,
      isMain: true
    };
    render(<PlaceCard {...props} />);

    const article = screen.getByRole('article');
    fireEvent.mouseOver(article);

    expect(setActivePlaceCardId).toHaveBeenCalledWith(mockPlaceCard.id);
    expect(mockDispatch).toHaveBeenCalled();

    fireEvent.mouseOut(article);

    expect(setActivePlaceCardId).toHaveBeenCalledWith(null);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should call correct changeFavoriteStatus', async () => {
    render(<PlaceCard {...defaultProps} />);

    const bookmarkButton = screen.getByRole('button', { name: /to bookmarks/i });
    await userEvent.click(bookmarkButton);

    expect(changeFavoriteStatus).toHaveBeenCalledWith({
      offerId: mockPlaceCard.id,
      status: 1
    });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should navigate to login page when user is not authenticated', async () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === getAuthorizationStatus) {
        return false;
      }
      return null;
    });

    render(<PlaceCard {...defaultProps} />);

    const bookmarkButton = screen.getByRole('button', { name: /to bookmarks/i });
    await userEvent.click(bookmarkButton);

    expect(mockNavigate).toHaveBeenCalledWith(Path.LOGIN);
  });
});
