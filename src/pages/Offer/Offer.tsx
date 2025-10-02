import { FC } from 'react';
import { PlaceCard } from '../../common/components/PlaceCard/PlaceCard.tsx';
import {
  IOffer,
  IPlaceCard,
  IReview,
  PlaceCardType
} from '../../common/types.ts';
import { Header } from '../../common/components/Header/Header.tsx';
import { calculateRatingPercent } from '../../common/utils.ts';
import {
  ReviewCardList
} from '../../common/widgets/ReviewCardList/ReviewCardList.tsx';
import { ReviewForm } from '../../common/components/ReviewForm/ReviewForm.tsx';

interface IOfferProps {
  placeCardArray: IPlaceCard[];
  offer: IOffer;
  reviewArray: IReview[];
}

export const Offer: FC<IOfferProps> = ({ placeCardArray, offer, reviewArray}) => (
  <div className="page">
    <Header isAuthenticated />

    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {offer.images.map((image) => (
              <div key={image} className="offer__image-wrapper">
                <img className="offer__image" src={image} alt="Photo studio"/>
              </div>
            ))}
          </div>
        </div>

        <div className="offer__container container">
          <div className="offer__wrapper">
            <div className="offer__mark">
              {offer.isPremium && (
                <span>Premium</span>
              )}
            </div>
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {offer.title}
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
                <span style={{width: `${calculateRatingPercent(offer.rating)}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{offer.rating}</span>
            </div>

            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {offer.type[0].toUpperCase() + offer.type.slice(1)}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {offer.maxAdults} adults
              </li>
            </ul>

            <div className="offer__price">
              <b className="offer__price-value">&euro;120</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>

            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {offer.goods.map((good) => (
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
                  <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="offer__user-name">
                  {offer.host.name}
                </span>
                {offer.host.isPro && (
                  <span className="offer__user-status">
                    Pro
                  </span>
                )}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {offer.description}
                </p>
              </div>
            </div>

            <section className="offer__reviews reviews">
              <ReviewCardList reviewCardList={reviewArray} />
              <ReviewForm />
            </section>
          </div>
        </div>
        <section className="offer__map map"></section>
      </section>

      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {placeCardArray.slice(0, 3).map((place) => (
              <PlaceCard
                cardType={PlaceCardType.DEFAULT}
                id={place.id}
                title={place.title}
                type={place.type}
                price={place.price}
                previewImage={place.previewImage}
                isPremium={place.isPremium}
                isFavorite={place.isFavorite}
                rating={place.rating}
                key={place.id}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  </div>
);
