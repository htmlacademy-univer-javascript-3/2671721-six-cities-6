import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { Outlet } from 'react-router-dom';
import {
  checkAuthorizationStatus
} from '../../store/user/user-api-actions';
import { getAuthorizationStatus } from '../../store/user/user-selectors';
import { Spinner } from '../spinner/spinner';

export const Layout: FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    dispatch(checkAuthorizationStatus());
  }, [dispatch]);

  if (isAuthenticated === null) {
    return (
      <Spinner />
    );
  }

  return (
    <Outlet />
  );
};
