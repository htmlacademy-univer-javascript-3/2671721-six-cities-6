import { FC, useEffect, useMemo } from 'react';
import { Header } from '../../common/components/Header/Header.tsx';
import { Footer } from '../../common/components/Footer/Footer.tsx';
import {
  MemorizedFavoriteLocation
} from '../../common/widgets/FavoriteLocation/FavoriteLocation.tsx';
import { groupPlaceCardsByCity } from '../../common/utils.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { Spinner } from '../../common/components/Spinner/Spinner.tsx';
import {
  getIsLoading,
  getPlaceCards
} from '../../store/offers/offers-selectors.ts';
import { fetchFavoritesOffers } from '../../store/offers/offers-api-actions.ts';

interface IFavoritesProps {
}

export const Favorites: FC<IFavoritesProps> = () => {
  const dispatch = useAppDispatch();
  const placeCards = useAppSelector(getPlaceCards);
  const isLoading = useAppSelector(getIsLoading);
  const favoriteLocations = useMemo(() => groupPlaceCardsByCity(placeCards), [placeCards]);
  const favoriteLocationEntries = useMemo(() => Object.entries(favoriteLocations), [favoriteLocations]);

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
          {placeCards.length ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>

              <ul className="favorites__list">
                {favoriteLocationEntries.map(([name, places]) => (
                  <MemorizedFavoriteLocation
                    name={name}
                    places={places}
                    key={name}
                  />
                ))}
              </ul>
            </section>
          ) : (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
