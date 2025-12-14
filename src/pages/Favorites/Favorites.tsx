import { FC } from 'react';
import { Header } from '../../common/components/Header/Header.tsx';
import { Footer } from '../../common/components/Footer/Footer.tsx';
import {
  FavoriteContent
} from '../../common/widgets/FavoriteContent/FavoriteContent.tsx';

interface IFavoritesProps {
}

export const Favorites: FC<IFavoritesProps> = () => (
  <div className="page">
    <Header />
    <FavoriteContent />
    <Footer />
  </div>
);
