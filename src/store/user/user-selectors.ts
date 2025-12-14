import { createSelector } from '@reduxjs/toolkit';
import { AuthResponse } from '../../common/types/auth.ts';
import { AppRootStateType } from '../types.ts';

const selectAuthorizationStatus = (state: AppRootStateType): boolean => state.user.authorizationStatus;
const selectUserData = (state: AppRootStateType): AuthResponse | null => state.user.userData;

export const getAuthorizationStatus = createSelector(
  [selectAuthorizationStatus],
  (authorizationStatus): boolean => authorizationStatus
);

export const getUserData = createSelector(
  [selectUserData],
  (userData): AuthResponse | null => userData
);
