import { FC } from 'react';
import { PlaceCard } from '../../components/PlaceCard/PlaceCard.tsx';
import { IPlaceCard, PlaceCardType } from '../../types.ts';

interface IPlaceCardListProps {
  placeCardList: IPlaceCard[];
  handleClick: (title: string) => void;
}

export const PlaceCardList: FC<IPlaceCardListProps> = ({ placeCardList, handleClick }) => (
  <div className="cities__places-list places__list tabs__content">
    {placeCardList.map((place) => (
      <PlaceCard
        id={place.id}
        cardType={PlaceCardType.DEFAULT}
        title={place.title}
        type={place.type}
        price={place.price}
        previewImage={place.previewImage}
        isPremium={place.isPremium}
        isFavorite={place.isFavorite}
        rating={place.rating}
        key={place.id}
        handleClick={handleClick}
      />
    ))}
  </div>
);
