import { renderHook } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from './hooks';
import { mockInitialState } from '../../utils/mocks';
import { Selector, AppRootStateType } from '../types';
import { useDispatch } from 'react-redux';

const mockUseSelector = vi.fn((selector: Selector) =>
  selector(mockInitialState)
);

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: (selector: Selector) => mockUseSelector(selector),
}));

describe('Redux hooks', () => {
  const mockDispatch = vi.fn();
  const mockState = mockInitialState;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return typed dispatch function', () => {
    (useDispatch as ReturnType<typeof vi.fn>).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useAppDispatch());

    expect(typeof result.current).toBe('function');
  });

  it('should correctly return from selector', () => {
    const userSelector = (state: AppRootStateType) => state.user;

    mockUseSelector.mockImplementation((selector: Selector) =>
      selector(mockState)
    );

    const { result } = renderHook(() => useAppSelector(userSelector));

    expect(result.current).toEqual(mockState.user);
    expect(result.current.authorizationStatus).toBe(mockState.user.authorizationStatus);
  });
});
