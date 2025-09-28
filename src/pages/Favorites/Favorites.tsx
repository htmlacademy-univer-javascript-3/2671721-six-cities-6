import { FC } from 'react';
import { PLACE_CARD_ARRAY } from '../../common/const.ts';
import { Header } from '../../common/components/Header/Header.tsx';
import { Footer } from '../../common/components/Footer/Footer.tsx';
import {
  FavoriteLocation
} from '../../common/widgets/FavoriteLocation/FavoriteLocation.tsx';
import { groupPlaceCardsByCity } from '../../common/utils.ts';

interface IFavoritesProps {
}

export const Favorites: FC<IFavoritesProps> = () => {
  const favotiteLocations = groupPlaceCardsByCity(PLACE_CARD_ARRAY);

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
