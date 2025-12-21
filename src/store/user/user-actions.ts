import { createAction } from '@reduxjs/toolkit';
import { AuthResponse } from '../../types/auth';

export const setAuthorizationStatus = createAction<boolean | null>('user/setAuthorizationStatus');
export const setUserError = createAction<boolean>('user/setUserError');
export const setUserData = createAction<AuthResponse | null>('user/setUserData');
