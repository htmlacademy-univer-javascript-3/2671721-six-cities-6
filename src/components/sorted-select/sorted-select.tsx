import { FC, memo, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { SortingType } from '../../types/app';
import { getActiveSortingType } from '../../store/offers/offers-selectors';
import { setActiveSortingTypeAction } from '../../store/offers/offers-actions';

interface ISortedSelectProps {
}

export const SortedSelect: FC<ISortedSelectProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const activeSortingType = useAppSelector(getActiveSortingType);
  const sortingTypes = Object.values(SortingType);
  const dispatch = useAppDispatch();

  const handleSetActiveSortingType = (sortingType: SortingType) => {
    dispatch(setActiveSortingTypeAction(sortingType));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>&nbsp;
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {activeSortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames(
          'places__options places__options--custom',
          {
            'places__options--opened': isOpen,
          }
        )}
      >
        {sortingTypes.map((sortingType) => (
          <li
            key={sortingType}
            className={classNames(
              'places__option',
              {
                'places__option--active': sortingType === activeSortingType,
              }
            )}
            tabIndex={0}
            onClick={() => handleSetActiveSortingType(sortingType)}
          >
            {sortingType}
          </li>
        ))}
      </ul>
    </form>
  );
};

export const MemorizedSortedSelect = memo(SortedSelect, () => true);
