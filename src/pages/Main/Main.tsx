import { FC, useEffect } from 'react';
import { Header } from '../../common/components/Header/Header.tsx';
import { Map } from '../../common/components/Map/Map.tsx';
import {
  PlaceCardList
} from '../../common/widgets/PlaceCardList/PlaceCardList.tsx';
import { LocationList } from '../../common/widgets/LocationList/LocationList.tsx';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {
  SortedSelect
} from '../../common/components/SortedSelect/SortedSelect.tsx';
import { getSortingFunction } from '../../common/utils.ts';
import { Spinner } from '../../common/components/Spinner/Spinner.tsx';
import { fetchOffers } from '../../store/api-actions.ts';

interface IMainProps {
}

export const Main: FC<IMainProps> = () => {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state) => state.activeCity);
  const activeSortingType = useAppSelector((state) => state.activeSortingType);
  const isLoading = useAppSelector((state) => state.isLoading);
  const placeCards = useAppSelector((state) => state.placeCards);
  const isEmpty = placeCards.length === 0;

  useEffect(() => {
    dispatch(fetchOffers(activeCity));
  }, [dispatch, activeCity]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page page--gray page--main">
      <Header isAuthenticated />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">
            <LocationList />
          </section>
        </div>

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

                  <SortedSelect/>

                  <PlaceCardList
                    placeCardList={placeCards.toSorted(getSortingFunction(activeSortingType))}
                  />
                </>
              )}
            </section>

            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  placeCardArray={placeCards}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
