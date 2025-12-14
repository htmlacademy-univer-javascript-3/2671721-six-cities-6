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
    <div className="cities">
      <div className="cities__places-container container">
        <section
          className={isEmpty ? 'cities__no-places' : 'cities__places places'}
        >
          {isEmpty ? (
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">
                We could not find any property available at the moment
                in{' '}
                {activeCity.toString()}
              </p>
            </div>
          ) : (
            <>
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {placeCards.length} places to stay in {activeCity}
              </b>

              <MemorizedSortedSelect />

              <MemorizedPlaceCardList placeCardList={placeCards} isMain/>
            </>
          )}
        </section>

        <MemorizedMap placeCardList={placeCards} isMain/>
      </div>
    </div>
  );
};
