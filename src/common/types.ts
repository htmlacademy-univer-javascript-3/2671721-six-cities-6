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
