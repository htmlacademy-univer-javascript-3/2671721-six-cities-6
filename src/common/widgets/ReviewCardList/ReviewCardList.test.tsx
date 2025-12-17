import { render, screen } from '@testing-library/react';
import { ReviewCardList } from './ReviewCardList';
import { mockReview } from '../../utils/mocks.ts';
import { AuthResponse } from '../../types/auth.ts';

vi.mock('../../components/ReviewCard/ReviewCard', () => ({
  MemorizedReviewCard: vi.fn(({ rating, comment, date, user }) => (
    <li data-testid="review-card">
      <span data-testid="rating">{rating}</span>
      <span data-testid="comment">{comment}</span>
      <span data-testid="date">{date}</span>
      <span data-testid="user">{(user as AuthResponse).name}</span>
    </li>
  ))
}));

describe('ReviewCardList Component', () => {
  const mockProps = {
    reviewCardList: [
      mockReview,
      {
        ...mockReview,
        id: 'review2',
        rating: 4,
        comment: 'comment2',
        date: 'date2',
        user: {
          ...mockReview.user,
          name: 'name2'
        }
      }
    ]
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correct', () => {
    render(<ReviewCardList {...mockProps} />);

    expect(screen.getByText(mockProps.reviewCardList.length.toString())).toBeInTheDocument();
    expect(screen.getAllByTestId('review-card')).toHaveLength(mockProps.reviewCardList.length);
    expect(screen.getByText(mockProps.reviewCardList[0].comment)).toBeInTheDocument();
    expect(screen.getByText(mockProps.reviewCardList[1].user.name)).toBeInTheDocument();

    mockProps.reviewCardList.forEach((reviewCard) => {
      expect(screen.getByText(reviewCard.comment)).toBeInTheDocument();
      expect(screen.getByText(reviewCard.user.name)).toBeInTheDocument();
      expect(screen.getByText(reviewCard.date)).toBeInTheDocument();
      expect(screen.getByText(reviewCard.rating)).toBeInTheDocument();
    });
  });
});
