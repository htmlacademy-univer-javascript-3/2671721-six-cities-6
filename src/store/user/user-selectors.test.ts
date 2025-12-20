import {
  selectAuthorizationStatus,
  selectUserData,
  selectIsUserError,
  getAuthorizationStatus,
  getUserData,
  getIsUserError
} from './user-selectors';
import { mockInitialState } from '../../utils/mocks';
import { Reducer } from '../../utils/const';

describe('User selectors', () => {
  it('should return authorization status from state', () => {
    const result = selectAuthorizationStatus({ [Reducer.User]: mockInitialState.user });
    expect(result).toBe(mockInitialState.user.authorizationStatus);
  });

  it('should return user data from state', () => {
    const result = selectUserData({ [Reducer.User]: mockInitialState.user });
    expect(result).toEqual(mockInitialState.user.userData);
  });

  it('should return error status from state', () => {
    const result = selectIsUserError({ [Reducer.User]: mockInitialState.user });
    expect(result).toBe(mockInitialState.user.isError);
  });

  it('should return authorization status using createSelector', () => {
    const result = getAuthorizationStatus({ [Reducer.User]: mockInitialState.user });
    expect(result).toBe(mockInitialState.user.authorizationStatus);
  });

  it('should return user data using createSelector', () => {
    const result = getUserData({ [Reducer.User]: mockInitialState.user });
    expect(result).toEqual(mockInitialState.user.userData);
  });

  it('should return error status using createSelector', () => {
    const result = getIsUserError({ [Reducer.User]: mockInitialState.user });
    expect(result).toBe(mockInitialState.user.isError);
  });
});
