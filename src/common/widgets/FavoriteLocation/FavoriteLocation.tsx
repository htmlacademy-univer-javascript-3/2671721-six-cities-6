import { FC } from 'react';
import { IPlaceCard, PlaceCardType } from '../../types/app.ts';
import { PlaceCard } from '../../components/PlaceCard/PlaceCard.tsx';

interface IFavoriteLocationProps {
  name: string;
  places: IPlaceCard[];
}

export const FavoriteLocation: FC<IFavoriteLocationProps> = (props) => {
  const { name, places } = props;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{name}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {places.map((place) => (
          <PlaceCard
            cardType={PlaceCardType.WIDE}
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
    </li>
  );
};
