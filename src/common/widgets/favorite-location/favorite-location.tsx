import { FC, memo } from 'react';
import { IPlaceCard, PlaceCardType } from '../../types/app';
import { MemorizedPlaceCard } from '../../components/place-card/place-card';

interface IFavoriteLocationProps {
  name: string;
  places: IPlaceCard[];
}

export const FavoriteLocation: FC<IFavoriteLocationProps> = ({ name, places }) => (
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
        <MemorizedPlaceCard
          cardType={PlaceCardType.WIDE}
          placeCard={place}
          key={place.id}
        />
      ))}
    </div>
  </li>
);

export const MemorizedFavoriteLocation = memo(FavoriteLocation,
  (prevProps, nextProps) =>
    prevProps.name === nextProps.name
    && prevProps.places.length === nextProps.places.length
    && prevProps.places.every((place, index) =>
      place.id === nextProps.places[index].id
      && place.isFavorite === nextProps.places[index].isFavorite
    )
);
