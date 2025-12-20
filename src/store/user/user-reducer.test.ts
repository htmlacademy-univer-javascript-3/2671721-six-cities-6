import {
  setAuthorizationStatus,
  setUserData,
  setUserError
} from './user-actions';
import { userReducer } from './user-reducer';
import { mockAuthResponse, mockInitialState } from '../../utils/mocks';

describe('User Reducer', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = mockInitialState.user;

    const result = userReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set authorization status with "setAuthorizationStatus" action', () => {
    const expectedState = { ...mockInitialState.user, authorizationStatus: true };

    const result = userReducer(mockInitialState.user, setAuthorizationStatus(true));

    expect(result).toEqual(expectedState);
  });

  it('should set user data with "setUserData" action', () => {
    const expectedState = { ...mockInitialState.user, userData: mockAuthResponse };

    const result = userReducer(mockInitialState.user, setUserData(mockAuthResponse));

    expect(result).toEqual(expectedState);
  });

  it('should set user data with "setUserError" action', () => {
    const expectedState = { ...mockInitialState.user, isError: true };

    const result = userReducer(mockInitialState.user, setUserError(true));

    expect(result).toEqual(expectedState);
  });
});
