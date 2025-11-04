import { IGroupedPlaceCard, IPlaceCard, SortingType } from './types.ts';

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

export const getSortingFunction = (sortingType: SortingType) => {
  switch (sortingType) {
    case SortingType.HIGHT_TO_LOW: {
      return (a: IPlaceCard, b: IPlaceCard) => b.price - a.price;
    }
    case SortingType.LOW_TO_HIGH: {
      return (a: IPlaceCard, b: IPlaceCard) => a.price - b.price;
    }
    case SortingType.TOP_RATING: {
      return (a: IPlaceCard, b: IPlaceCard) => b.rating - a.rating;
    }
    default: {
      return () => 0;
    }
  }
};
