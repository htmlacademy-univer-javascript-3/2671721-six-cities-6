import { FC, memo } from 'react';
import { IReview } from '../../types/app';
import { MemorizedReviewCard } from '../review-card/review-card';

interface IReviewCardListProps {
  reviewCardList: IReview[];
}

export const ReviewCardList: FC<IReviewCardListProps> = ({ reviewCardList }) => (
  <>
    <h2 className="reviews__title">Reviews &middot;<span className="reviews__amount">{reviewCardList.length}</span></h2>
    <ul className="reviews__list">
      {reviewCardList.map((review) => (
        <MemorizedReviewCard
          rating={review.rating}
          comment={review.comment}
          date={review.date}
          user={review.user}
          key={review.id}
        />
      ))}
    </ul>
  </>
);

export const MemorizedReviewCardList = memo(ReviewCardList,
  (prevProps, nextProps) =>
    prevProps.reviewCardList === nextProps.reviewCardList
);
