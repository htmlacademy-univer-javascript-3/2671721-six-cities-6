import { createSelector } from '@reduxjs/toolkit';
import { AuthResponse } from '../../common/types/auth.ts';
import { AppRootStateType } from '../types.ts';
import { Reducer } from '../../common/utils/const.ts';

export const selectAuthorizationStatus = (state: Pick<AppRootStateType, Reducer.USER>): boolean => state.user.authorizationStatus;
export const selectUserData = (state: Pick<AppRootStateType, Reducer.USER>): AuthResponse | null => state.user.userData;

export const getAuthorizationStatus = createSelector(
  [selectAuthorizationStatus],
  (authorizationStatus): boolean => authorizationStatus
);

export const getUserData = createSelector(
  [selectUserData],
  (userData): AuthResponse | null => userData
);
