import { FC } from 'react';
import { Header } from '../../common/components/Header/Header.tsx';
import { Footer } from '../../common/components/Footer/Footer.tsx';
import {
  FavoriteLocation
} from '../../common/widgets/FavoriteLocation/FavoriteLocation.tsx';
import { groupPlaceCardsByCity } from '../../common/utils.ts';
import { IPlaceCard } from '../../common/types.ts';

interface IFavoritesProps {
  placeCardArray: IPlaceCard[];
}

export const Favorites: FC<IFavoritesProps> = ({ placeCardArray }) => {
  const favotiteLocations = groupPlaceCardsByCity(placeCardArray);

  return (
    <div className="page">
      <Header isAuthenticated />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <ul className="favorites__list">
              {Object.entries(favotiteLocations).map(([name, places]) => (
                <FavoriteLocation
                  name={name}
                  places={places}
                  key={name}
                />
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
