import { FC } from 'react';
import { IReview } from '../../types/app.ts';
import { ReviewCard } from '../../components/ReviewCard/ReviewCard.tsx';

interface IReviewCardListProps {
  reviewCardList: IReview[];
}

export const ReviewCardList: FC<IReviewCardListProps> = ({ reviewCardList }) => (
  <>
    <h2 className="reviews__title">Reviews &middot;<span className="reviews__amount">{reviewCardList.length}</span></h2>
    <ul className="reviews__list">
      {reviewCardList.map((review) => (
        <ReviewCard
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
