import { IOffer } from '../common/types/app.ts';

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
