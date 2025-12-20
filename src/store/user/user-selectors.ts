import { createSelector } from '@reduxjs/toolkit';
import { AuthResponse } from '../../types/auth';
import { AppRootStateType } from '../types';
import { Reducer } from '../../utils/const';

export const selectAuthorizationStatus = (state: Pick<AppRootStateType, Reducer.User>): boolean | null => state.user.authorizationStatus;
export const selectIsUserError = (state: Pick<AppRootStateType, Reducer.User>): boolean => state.user.isError;
export const selectUserData = (state: Pick<AppRootStateType, Reducer.User>): AuthResponse | null => state.user.userData;

export const getAuthorizationStatus = createSelector(
  [selectAuthorizationStatus],
  (authorizationStatus): boolean | null => authorizationStatus
);

export const getIsUserError = createSelector(
  [selectIsUserError],
  (isError): boolean => isError
);

export const getUserData = createSelector(
  [selectUserData],
  (userData): AuthResponse | null => userData
);
