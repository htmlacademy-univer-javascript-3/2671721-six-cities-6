import { IOffer, IPlaceCard } from '../common/types.ts';

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
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
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
      name: 'Amsterdam',
      location: {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
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
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
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
      name: 'Amsterdam',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    isFavorite: false,
  },
];

export const OFFER: IOffer = {
  id: '1',
  title: 'Уютная квартира в историческом центре',
  type: 'apartment',
  price: 150,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 13
    }
  },
  location: {
    latitude: 52.3809553943508,
    longitude: 4.939309666406198,
    zoom: 16
  },
  isPremium: true,
  isFavorite: true,
  rating: 4.8,
  description: 'Прекрасная светлая квартира в самом сердце Парижа с видом на Эйфелеву башню. Идеально подходит для романтического отпуска или деловой поездки.',
  bedrooms: 2,
  goods: [
    'Wi-Fi',
    'Кондиционер',
    'Кухня',
    'Телевизор',
    'Кофеварка',
    'Фен',
    'Утюг'
  ],
  host: {
    name: 'Anna',
    avatarUrl: 'img/avatar-angelina.jpg',
    isPro: true
  },
  images: [
    'img/room.jpg',
    'img/apartment-01.jpg',
    'img/apartment-02.jpg',
    'img/apartment-03.jpg',
    'img/studio-01.jpg',
    'img/studio-photos.jpg',
  ],
  maxAdults: 4
};
