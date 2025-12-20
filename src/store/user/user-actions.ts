import { createAction } from '@reduxjs/toolkit';
import { AuthResponse } from '../../types/auth';

export const setAuthorizationStatus = createAction<boolean | null>('SET_AUTHORIZATION_STATUS');
export const setUserError = createAction<boolean>('SET_USER_ERROR');
export const setUserData = createAction<AuthResponse | null>('SET_USER_DATA');
