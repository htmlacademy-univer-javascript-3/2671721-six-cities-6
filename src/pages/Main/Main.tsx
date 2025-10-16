import { FC } from 'react';
import { Header } from '../../common/components/Header/Header.tsx';
import { Map } from '../../common/components/Map/Map.tsx';
import {
  PlaceCardList
} from '../../common/widgets/PlaceCardList/PlaceCardList.tsx';
import { LocationList } from '../../common/widgets/LocationList/LocationList.tsx';
import { useAppSelector } from '../../store/hooks.ts';
import {
  SortedSelect
} from '../../common/components/SortedSelect/SortedSelect.tsx';
import { getSortingFunction } from '../../common/utils.ts';

interface IMainProps {
}

export const Main: FC<IMainProps> = () => {
  const placeCards = useAppSelector((state) => state.placeCards);
  const activeCity = useAppSelector((state) => state.activeCity);
  const activeSortingType = useAppSelector((state) => state.activeSortingType);

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
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {placeCards.length} places to stay in {activeCity}
              </b>

              <SortedSelect />

              <PlaceCardList placeCardList={placeCards.toSorted(getSortingFunction(activeSortingType))} />
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
