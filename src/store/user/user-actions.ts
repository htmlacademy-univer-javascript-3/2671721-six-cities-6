import { createAction } from '@reduxjs/toolkit';
import { AuthResponse } from '../../common/types/auth';

export const setAuthorizationStatus = createAction<boolean>('SET_AUTHORIZATION_STATUS');
export const setUserData = createAction<AuthResponse | null>('SET_USER_DATA');
