import { createReducer } from '@reduxjs/toolkit';
import { AuthResponse } from '../../common/types/auth';
import { setAuthorizationStatus, setUserData } from './user-actions';

export interface UserState {
  authorizationStatus: boolean;
  userData: AuthResponse | null;
}

const initialState: UserState = {
  authorizationStatus: false,
  userData: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});
