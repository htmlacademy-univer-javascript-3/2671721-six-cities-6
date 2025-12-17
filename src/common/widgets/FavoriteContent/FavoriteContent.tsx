import { FC, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import {
  getFavoritePlaceCards,
  getIsLoading,
} from '../../../store/offers/offers-selectors.ts';
import { groupPlaceCardsByCity } from '../../utils/utils.ts';
import {
  fetchFavoritesOffers
} from '../../../store/offers/offers-api-actions.ts';
import { Spinner } from '../../components/Spinner/Spinner.tsx';
import {
  MemorizedFavoriteLocation
} from '../FavoriteLocation/FavoriteLocation.tsx';

interface IFavoriteContentProps {
}

export const FavoriteContent: FC<IFavoriteContentProps> = () => {
  const dispatch = useAppDispatch();
  const favoritePlaceCards = useAppSelector(getFavoritePlaceCards);
  const isLoading = useAppSelector(getIsLoading);
  const favoriteLocations = useMemo(() => groupPlaceCardsByCity(favoritePlaceCards), [favoritePlaceCards]);
  const favoriteLocationEntries = useMemo(() => Object.entries(favoriteLocations), [favoriteLocations]);

  useEffect(() => {
    dispatch(fetchFavoritesOffers());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        {favoritePlaceCards.length ? (
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
  );
};
