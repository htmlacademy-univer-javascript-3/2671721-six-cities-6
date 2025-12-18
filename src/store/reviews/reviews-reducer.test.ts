import { setReviews } from './reviews-actions';
import { reviewsReducer, ReviewsState } from './reviews-reducer';
import { mockReview } from '../../common/utils/mocks';

describe('Reviews Reducer', () => {
  const initialState: ReviewsState = {
    reviews: [],
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = initialState;

    const result = reviewsReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = initialState;

    const result = reviewsReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set reviews with "setReviews" action', () => {
    const reviews = [mockReview];
    const expectedState = { ...initialState, reviews };

    const result = reviewsReducer(initialState, setReviews(reviews));

    expect(result).toEqual(expectedState);
  });
});
