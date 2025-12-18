import { FC } from 'react';
import { MemorizedLocation } from '../../components/location/location';
import { useAppSelector } from '../../../store/hooks/hooks';
import { getActiveCity } from '../../../store/offers/offers-selectors';
import { CITIES } from '../../utils/const';

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
