import { FC, useEffect } from 'react';
import { Header } from '../../common/components/Header/Header.tsx';
import { Footer } from '../../common/components/Footer/Footer.tsx';
import {
  FavoriteLocation
} from '../../common/widgets/FavoriteLocation/FavoriteLocation.tsx';
import { groupPlaceCardsByCity } from '../../common/utils.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { fetchFavoritesOffers } from '../../store/api-actions.ts';
import { Spinner } from '../../common/components/Spinner/Spinner.tsx';

interface IFavoritesProps {
}

export const Favorites: FC<IFavoritesProps> = () => {
  const dispatch = useAppDispatch();
  const placeCards = useAppSelector((state) => state.placeCards);
  const favoritePlaceCards = placeCards.filter((placeCard) => placeCard.isFavorite);
  const favotiteLocations = groupPlaceCardsByCity(favoritePlaceCards);
  const isLoading = useAppSelector((state) => state.isLoading);

  useEffect(() => {
    dispatch(fetchFavoritesOffers());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <Header />

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
