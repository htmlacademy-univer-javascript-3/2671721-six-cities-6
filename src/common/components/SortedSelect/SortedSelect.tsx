import { FC, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { SortingType } from '../../types.ts';
import { setActiveSortingTypeAction } from '../../../store/action.ts';
import { SORTING_TYPES } from '../../const.ts';

interface ISortedSelectProps {
}

export const SortedSelect: FC<ISortedSelectProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const activeSortingType = useAppSelector((state) => state.activeSortingType);
  const dispatch = useAppDispatch();

  const handleSetActiveSortingType = (sortingType: SortingType) => {
    dispatch(setActiveSortingTypeAction(sortingType));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
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
        {SORTING_TYPES.map((sortingType) => (
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
