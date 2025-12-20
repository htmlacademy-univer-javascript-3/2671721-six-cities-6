import { render, screen } from '@testing-library/react';
import { ReviewCard } from './review-card';
import { calculateRatingPercent, getDate } from '../../utils/utils';
import { mockReview } from '../../utils/mocks';

vi.mock('../../utils/utils', () => ({
  calculateRatingPercent: vi.fn(),
  getDate: vi.fn()
}));

const mockCalculateRatingPercent = vi.mocked(calculateRatingPercent);
const mockGetDate = vi.mocked(getDate);

describe('ReviewCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCalculateRatingPercent.mockReturnValue(90); // 4.5/5 = 90%
    mockGetDate.mockReturnValue('March 2024');
  });

  it('should render review card correct', () => {
    render(<ReviewCard {...mockReview} />);

    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
  });

  it('should show Pro badge when user is pro', () => {
    render(<ReviewCard {...mockReview} />);

    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('should NOT show Pro badge when user is not pro', () => {
    const mockReviewNotPro = {
      ...mockReview,
      user: {
        ...mockReview.user,
        isPro: false
      }
    };

    render(<ReviewCard {...mockReviewNotPro} />);

    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
  });

  it('should apply correct width to rating stars based on calculated percentage', () => {
    mockCalculateRatingPercent.mockReturnValue(60);
    render(<ReviewCard {...mockReview} />);

    const ratingSpan = screen.getByText('Rating').previousElementSibling;
    expect(ratingSpan).toHaveStyle('width: 60%');
    expect(mockCalculateRatingPercent).toHaveBeenCalledTimes(1);
    expect(mockCalculateRatingPercent).toHaveBeenCalledWith(mockReview.rating);
  });

  it('should render date with correct attributes', () => {
    render(<ReviewCard {...mockReview} />);

    expect(screen.getByText('March 2024')).toBeInTheDocument();
    expect(mockGetDate).toHaveBeenCalledTimes(1);
    expect(mockGetDate).toHaveBeenCalledWith(mockReview.date);
  });
});
