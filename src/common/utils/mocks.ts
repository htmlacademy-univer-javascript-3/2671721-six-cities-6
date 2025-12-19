import { City, IOffer, IPlaceCard, IReview, SortingType } from '../types/app';
import { Action } from '@reduxjs/toolkit';
import { AuthResponse } from '../types/auth';
import { AppRootStateType } from '../../store/types';
import { Reducer } from './const';

export const mockPlaceCard: IPlaceCard = {
  id: 'uuid-0',
  rating: 4.5,
  isPremium: true,
  previewImage:'img/apartment-01.jpg',
  price: 120,
  title: 'Beautiful & luxurious apartment at great location',
  type: 'apartment',
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  location: {
    latitude: 48.868610000000004,
    longitude: 2.342499,
    zoom: 16
  },
  isFavorite: false,
};

export const mockOffer: IOffer = {
  id: 'uuid-0',
  rating: 4.5,
  isPremium: true,
  price: 120,
  title: 'Beautiful & luxurious apartment at great location',
  type: 'apartment',
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  location: {
    latitude: 48.868610000000004,
    longitude: 2.342499,
    zoom: 16
  },
  isFavorite: false,
  description: 'Desc',
  images: ['image1.png'],
  goods: ['Wi-Fi'],
  bedrooms: 1,
  host: {
    name: 'Ann',
    isPro: true,
    avatarUrl: 'image2.png',
  },
  maxAdults: 2,
};

export const mockReview: IReview = {
  comment: 'Nice!',
  date: '2024-03-15T12:00:00Z',
  id: '1',
  rating: 3,
  user: {
    name: 'Ann',
    isPro: true,
    avatarUrl: 'image2.png',
  }
};

export const mockAuthResponse: AuthResponse = {
  email: 'test@test.com',
  name: 'Test User',
  token: 'test-token',
  avatarUrl: 'image1.png',
  isPro: true
};

export const mockAuthRequest = {
  email: 'test@test.com',
  password: 'password123'
};

export const mockInitialState: AppRootStateType = ({
  [Reducer.USER]: {
    authorizationStatus: false,
    userData: null,
  },
  [Reducer.OFFERS]: {
    activeCity: City.PARIS,
    placeCards: [],
    favoritePlaceCards: [],
    activeSortingType: SortingType.POPULAR,
    isLoading: false,
    activePlaceCardId: null,
    offerId: null,
    offerData: null,
    nearbyOffers: [],
  },
  [Reducer.REVIEWS]: {
    reviews: [],
  },
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
