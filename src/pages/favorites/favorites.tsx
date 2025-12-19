import { FC } from 'react';
import { Header } from '../../common/components/header/header';
import { Footer } from '../../common/components/footer/footer';
import {
  FavoriteContent
} from '../../common/widgets/favorite-content/favorite-content';

interface IFavoritesProps {
}

export const Favorites: FC<IFavoritesProps> = () => (
  <div className="page">
    <Header />
    <FavoriteContent />
    <Footer />
  </div>
);
