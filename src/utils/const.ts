import { City, ILocation } from '../types/app';
import { Icon } from 'leaflet';

export const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
export const TIMEOUT = 5000;
export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export const Location: Record<City, ILocation> = {
  [City.Paris]: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  },
  [City.Cologne]: {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 13
  },
  [City.Brussels]: {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 13
  },
  [City.Amsterdam]: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13
  },
  [City.Hamburg]: {
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 13
  },
  [City.Dusseldorf]: {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 13
  }
} as const;

export const DEFAULT_CUSTOM_ICON = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export const ACTIVE_CUSTOM_ICON = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export enum Path {
  Main = '/',
  Offer = '/offer',
  Offers = '/offers',
  Favorite = '/favorite',
  Favorites = '/favorites',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum ResponseCode {
  Ok = 200,
  Created = 201,
  InvalidRequest = 400,
  Unauthorized = 401,
  ServerError = 500,
}

export enum Reducer {
  Offers = 'offers',
  User = 'user',
  Reviews = 'reviews',
}

export const CITIES = Object.values(City);
