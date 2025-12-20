import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { postReview } from '../../store/reviews/reviews-api-actions';
import { mockOffer } from '../../utils/mocks';
import { ReviewForm } from './review-form';
import { Selector } from '../../store/types';
import {
  getReviewError,
  getReviewLoading
} from '../../store/reviews/reviews-selectors';

vi.mock('../../store/hooks/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn()
}));

vi.mock('../../store/reviews/reviews-api-actions', () => ({
  postReview: vi.fn()
}));

describe('ReviewForm Component', () => {
  const mockDispatch = vi.fn();
  const mockOfferId = mockOffer.id;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockImplementation((selector: Selector) => {
      if (selector === getReviewLoading) {
        return false;
      } else if (selector === getReviewError) {
        return false;
      }
      return null;
    });
  });

  it('should render form with all elements', () => {
    render(<ReviewForm offerId={mockOfferId} />);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('rating')).toBeInTheDocument();
    expect(screen.getByText('50 characters')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('should update rating when star is clicked', async () => {
    render(<ReviewForm offerId={mockOfferId} />);

    const stars = screen.getByTitle('perfect');
    await userEvent.click(stars);

    expect(screen.getAllByRole('radio')[0]).toBeChecked();
  });

  it('should submit form with correct data', async () => {
    const mockPostReviewAction = vi.fn();
    vi.mocked(postReview).mockReturnValue(mockPostReviewAction);

    render(<ReviewForm offerId={mockOfferId} />);

    const stars = screen.getByTitle('perfect');
    await userEvent.click(stars);

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    const testComment = 'a'.repeat(50);
    await userEvent.type(textarea, testComment);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    expect(postReview).toHaveBeenCalledWith({
      offerId: mockOfferId,
      comment: testComment,
      rating: 5
    });

    expect(mockDispatch).toHaveBeenCalledWith(mockPostReviewAction);
  });

  it('should disable submit button when rating is not selected', () => {
    render(<ReviewForm offerId={mockOfferId} />);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeDisabled();
  });

  it('should disable submit button when comment is less than 50 characters', async () => {
    render(<ReviewForm offerId={mockOfferId} />);

    const star = screen.getByTitle('perfect');
    await userEvent.click(star);

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    const testComment = 'a'.repeat(5);
    await userEvent.type(textarea, testComment);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeDisabled();
  });

  it('should disable submit button when comment exceeds 300 characters', async () => {
    render(<ReviewForm offerId={mockOfferId} />);

    const star = screen.getByTitle('perfect');
    await userEvent.click(star);

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    const longComment = 'a'.repeat(301);
    await userEvent.type(textarea, longComment);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeDisabled();
  }, 10000);
});
