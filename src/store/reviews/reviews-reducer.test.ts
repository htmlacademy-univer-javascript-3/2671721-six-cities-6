import { setReviews } from './reviews-actions';
import { reviewsReducer } from './reviews-reducer';
import { mockInitialState, mockReview } from '../../utils/mocks';

describe('Reviews Reducer', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = mockInitialState.reviews;

    const result = reviewsReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...mockInitialState.reviews, reviews: [] };

    const result = reviewsReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set reviews with "setReviews" action', () => {
    const reviews = [mockReview];
    const expectedState = { ...mockInitialState.reviews, reviews };

    const result = reviewsReducer(mockInitialState.reviews, setReviews(reviews));

    expect(result).toEqual(expectedState);
  });
});
