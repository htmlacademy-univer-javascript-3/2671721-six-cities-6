import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import {
  getActiveCity,
  getActiveSortingType,
  getIsError,
  getIsFavoriteStatusError,
  getIsLoading,
  getPlaceCards
} from '../../store/offers/offers-selectors';
import { fetchOffers } from '../../store/offers/offers-api-actions';
import { Spinner } from '../spinner/spinner';
import {
  MemorizedSortedSelect
} from '../sorted-select/sorted-select';
import { MemorizedPlaceCardList } from '../place-card-list/place-card-list';
import { MemorizedMap } from '../map/map';
import { MemorizedLocationList } from '../location-list/location-list';
import { setFavoriteStatusError } from '../../store/offers/offers-actions';

interface IMainProps {
}

export const MainContent: FC<IMainProps> = () => {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getActiveCity);
  const activeSortingType = useAppSelector(getActiveSortingType);
  const isLoading = useAppSelector(getIsLoading);
  const isError = useAppSelector(getIsError);
  const isFavoriteStatusError = useAppSelector(getIsFavoriteStatusError);
  const placeCards = useAppSelector(getPlaceCards);
  const isEmpty = placeCards.length === 0;

  useEffect(() => {
    dispatch(fetchOffers({ city: activeCity, activeSortingType }));

    return () => {
      dispatch(setFavoriteStatusError(false));
    };
  }, [dispatch, activeCity, activeSortingType]);

  return (
    <main
      className={`page__main page__main--index ${isEmpty && 'page__main--index-empty'}`}
    >
      <h1 className="visually-hidden">Cities</h1>
      <MemorizedLocationList />
      <div className="cities">
        {isFavoriteStatusError && (
          <p>Error change favorite status!</p>
        )}
        {isError && (
          <p>Error retrieving list of offers!</p>
        )}
        {isEmpty && !isError && (
          <div
            className="cities__places-container cities__places-container--empty container"
          >
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">
                  We could not find any property available at the moment
                  in&nbsp;
                  {activeCity.toString()}
                </p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        )}
        {!isEmpty && !isError && !isLoading && (
          <div className="cities__places-container container">
            <section className='cities__places places'>
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {placeCards.length} places to stay in {activeCity}
              </b>

              <MemorizedSortedSelect/>

              <MemorizedPlaceCardList placeCardList={placeCards} isMain/>
            </section>
            <MemorizedMap placeCardList={placeCards} isMain/>
          </div>
        )}
        {!isEmpty && !isError && isLoading && (
          <Spinner />
        )}
      </div>
    </main>
  );
};
