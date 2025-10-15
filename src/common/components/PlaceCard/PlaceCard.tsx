import { FC } from 'react';
import { IPlaceCard, PlaceCardType } from '../../types.ts';
import { calculateRatingPercent } from '../../utils.ts';
import { Link } from 'react-router-dom';

interface IPlaceCardProps {
  cardType: PlaceCardType;
  id: IPlaceCard['id'];
  title: IPlaceCard['title'];
  type: IPlaceCard['type'];
  price: IPlaceCard['price'];
  isPremium: IPlaceCard['isPremium'];
  isFavorite: IPlaceCard['isFavorite'];
  previewImage: IPlaceCard['previewImage'];
  rating: IPlaceCard['rating'];
  handleClick: (title: string) => void;
}

export const PlaceCard: FC<IPlaceCardProps> = (props) => {
  const {
    cardType,
    id,
    title,
    type,
    isPremium,
    isFavorite,
    previewImage,
    price,
    rating,
    handleClick,
  } = props;
  const isWide = cardType === PlaceCardType.WIDE;

  return (
    <article className={`${cardType}__card place-card`} onClick={() => handleClick(title)}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={isWide ? 150 : 260}
            height={isWide ? 110 : 200}
            alt="Place image"
          />
        </Link>
      </div>

      <div className={`${isWide && 'favorites__card-info'} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <button className={`place-card__bookmark-button button ${isFavorite && 'place-card__bookmark-button--active'}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${calculateRatingPercent(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};
