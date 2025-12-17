import { setReviews } from './reviews-actions.ts';
import { reviewsReducer, ReviewsState } from './reviews-reducer.ts';
import { mockReview } from '../../common/utils/mocks.ts';

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
