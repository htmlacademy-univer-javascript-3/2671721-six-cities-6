import {
  selectReviews,
  getReviews,
  selectReviewLoading,
  getReviewLoading
} from './reviews-selectors';
import { mockInitialState } from '../../utils/mocks';
import { Reducer } from '../../utils/const';

describe('Reviews selectors', () => {
  it('should return reviews from state', () => {
    const result = selectReviews({ [Reducer.Reviews]: mockInitialState.reviews });
    expect(result).toEqual(mockInitialState.reviews.reviews);
  });

  it('should return isLoading from state', () => {
    const result = selectReviewLoading({ [Reducer.Reviews]: mockInitialState.reviews });
    expect(result).toEqual(mockInitialState.reviews.isLoading);
  });

  it('should return reviews using createSelector', () => {
    const result = getReviews({[Reducer.Reviews]: mockInitialState.reviews});
    expect(result).toEqual(mockInitialState.reviews.reviews);
  });

  it('should return isLoading using createSelector', () => {
    const result = getReviewLoading({ [Reducer.Reviews]: mockInitialState.reviews });
    expect(result).toEqual(mockInitialState.reviews.isLoading);
  });
});
