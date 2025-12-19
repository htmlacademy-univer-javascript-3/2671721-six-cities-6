import { render, screen } from '@testing-library/react';
import { PlaceCardList } from './place-card-list';
import { IPlaceCard, PlaceCardType } from '../../types/app';
import { mockPlaceCard } from '../../utils/mocks';

vi.mock('../../components/place-card/place-card', () => ({
  MemorizedPlaceCard: vi.fn(({ placeCard, cardType, isMain } : {
    placeCard: IPlaceCard;
    cardType: PlaceCardType;
    isMain: boolean;
  }) => (
    <div
      data-testid="place-card"
      data-id={placeCard?.id}
      data-card-type={cardType}
      data-is-main={isMain}
    >
      {placeCard?.title}
    </div>
  ))
}));

describe('PlaceCardList Component', () => {
  const mockPlaceCardList: IPlaceCard[] = [
    mockPlaceCard,
    {
      ...mockPlaceCard,
      id: 'uuid-2',
      title: 'other',
      price: 150
    },
    {
      ...mockPlaceCard,
      id: 'uuid-3',
      title: 'another',
      price: 80
    }
  ];

  const mockProps = {
    placeCardList: mockPlaceCardList,
    isMain: false
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correct', () => {
    render(<PlaceCardList {...mockProps} />);

    const placeCards = screen.getAllByTestId('place-card');

    expect(placeCards).toHaveLength(mockPlaceCardList.length);

    placeCards.forEach((card, index) => {
      const placeCard = mockPlaceCardList[index];
      expect(card).toHaveAttribute('data-id', placeCard.id);
      expect(card).toHaveAttribute('data-card-type', PlaceCardType.DEFAULT);
      expect(card).toHaveAttribute('data-is-main', mockProps.isMain.toString());
      expect(screen.getByText(placeCard.title)).toBeInTheDocument();
    });
  });
});
