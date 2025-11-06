import { FC } from 'react';
import { City } from '../../types/app.ts';
import { useAppDispatch } from '../../../store/hooks.ts';
import { setActiveCityAction } from '../../../store/action.ts';

interface ILocationProps {
  city: City;
}

export const Location: FC<ILocationProps> = ({ city }) => {
  const dispatch = useAppDispatch();

  const handleClick = (toCity: City) => {
    dispatch(setActiveCityAction(toCity));
  };

  return (
    <li
      key={city} className="locations__item" onClick={() => handleClick(city)}
    >
      <a className="locations__item-link tabs__item" href="#">
        <span>{city}</span>
      </a>
    </li>
  );
};

