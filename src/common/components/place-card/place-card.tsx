import { FC, memo } from 'react';
import { IPlaceCard, PlaceCardType } from '../../types/app';
import { calculateRatingPercent } from '../../utils/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { Path } from '../../utils/const';
import { setActivePlaceCardId } from '../../../store/offers/offers-actions';
import { getAuthorizationStatus } from '../../../store/user/user-selectors';
import {
  changeFavoriteStatus
} from '../../../store/offers/offers-api-actions';

interface IPlaceCardProps {
  placeCard: IPlaceCard;
  cardType: PlaceCardType;
  isMain?: boolean;
}

export const PlaceCard: FC<IPlaceCardProps> = ({ placeCard, cardType, isMain = false }) => {
  const {
    id,
    title,
    type,
    isPremium,
    isFavorite,
    previewImage,
    price,
    rating,
  } = placeCard;
  const isWide = cardType === PlaceCardType.WIDE;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(getAuthorizationStatus);

  const handleMouseOver = () =>{
    dispatch(setActivePlaceCardId(id));
  };

  const handleMouseOut = () =>{
    dispatch(setActivePlaceCardId(null));
  };

  const handleBookmarkClick = () => {
    if (!isAuthenticated) {
      navigate(Path.LOGIN);
    }

    const status = isFavorite ? 0 : 1;
    dispatch(changeFavoriteStatus({
      offerId: id,
      status: status
    }));
  };

  return (
    <article
      className={`${cardType}__card place-card`}
      onMouseOver={isMain ? handleMouseOver : undefined}
      onMouseOut={isMain ? handleMouseOut : undefined}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${Path.OFFER}/${id}`}>
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

          <button
            className={`place-card__bookmark-button button ${isFavorite && 'place-card__bookmark-button--active'}`}
            type="button"
            onClick={handleBookmarkClick}
          >
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
          <Link to={`${Path.OFFER}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export const MemorizedPlaceCard = memo(PlaceCard,
  (prevProps, nextProps) =>
    prevProps.cardType === nextProps.cardType
    && prevProps.isMain === nextProps.isMain
    && prevProps.placeCard.id === nextProps.placeCard.id
    && prevProps.placeCard.title === nextProps.placeCard.title
    && prevProps.placeCard.isFavorite === nextProps.placeCard.isFavorite
    && prevProps.placeCard.isPremium === nextProps.placeCard.isPremium
    && prevProps.placeCard.previewImage === nextProps.placeCard.previewImage
    && prevProps.placeCard.price === nextProps.placeCard.price
    && prevProps.placeCard.rating === nextProps.placeCard.rating
    && prevProps.placeCard.type === nextProps.placeCard.type
);
