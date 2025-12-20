import { IGroupedPlaceCard, IOffer, IPlaceCard, SortingType } from '../types/app';
import { AUTH_TOKEN_KEY_NAME, CITIES, Path, ResponseCode } from './const';
import { Action } from '@reduxjs/toolkit';

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

export const calculateRatingPercent = (rating: number) => Math.round((Math.round(rating) / 5) * 100);

export const getDate = (dt: string) => {
  const date = new Date(dt);
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

export const getSortingFunction = (sortingType: SortingType) => {
  switch (sortingType) {
    case SortingType.HighToLow: {
      return (a: IPlaceCard, b: IPlaceCard) => b.price - a.price;
    }
    case SortingType.LowToHigh: {
      return (a: IPlaceCard, b: IPlaceCard) => a.price - b.price;
    }
    case SortingType.TopRated: {
      return (a: IPlaceCard, b: IPlaceCard) => b.rating - a.rating;
    }
    default: {
      return () => 0;
    }
  }
};

export const getToken = (): string => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export const isResponseCode = (status: unknown): status is ResponseCode =>
  Object.values(ResponseCode).includes(status as ResponseCode);

export const isPath = (path: unknown): path is Path =>
  Object.values(Path).includes(path as Path);

export const convertOfferToPlaceCard = (offer: IOffer): IPlaceCard => ({
  id: offer.id,
  title: offer.title,
  type: offer.type,
  price: offer.price,
  city: offer.city,
  location: offer.location,
  isFavorite: offer.isFavorite,
  isPremium: offer.isPremium,
  rating: offer.rating,
  previewImage: offer.images[0] || ''
});

export const isValidPassword = (password: string) =>
  /^(?=.*[A-Za-z])(?=.*\d).{2,}$/.test(password);

export const getRandomCity = () => CITIES[Math.floor(Math.random() * CITIES.length)];

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
