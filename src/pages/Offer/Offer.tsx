import {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { Header } from '../../common/components/Header/Header.tsx';
import { calculateRatingPercent } from '../../common/utils.ts';
import {
  ReviewCardList
} from '../../common/widgets/ReviewCardList/ReviewCardList.tsx';
import { ReviewForm } from '../../common/components/ReviewForm/ReviewForm.tsx';
import { Map } from '../../common/components/Map/Map.tsx';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {
  PlaceCardList
} from '../../common/widgets/PlaceCardList/PlaceCardList.tsx';
import {
  fetchNearbyOffers,
  fetchOfferData,
  fetchReviews
} from '../../store/api-actions.ts';
import {NotFound} from '../NotFound/NotFound.tsx';
import {Spinner} from '../../common/components/Spinner/Spinner.tsx';

interface IOfferProps {
}

export const Offer: FC<IOfferProps> = () => {
  const { id } = useParams();
  const isAuthenticated = useAppSelector((state) => state.authorizationStatus);
  const isLoading = useAppSelector((state) => state.isLoading);
  const offerData = useAppSelector((state) => state.offerData);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const reviews = useAppSelector((state) => state.reviews);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(id){
      dispatch(fetchOfferData(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchReviews(id));
    }
  }, [dispatch, id]);

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
                <button className="offer__bookmark-button button" type="button">
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
                {reviews.length && <ReviewCardList reviewCardList={reviews} />}
                {isAuthenticated && (
                  <ReviewForm offerId={id!} />
                )}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map placeCardArray={nearbyOffers}/>
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyOffers.length && <PlaceCardList placeCardList={nearbyOffers} />}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
