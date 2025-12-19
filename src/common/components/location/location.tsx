import { FC, memo } from 'react';
import { City } from '../../types/app';
import { useAppDispatch } from '../../../store/hooks/hooks';
import { setActiveCityAction } from '../../../store/offers/offers-actions';

interface ILocationProps {
  isActive: boolean;
  city: City;
}

export const Location: FC<ILocationProps> = ({ isActive, city }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setActiveCityAction(city));
  };

  return (
    <li
      key={city} className="locations__item" onClick={handleClick}
    >
      <a
        className={`locations__item-link tabs__item ${isActive && 'tabs__item--active'}`}
        href="#"
      >
        <span>{city}</span>
      </a>
    </li>
  );
};

export const MemorizedLocation = memo(Location,
  (prevProps, nextProps) =>
    prevProps.isActive === nextProps.isActive
    && prevProps.city === nextProps.city
);
