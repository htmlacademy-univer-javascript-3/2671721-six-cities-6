export enum City {
  PARIS = 'Paris',
  COLOGNE = 'Cologne',
  BRUSSELS = 'Brussels',
  AMSTERDAM = 'Amsterdam',
  HAMBURG = 'Hamburg',
  DUSSELDORF = 'Dusseldorf'
}

export enum PlaceCardType {
  DEFAULT = 'cities',
  WIDE = 'favorites',
}

export enum PlaceType {
  APARTMENT = 'apartment',
  ROOM = 'room',
  HOUSE = 'house',
  HOTEL = 'hotel',
}

export interface ILocation {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface ICity {
  name: `${City}`;
  location: ILocation;
}

export interface IPlaceCard {
  id: string;
  title: string;
  type: `${PlaceType}`;
  price: number;
  city: ICity;
  location: ILocation;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  previewImage: string;
}

export interface IGroupedPlaceCard {
  [city: string]: IPlaceCard[];
}

export interface IHost {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface IOffer extends Omit<IPlaceCard, 'previewImage'> {
  description: string;
  bedrooms: number;
  goods: string[];
  host: IHost;
  images: string[];
  maxAdults: number;
}

export interface IUser {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface IReview {
  id: string;
  date: string;
  user: IUser;
  comment: string;
  rating: number;
}

export enum SortingType {
  POPULAR = 'Popular',
  LOW_TO_HIGH = 'Price: low to high',
  HIGHT_TO_LOW = 'Price: high to low',
  TOP_RATING = 'Top rated first',
}
