import { UserState } from './user-reducer.ts';
import { selectAuthorizationStatus, selectUserData, getAuthorizationStatus, getUserData } from './user-selectors.ts';
import { mockAuthResponse } from '../../common/utils/mocks.ts';
import { Reducer } from '../../common/utils/const.ts';

describe('User selectors', () => {
  const mockState: UserState = {
    authorizationStatus: true,
    userData: mockAuthResponse,
  };

  it('should return authorization status from state', () => {
    const result = selectAuthorizationStatus({ [Reducer.USER]: mockState });
    expect(result).toBe(mockState.authorizationStatus);
  });

  it('should return user data from state', () => {
    const result = selectUserData({ [Reducer.USER]: mockState });
    expect(result).toEqual(mockState.userData);
  });

  it('should return authorization status using createSelector', () => {
    const result = getAuthorizationStatus({ [Reducer.USER]: mockState });
    expect(result).toBe(mockState.authorizationStatus);
  });

  it('should return user data using createSelector', () => {
    const result = getUserData({ [Reducer.USER]: mockState });
    expect(result).toEqual(mockState.userData);
  });
});
