import { FC, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/header/header';
import {
  calculateRatingPercent,
  convertOfferToPlaceCard
} from '../../utils/utils';
import {
  MemorizedReviewCardList
} from '../../components/review-card-list/review-card-list';
import {
  MemorizedReviewForm
} from '../../components/review-form/review-form';
import { MemorizedMap } from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import {
  MemorizedPlaceCardList
} from '../../components/place-card-list/place-card-list';
import { NotFound } from '../not-found/not-found';
import { Spinner } from '../../components/spinner/spinner';
import { getAuthorizationStatus } from '../../store/user/user-selectors';
import {
  getIsError,
  getIsFavoriteStatusError,
  getIsLoading,
  getNearbyOffers,
  getOfferData
} from '../../store/offers/offers-selectors';
import { getReviews } from '../../store/reviews/reviews-selectors';
import {
  changeFavoriteStatus,
  fetchNearbyOffers,
  fetchOfferData
} from '../../store/offers/offers-api-actions';
import { fetchReviews } from '../../store/reviews/reviews-api-actions';
import { Path } from '../../utils/const';
import {
  setActivePlaceCardId,
  setFavoriteStatusError,
  setNearbyOffers,
  setOfferData
} from '../../store/offers/offers-actions';
import { setReviews } from '../../store/reviews/reviews-actions';

interface IOfferProps {
}

export const Offer: FC<IOfferProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(getAuthorizationStatus);
  const isLoading = useAppSelector(getIsLoading);
  const isError = useAppSelector(getIsError);
  const isFavoriteStatusError = useAppSelector(getIsFavoriteStatusError);
  const offerData = useAppSelector(getOfferData);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getReviews);
  const dispatch = useAppDispatch();

  const sortedReviews = useMemo(
    () => {
      if (reviews.length) {
        return [...reviews]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 10);
      }
      return [];
    }, [reviews]
  );

  useEffect(() => {
    if (id){
      dispatch(setActivePlaceCardId(id));
      dispatch(fetchOfferData(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchReviews(id));
    }

    return () => {
      dispatch(setActivePlaceCardId(null));
      dispatch(setOfferData(null));
      dispatch(setNearbyOffers([]));
      dispatch(setReviews([]));
      dispatch(setFavoriteStatusError(false));
    };
  }, [dispatch, id]);

  const handleChangeFavoriteStatus = (isFavorite: boolean) => {
    if (!isAuthenticated) {
      navigate(Path.Login);
    } else if (id) {
      const status = isFavorite ? 0 : 1;
      dispatch(changeFavoriteStatus({
        offerId: id,
        status: status
      }));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!offerData) {
    return <NotFound />;
  }

  const {
    images,
    type,
    description,
    isPremium,
    rating,
    title,
    host,
    goods,
    bedrooms,
    maxAdults,
  } = offerData;

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio"/>
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                {isPremium && (
                  <span>Premium</span>
                )}
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                {isFavoriteStatusError && (
                  <p>Error change favorite status!</p>
                )}
                <button
                  onClick={() => handleChangeFavoriteStatus(offerData.isFavorite)}
                  className={`offer__bookmark-button button ${offerData.isFavorite && 'offer__bookmark-button--active'}`}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${calculateRatingPercent(rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type[0].toUpperCase() + type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">&euro;120</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  {host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>

              <section className="offer__reviews reviews">
                {sortedReviews.length && <MemorizedReviewCardList reviewCardList={sortedReviews} />}
                {isAuthenticated && (<MemorizedReviewForm offerId={id!} />)}
              </section>
            </div>
          </div>
          <MemorizedMap placeCardList={[...nearbyOffers, convertOfferToPlaceCard(offerData)]}/>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {isFavoriteStatusError && (
                <p>Error change favorite status!</p>
              )}
              {isError && (
                <p>Error retrieving list of offers!</p>
              )}
              {nearbyOffers.length && (
                <MemorizedPlaceCardList placeCardList={nearbyOffers} />
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
