import { FC } from 'react';
import { Location } from '../../components/Location/Location.tsx';
import { CITIES } from '../../const.ts';

interface ILocationListProps {
}

export const LocationList: FC<ILocationListProps> = () => (
  <ul className="locations__list tabs__list">
    {CITIES.map((city) => (
      <Location
        city={city}
        key={city}
      />
    ))}
  </ul>
);
