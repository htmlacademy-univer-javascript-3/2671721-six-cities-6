import { FC, memo } from 'react';
import {
  MemorizedPlaceCard,
} from '../../components/PlaceCard/PlaceCard.tsx';
import { IPlaceCard, PlaceCardType } from '../../types/app.ts';

interface IPlaceCardListProps {
  placeCardList: IPlaceCard[];
  isMain?: boolean;
}

export const PlaceCardList: FC<IPlaceCardListProps> = ({ placeCardList, isMain = false }) => (
  <div className="cities__places-list places__list tabs__content">
    {placeCardList.map((placeCard) => (
      <MemorizedPlaceCard
        placeCard={placeCard}
        cardType={PlaceCardType.DEFAULT}
        isMain={isMain}
        key={placeCard.id}
      />
    ))}
  </div>
);

export const MemorizedPlaceCardList = memo(PlaceCardList,
  (prevProps, nextProps) =>
    prevProps.placeCardList.length === nextProps.placeCardList.length
    && prevProps.placeCardList.every((placeCard, index) =>
      placeCard.id === nextProps.placeCardList[index].id
      && placeCard.isFavorite === nextProps.placeCardList[index].isFavorite
    )
    && prevProps.isMain === nextProps.isMain
);
