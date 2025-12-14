import { FC, memo } from 'react';
import { IReview } from '../../types/app.ts';
import { calculateRatingPercent, getDate } from '../../utils.ts';

interface IReviewCardProps extends Omit<IReview, 'id'> {
}

export const ReviewCard: FC<IReviewCardProps> = ({ user, rating, date, comment}) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar" src={user.avatarUrl}
          width="54" height="54" alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name">
        {user.name}
      </span>
      {user.isPro && (
        <span className="offer__user-status">
          Pro
        </span>
      )}
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: `${calculateRatingPercent(rating)}%`}}></span>
          <span className='visually-hidden'>Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {comment}
      </p>
      <time className="reviews__time" dateTime={date}>{getDate(date)}</time>
    </div>
  </li>
);

export const MemorizedReviewCard = memo(ReviewCard,
  (prevProps, nextProps) =>
    prevProps.rating === nextProps.rating
    && prevProps.date === nextProps.date
    && prevProps.comment === nextProps.comment
    && prevProps.user.name === nextProps.user.name
    && prevProps.user.isPro === nextProps.user.isPro
    && prevProps.user.avatarUrl === nextProps.user.avatarUrl
);
