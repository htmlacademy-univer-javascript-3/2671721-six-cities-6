import { City, ILocation, SortingType } from './types/app.ts';
import { Icon } from 'leaflet';

export const CITIES = Object.values(City);

export const LOCATIONS: Record<City, ILocation> = {
  [City.PARIS]: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  },
  [City.COLOGNE]: {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 13
  },
  [City.BRUSSELS]: {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 13
  },
  [City.AMSTERDAM]: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13
  },
  [City.HAMBURG]: {
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 13
  },
  [City.DUSSELDORF]: {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 13
  }
};

export const defaultCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export const currentCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export const SORTING_TYPES = Object.values(SortingType);

export enum Path {
  MAIN = '/',
  OFFER = '/offer',
  OFFERS = '/offers',
  FAVORITE = '/favorite',
  FAVORITES = '/favorites',
  COMMENTS = '/comments',
  LOGIN = '/login',
  LOGOUT = '/logout',
}

export const AUTH_TOKEN_KEY_NAME = 'six-cities-auth-token';

export enum ResponseCode {
  OK = 200,
  INVALID_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500,
}
