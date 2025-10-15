import { ChangeEvent, FC, FormEvent, Fragment, useState } from 'react';

interface IReviewFormProps {
}

export const ReviewForm: FC<IReviewFormProps> = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmitReview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(+e.target.value);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <form onSubmit={handleSubmitReview} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              checked={rating === star}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={{ 5: 'perfect', 4: 'good', 3: 'not bad', 2: 'badly', 1: 'terribly' }[star]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
