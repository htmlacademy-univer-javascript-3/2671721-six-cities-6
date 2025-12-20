import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SortedSelect } from './sorted-select';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { SortingType } from '../../types/app';
import { getActiveSortingType } from '../../store/offers/offers-selectors';
import { Selector } from '../../store/types';
import {
  setActiveSortingTypeAction
} from '../../store/offers/offers-actions';

vi.mock('../../store/hooks/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn()
}));

vi.mock('../../store/offers/offers-actions', () => ({
  setActiveSortingTypeAction: vi.fn()
}));

vi.mock('classnames', () => ({
  default: (...args: (string | Record<string, boolean> | null | undefined)[]) => {
    const classes: string[] = [];

    for (const arg of args) {
      if (!arg) {
        continue;
      }

      if (typeof arg === 'string') {
        classes.push(arg);
      } else if (typeof arg === 'object') {
        for (const [key, value] of Object.entries(arg)) {
          if (value) {
            classes.push(key);
          }
        }
      }
    }

    return classes.join(' ');
  }
}));

describe('SortedSelect Component', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockImplementation((selector: Selector) => {
      if (selector === getActiveSortingType) {
        return SortingType.Popular;
      }
      return null;
    });
  });

  it('should render sorting select with all elements', () => {
    const { container } = render(<SortedSelect />);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(container.querySelector('.places__sorting-type')).toHaveTextContent(SortingType.Popular);
    expect(container.querySelectorAll('.places__option')).toHaveLength(Object.entries(SortingType).length);
  });

  it('should toggle dropdown when clicking on sorting type', async () => {
    const { container } = render(<SortedSelect />);

    const sortingTypeElement = container.querySelector('.places__sorting-type');
    const optionsList = screen.getByRole('list');

    expect(optionsList.className).not.toContain('places__options--opened');

    await userEvent.click(sortingTypeElement!);
    expect(optionsList.className).toContain('places__options--opened');

    await userEvent.click(sortingTypeElement!);
    expect(optionsList.className).not.toContain('places__options--opened');
  });

  it('should call dispatch with correct sorting type when option is clicked', async () => {
    const { container } = render(<SortedSelect />);

    const sortingTypeElement = container.querySelector('.places__sorting-type');
    await userEvent.click(sortingTypeElement!);

    const newSortingType = SortingType.HighToLow;

    const listItems = container.querySelectorAll('.places__option');
    const targetOption = Array.from(listItems).find((li) =>
      li.textContent === newSortingType
    );

    expect(targetOption).toBeDefined();
    await userEvent.click(targetOption!);

    expect(setActiveSortingTypeAction).toHaveBeenCalledWith(newSortingType);
    expect(mockDispatch).toHaveBeenCalled();

    waitFor(() => {
      expect(targetOption).toHaveClass('places__option--active');

      const otherOptions = Array.from(listItems).filter((li) =>
        li.textContent !== newSortingType
      );

      otherOptions.forEach((option) => {
        expect(option).not.toHaveClass('places__option--active');
      });
    });
  });
});
