import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import {
  getActiveCity,
  getActiveSortingType,
  getIsLoading,
  getPlaceCards
} from '../../../store/offers/offers-selectors.ts';
import { fetchOffers } from '../../../store/offers/offers-api-actions.ts';
import { Spinner } from '../../components/Spinner/Spinner.tsx';
import {
  MemorizedSortedSelect
} from '../../components/SortedSelect/SortedSelect.tsx';
import { MemorizedPlaceCardList } from '../PlaceCardList/PlaceCardList.tsx';
import { MemorizedMap} from '../../components/Map/Map.tsx';
import { LocationList } from '../LocationList/LocationList.tsx';

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
