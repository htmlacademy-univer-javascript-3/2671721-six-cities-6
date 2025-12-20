import { createReducer } from '@reduxjs/toolkit';
import { AuthResponse } from '../../types/auth';
import {
  setAuthorizationStatus,
  setUserData,
  setUserError
} from './user-actions';

export interface UserState {
  authorizationStatus: boolean | null;
  isError: boolean;
  userData: AuthResponse | null;
}

const initialState: UserState = {
  authorizationStatus: null,
  isError: false,
  userData: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserError, (state, action) => {
      state.isError = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});
