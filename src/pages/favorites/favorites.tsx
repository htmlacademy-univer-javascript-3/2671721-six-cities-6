import { FC } from 'react';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { FavoriteContent } from '../../components/favorite-content/favorite-content';

interface IFavoritesProps {
}

export const Favorites: FC<IFavoritesProps> = () => (
  <div className="page">
    <Header />
    <FavoriteContent />
    <Footer />
  </div>
);
