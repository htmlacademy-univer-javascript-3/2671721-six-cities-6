import { FC } from 'react';
import { MemorizedLocation } from '../../components/Location/Location.tsx';
import { useAppSelector } from '../../../store/hooks.ts';
import { getActiveCity } from '../../../store/offers/offers-selectors.ts';
import { CITIES } from '../../const.ts';

interface ILocationListProps {
}

export const LocationList: FC<ILocationListProps> = () => {
  const activeCity = useAppSelector(getActiveCity);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <MemorizedLocation
              isActive={activeCity === city}
              city={city}
              key={city}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};
