import { City, IPlaceCard } from './types.ts';

export const CITIES = Object.values(City);

export const OFFER_COUNT = 312;

export const PLACE_CARD_COUNT = 5;

export const PLACE_CARD_ARRAY: IPlaceCard[] = [
  {
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
  },
  {
    id: 'uuid-1',
    rating: 4.6,
    isPremium: false,
    previewImage: 'img/room.jpg',
    price: 80,
    title: 'Wood and stone place',
    type: 'room',
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
  },
  {
    id: 'uuid-2',
    rating: 4.7,
    isPremium: false,
    previewImage: 'img/apartment-02.jpg',
    price: 132,
    title: 'Canal View Prinsengracht',
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
  },
  {
    id: 'uuid-3',
    rating: 4.4,
    isPremium: true,
    previewImage: 'img/apartment-03.jpg',
    price: 180,
    title: 'Nice, cozy, warm big bed apartment',
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
  },
  {
    id: 'uuid-4',
    rating: 4.2,
    isPremium: false,
    previewImage: 'img/room.jpg',
    price: 80,
    title: 'Wood and stone place',
    type: 'room',
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
  },
];

export const OFFER_IMAGES = [
  'img/room.jpg',
  'img/apartment-01.jpg',
  'img/apartment-02.jpg',
  'img/apartment-03.jpg',
  'img/studio-01.jpg',
  'img/studio-photos.jpg',
];

export const GOODS = [
  'Wi-Fi',
  'Washing machine',
  'Towels',
  'Heating',
  'Coffee machine',
  'Baby seat',
  'Kitchen',
  'Dishwasher',
  'Cable TV',
  'Fridge'
];
