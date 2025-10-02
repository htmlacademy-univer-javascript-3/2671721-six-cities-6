import { IReview } from '../common/types.ts';

export const REVIEW_ARRAY: IReview[] = [
  {
    id: '1',
    date: '2024-01-15',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true
    },
    comment: 'Отличное место! Очень понравился вид из окна и уютная атмосфера. Обязательно вернусь снова.',
    rating: 5
  },
  {
    id: '2',
    date: '2024-01-10',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false
    },
    comment: 'Хорошие апартаменты, но немного шумно по вечерам. В целом впечатление положительное.',
    rating: 4
  },
  {
    id: '3',
    date: '2024-01-05',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true
    },
    comment: 'Прекрасное расположение, все достопримечательности в шаговой доступности. Персонал очень вежливый и helpful.',
    rating: 5
  },
  {
    id: '4',
    date: '2024-01-01',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false
    },
    comment: 'Неплохо, но ожидал большего за эти деньги. Мебель немного устаревшая, санузел требует обновления.',
    rating: 3
  }
];
