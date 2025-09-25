import { IGroupedPlaceCard, IPlaceCard } from './types.ts';

export const groupPlaceCardsByCity = (places: IPlaceCard[]): IGroupedPlaceCard => (
  places.reduce((acc: IGroupedPlaceCard, place) => {
    const city = place.city.name;

    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(place);

    return acc;
  }, {})
);
