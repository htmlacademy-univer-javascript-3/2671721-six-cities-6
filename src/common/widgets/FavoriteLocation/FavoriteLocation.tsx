import { FC } from 'react';
import { IPlaceCard, PlaceCardType } from '../../types.ts';
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
        {places.map((
          {
            id,
            title,
            type,
            price,
            isPremium,
            isFavorite,
            previewImage,
            rating,
          }) => (
          <PlaceCard
            cardType={PlaceCardType.WIDE}
            title={title}
            type={type}
            price={price}
            previewImage={previewImage}
            isPremium={isPremium}
            isFavorite={isFavorite}
            rating={rating}
            key={id}
          />
        ))}
      </div>
    </li>
  );
};
