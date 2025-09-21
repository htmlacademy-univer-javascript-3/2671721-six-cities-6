import { IGroupedPlaceCard, IPlaceCard } from './types.ts';

export const groupPlaceCardsByCity = (offers: IPlaceCard[]): IGroupedPlaceCard => (
  offers.reduce((acc: IGroupedPlaceCard, place) => {
    const city = place.city.name;

    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(place);

    return acc;
  }, {})
);
