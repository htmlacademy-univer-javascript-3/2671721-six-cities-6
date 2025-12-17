import { setAuthorizationStatus, setUserData } from './user-actions.ts';
import { userReducer, UserState } from './user-reducer.ts';
import { mockAuthResponse } from '../../common/utils/mocks.ts';

describe('User Reducer', () => {
  const initialState: UserState = {
    authorizationStatus: false,
    userData: null,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = initialState;

    const result = userReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = initialState;

    const result = userReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set authorization status with "setAuthorizationStatus" action', () => {
    const expectedState = { ...initialState, authorizationStatus: true };

    const result = userReducer(initialState, setAuthorizationStatus(true));

    expect(result).toEqual(expectedState);
  });

  it('should set user data with "setUserData" action', () => {
    const expectedState = { ...initialState, userData: mockAuthResponse };

    const result = userReducer(initialState, setUserData(mockAuthResponse));

    expect(result).toEqual(expectedState);
  });
});
