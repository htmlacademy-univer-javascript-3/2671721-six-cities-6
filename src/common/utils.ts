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

export const calculateRatingPercent = (rating: number) => Math.round((rating / 5) * 100);

export const getDate = (dt: string) => {
  const date = new Date(dt);
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${month} ${year}`;
};
