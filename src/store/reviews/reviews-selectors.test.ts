import { ReviewsState } from './reviews-reducer.ts';
import { selectReviews, getReviews } from './reviews-selectors.ts';
import { mockReview } from '../../common/utils/mocks.ts';
import { Reducer } from '../../common/utils/const.ts';

describe('Reviews selectors', () => {
  const mockState: ReviewsState = {
    reviews: [mockReview],
  };

  it('should return reviews from state', () => {
    const result = selectReviews({ [Reducer.REVIEWS]: mockState });
    expect(result).toEqual(mockState.reviews);
  });

  it('should return reviews using createSelector', () => {
    const result = getReviews({ [Reducer.REVIEWS]: mockState });
    expect(result).toEqual(mockState.reviews);
  });
});
