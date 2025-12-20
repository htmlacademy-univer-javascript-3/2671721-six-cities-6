import { render, screen } from '@testing-library/react';
import { FavoriteLocation } from './favorite-location';
import { City, IPlaceCard, PlaceCardType } from '../../types/app';
import { mockPlaceCard } from '../../utils/mocks';

vi.mock('../place-card/place-card', () => ({
  MemorizedPlaceCard: vi.fn(({ placeCard, cardType } : {
    placeCard: IPlaceCard;
    cardType: PlaceCardType;
  }) => (
    <div data-testid="place-card" data-id={cardType}>{placeCard.title}</div>
  ))
}));

describe('FavoriteLocation Component', () => {
  const mockPlaces: IPlaceCard[] = [
    mockPlaceCard,
    {
      ...mockPlaceCard,
      id: 'uuid-1',
      title: 'other'
    }
  ];

  const mockProps = {
    name: City.Paris,
    places: mockPlaces
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correct', () => {
    render(<FavoriteLocation {...mockProps} />);

    const placeCards = screen.getAllByTestId('place-card');
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(placeCards).toHaveLength(mockPlaces.length);
    placeCards.forEach((card, index) => {
      expect(card).toHaveAttribute('data-id', PlaceCardType.Wide);
      expect(screen.getByText(mockPlaces[index].title)).toBeInTheDocument();
    });
  });
});
