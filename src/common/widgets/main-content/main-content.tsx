import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import {
  getActiveCity,
  getActiveSortingType,
  getIsLoading,
  getPlaceCards
} from '../../../store/offers/offers-selectors';
import { fetchOffers } from '../../../store/offers/offers-api-actions';
import { Spinner } from '../../components/spinner/spinner';
import {
  MemorizedSortedSelect
} from '../../components/sorted-select/sorted-select';
import { MemorizedPlaceCardList } from '../place-card-list/place-card-list';
import { MemorizedMap} from '../../components/map/map';
import { LocationList } from '../location-list/location-list';

interface IMainProps {
}

export const MainContent: FC<IMainProps> = () => {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getActiveCity);
  const activeSortingType = useAppSelector(getActiveSortingType);
  const isLoading = useAppSelector(getIsLoading);
  const placeCards = useAppSelector(getPlaceCards);
  const isEmpty = placeCards.length === 0;

  useEffect(() => {
    dispatch(fetchOffers({ city: activeCity, activeSortingType }));
  }, [dispatch, activeCity, activeSortingType]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main
      className={`page__main page__main--index ${isEmpty && 'page__main--index-empty'}`}
    >
      <h1 className="visually-hidden">Cities</h1>
      <LocationList/>
      <div className="cities">
        {isEmpty ? (
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
        ) : (
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
      </div>
    </main>
  );
};
