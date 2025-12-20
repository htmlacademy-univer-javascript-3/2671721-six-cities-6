import { FC, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import {
  getFavoritePlaceCards,
  getIsError,
  getIsFavoriteStatusError,
  getIsLoading,
} from '../../store/offers/offers-selectors';
import { groupPlaceCardsByCity } from '../../utils/utils';
import {
  fetchFavoritesOffers
} from '../../store/offers/offers-api-actions';
import { Spinner } from '../spinner/spinner';
import {
  MemorizedFavoriteLocation
} from '../favorite-location/favorite-location';
import { setFavoriteStatusError } from '../../store/offers/offers-actions';

interface IFavoriteContentProps {
}

export const FavoriteContent: FC<IFavoriteContentProps> = () => {
  const dispatch = useAppDispatch();
  const favoritePlaceCards = useAppSelector(getFavoritePlaceCards);
  const isLoading = useAppSelector(getIsLoading);
  const isError = useAppSelector(getIsError);
  const isFavoriteStatusError = useAppSelector(getIsFavoriteStatusError);
  const favoriteLocations = useMemo(() => groupPlaceCardsByCity(favoritePlaceCards), [favoritePlaceCards]);
  const favoriteLocationEntries = useMemo(() => Object.entries(favoriteLocations), [favoriteLocations]);

  useEffect(() => {
    dispatch(fetchFavoritesOffers());

    return () => {
      dispatch(setFavoriteStatusError(false));
    };
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Error retrieving list of offers!</p>;
  }

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        {favoritePlaceCards.length ? (
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            {isFavoriteStatusError && (
              <p>Error change favorite status!</p>
            )}

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
